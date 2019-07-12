<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Book;
use App\Models\BookItem;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Traits\ImageTrait;
use Arr;
use DB;
use Exception;
use Illuminate\Container\Container as Application;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * Class BookRepository
 * @package App\Repositories
 * @version June 19, 2019, 12:06 pm UTC
 */
class BookRepository extends BaseRepository implements BookRepositoryInterface
{

    /** @var TagRepository */
    private $tagRepo;

    /** @var GenreRepository */
    private $genreRepo;

    public function __construct(Application $app, TagRepository $tagRepository, GenreRepository $genreRepository)
    {
        parent::__construct($app);
        $this->tagRepo = $tagRepository;
        $this->genreRepo = $genreRepository;
    }

    use ImageTrait;
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'published_on',
        'price',
        'isbn',
        'url',
        'is_featured',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Book::class;
    }

    /**
     * @param  array  $input
     *
     * @return mixed
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     */
    public function store($input)
    {
        $this->validateInput($input);
        try {
            DB::beginTransaction();
            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book::IMAGE_PATH);
            }

            /** @var Book $book */
            $book = Book::create($input);

            $this->attachTagsAndGenres($book, $input);

            if (isset($input['items'])) {
                $this->createOrUpdateBookItems($book, $input['items']);
            }

            if (!empty($input['authors'])) {
                $book->authors()->sync($input['authors']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book::with(['tags', 'genres', 'items', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|mixed
     * @throws Exception
     * @throws ApiOperationFailedException
     */
    public function update($input, $id)
    {
        /** @var Book $book */
        $book = $this->findOrFail($id);
        unset($input['items']);
        $this->validateInput($input);
        $oldImageName = '';

        try {
            DB::beginTransaction();

            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book::IMAGE_PATH);
                $oldImageName = $book->image;
            }

            if (!empty($oldImageName)) {
                $book->deleteImage();
            }
            $book->update($input);
            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $book->authors()->sync($input['authors']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book::with(['tags', 'genres', 'items', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     * @return bool
     * @throws Exception
     */
    public function validateInput($input)
    {
        if (isset($input['tags']) && !empty($input['tags'])) {
            foreach ($input['tags'] as $tag) {
                $this->tagRepo->findOrFail($tag);
            }
        }
        if (isset($input['genres']) && !empty($input['tags'])) {
            foreach ($input['genres'] as $genre) {
                $this->genreRepo->findOrFail($genre);
            }
        }

        if (isset($input['items'])) {
            $this->validateItems($input['items']);
        }

        return true;
    }

    /**
     * @param  array  $items
     * @return bool
     * @throws Exception
     */
    public function validateItems($items)
    {
        foreach ($items as $item) {
            if (isset($item['format'])) {
                if (!in_array($item['format'], [BookItem::FORMAT_HARDCOVER, BookItem::FORMAT_PAPERBACK])) {
                    throw new Exception('Invalid Book Format.', HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
                }
            }

            if (!isset($item['price']) || empty($item['price'])) {
                throw new Exception('Please enter book item price.', HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            if (isset($item['book_item_id'])) {
                $bookItem = BookItem::whereBookItemId($item['book_item_id']);

                if (isset($item['id'])) {
                    $bookItem->where('id', '!=', $item['id']);
                }
                if ($bookItem->exists()) {
                    throw new Exception('Given book_item_id already exist.',
                        HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
                }
            }
        }

        return true;
    }
    /**
     * @param  Book  $book
     * @param  array  $input
     * @return Book
     */
    public function attachTagsAndGenres($book, $input)
    {
        if (isset($input['tags']) && !empty($input['tags'])) {
            $book->tags()->sync($input['tags']);
        } else {
            $book->tags()->sync([]);
        }

        if (isset($input['genres']) && !empty($input['genres'])) {
            $book->genres()->sync($input['genres']);
        }

        return $book;
    }

    /**
     * @param  Book  $book
     * @param  array  $items
     * @return Book
     * @throws Exception
     */
    public function addBookItems($book, $items)
    {
        $this->validateItems($items);

        $this->createOrUpdateBookItems($book, $items);

        /** @var Book $book */
        $book = $this->findOrFail($book->id, ['items']);

        return $book;
    }

    /**
     * @param  Book  $book
     * @param  array  $bookItems
     * @return bool
     * @throws Exception
     * @throws ApiOperationFailedException
     */
    public function createOrUpdateBookItems($book, $bookItems)
    {
        $existingItems = $book->items->pluck('id');
        $removedItems = array_diff($existingItems->toArray(), Arr::pluck($bookItems, 'id'));

        try {
            DB::beginTransaction();
            BookItem::whereIn('id', $removedItems)->delete();
            /** @var BookItem $bookItem */
            foreach ($bookItems as $bookItem) {
                if (!empty($bookItem['id'])) {
                    $item = BookItem::findOrFail($bookItem['id']);
                } else {
                    $item = new BookItem();
                    $item->book_item_id = isset($bookItem['book_item_id']) ? $bookItem['book_item_id'] : $this->generateItemId();
                    $item->is_available = BookItem::STATUS_AVAILABLE;
                }

                $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
                $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
                $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
                $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
                $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
                $item->language_id= isset($bookItem['language_id']) ? $bookItem['language_id'] : null;

                $book->items()->save($item);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException('Unable to update Book Items: '.$e->getMessage());
        }

        return true;
    }

    /**
     * @return string
     */
    public function generateItemId()
    {
        //todo: later will change format
        $rand = rand(10000, 99999);
        $itemId = $rand;
        while (true) {
            if (!BookItem::whereBookItemId($itemId)->exists()) {
                break;
            }
            $itemId = rand(10000, 99999);
        }

        return $itemId;
    }
}
