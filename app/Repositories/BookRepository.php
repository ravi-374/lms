<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Exceptions\MissingPropertyException;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\Tag;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Traits\ImageTrait;
use Arr;
use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRepository
 * @package App\Repositories
 * @version June 19, 2019, 12:06 pm UTC
 */
class BookRepository extends BaseRepository implements BookRepositoryInterface
{
    use ImageTrait;

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

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'published_on',
        'isbn',
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
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return Book[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (!empty($search['order_by']) && ($search['order_by'] == 'author_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with(['authors', 'items.publisher', 'items.language']);
        $this->applyDynamicSearch($search, $query);

        $bookRecords = $query->get();

        if (!empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'author_name') {
                $orderString = 'authors_name';
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $bookRecords->values();
    }

    /**
     * @param array $search
     * @param Builder $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['search']), function (Builder $query) use ($search) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');

            $query->orWhereHas('authors', function (Builder $query) use ($keywords) {
                Author::filterByName($query, $keywords);
            });

            $query->orwhereHas('items.publisher', function (Builder $query) use ($keywords) {
                Publisher::filterByName($query, $keywords);
            });
        });

        return $query;
    }

    /**
     * @param array $input
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return mixed
     */
    public function store($input)
    {
        $this->validateInput($input);
        try {
            DB::beginTransaction();
            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book::IMAGE_PATH);
            }

            if (!empty($input['image_url'])) {
                $input['image'] = ImageTrait::makeImageFromURL($input['image_url'], Book::IMAGE_PATH);
            }

            /** @var Book $book */
            $book = Book::create($input);

            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $this->attachAuthors($book, $input);
            }

            if (isset($input['items'])) {
                $this->createOrUpdateBookItems($book, $input['items']);
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
     * @param array $input
     * @param int $id
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return \Illuminate\Http\JsonResponse|mixed
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

            if (!empty($oldImageName) || !empty($input['remove_image'])) {
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

        return Book::with(['tags', 'genres', 'items.publisher', 'items.language', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param array $input
     * @throws Exception
     *
     * @return bool
     */
    public function validateInput($input)
    {
        if (isset($input['items'])) {
            $this->validateItems($input['items']);
        }

        return true;
    }

    /**
     * @param array $items
     * @throws Exception
     *
     * @return bool
     */
    public function validateItems($items)
    {
        foreach ($items as $item) {
            if (empty($item['language_id'])) {
                throw new MissingPropertyException('Language is required.');
            }

            if (isset($item['format'])) {
                if (!in_array($item['format'], [BookItem::FORMAT_HARDCOVER, BookItem::FORMAT_PAPERBACK])) {
                    throw new UnprocessableEntityHttpException('Invalid Book Format.');
                }
            }

            if (!isset($item['price']) || empty($item['price'])) {
                throw new UnprocessableEntityHttpException('Please enter book item price.');
            }

            if (isset($item['book_code'])) {
                if (strlen($item['book_code']) > 8 || strlen($item['book_code']) < 8) {
                    throw new UnprocessableEntityHttpException('Book code must be 8 character long.');
                }

                $bookItem = BookItem::whereBookCode($item['book_code']);

                if (isset($item['id'])) {
                    $bookItem->where('id', '!=', $item['id']);
                }
                if ($bookItem->exists()) {
                    throw new UnprocessableEntityHttpException('Given book code is already exist.');
                }
            }
        }

        return true;
    }

    /**
     * @param Book $book
     * @param array $input
     *
     * @return Book
     */
    public function attachTagsAndGenres($book, $input)
    {
        $tags = (!empty($input['tags'])) ? $input['tags'] : [];
        $tags = array_map(function ($value) {
            return is_string($value) ? Tag::create(['name' => $value])->id : $value;
        }, $tags);
        $book->tags()->sync($tags);

        $genres = (!empty($input['genres'])) ? $input['genres'] : [];
        $genres = array_map(function ($value) {
            return is_string($value) ? Genre::create(['name' => $value])->id : $value;
        }, $genres);
        $book->genres()->sync($genres);

        return $book;
    }

    /**
     * @param Book $book
     * @param array a$input
     *
     * @return bool
     */
    public function attachAuthors($book, $input)
    {
        $authors = [];
        foreach ($input['authors'] as $author) {
            $result = explode(' ', $author);
            if (count($result) > 1) {
                $author = Author::create(['first_name' => $result[0], 'last_name' => $result[1]]);
                $authors[] = $author->id;
            } else {
                $authors[] = (int) $author;
            }
        }

        $book->authors()->sync($authors);

        return true;
    }

    /**
     * @param Book $book
     * @param array $items
     * @throws Exception
     *
     * @return Book
     */
    public function addBookItems($book, $items)
    {
        $this->validateItems($items);

        $this->createOrUpdateBookItems($book, $items);

        /** @var Book $book */
        $book = $this->findOrFail($book->id, ['items.publisher', 'items.language']);

        return $book;
    }

    /**
     * @param Book $book
     * @param array $bookItems
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return bool
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
                    $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
                    $item->status = BookItem::STATUS_AVAILABLE;
                }

                $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
                $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
                $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
                $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
                $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
                $item->language_id = isset($bookItem['language_id']) ? $bookItem['language_id'] : null;
                $item->status = isset($bookItem['status']) ? $bookItem['status'] : BookItem::STATUS_AVAILABLE;

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
    public function generateUniqueBookCode()
    {
        $rand = rand(1, 99999999);

        $itemId = sprintf("%08d", $rand);
        while (true) {
            if (!BookItem::whereBookCode($itemId)->exists()) {
                break;
            }
            $itemId = rand(1, 99999999);
        }

        return $itemId;
    }

    /**
     * @param string $isbn
     *
     * @throws ApiOperationFailedException
     *
     * @return array
     */
    public function getBookDetailsFromISBN($isbn)
    {
        $url = \Config::get('services.openlib.api');
        $url = str_replace('{ISBN_NO}', $isbn, $url);
        $bookDetails = (new Book())->getFillable();
        $bookDetails = array_fill_keys($bookDetails, null);
        $bookDetails = array_merge($bookDetails,
            ['tags' => [], 'publishers' => [], 'authors' => [], 'genres' => [], 'languages' => []]
        );


        try {
            $data = file_get_contents($url);
            $data = json_decode($data, true);

            if (empty($data)) {
                return $bookDetails;
            }
            $data = $data['ISBN:'.$isbn];

            $bookDetails['name'] = $data['title'];
            $bookDetails['published_on'] = Carbon::parse($data['publish_date'])->toDateTimeString();
            $bookDetails['description'] = (isset($data['notes'])) ? $data['notes'] : null;
            $bookDetails['isbn'] = $isbn;
            $bookDetails['is_featured'] = false;

            if (isset($data['cover']['large'])) {
                $bookDetails['image_url'] = $data['cover']['large'];
            }

            if (isset($data['ebooks'][0]['preview_url'])) {
                $bookDetails['url'] = $data['ebooks'][0]['preview_url'];
            }

            if (isset($data['authors'])) {
                foreach ($data['authors'] as $author) {
                    list($firstName, $lastName) = explode(' ', $author['name']);

                    $authorDBRecord = Author::whereFirstName($firstName)->whereLastName($lastName)->first();
                    if (!empty($authorDBRecord)) {
                        $bookDetails['authors'][] = $authorDBRecord->id;
                    } else {
                        $bookDetails['authors'][] = $author['name'];
                    }
                }
            }

            if (isset($data['publishers'])) {
                foreach ($data['publishers'] as $publisher) {

                    $publisherDBRecord = Publisher::whereName($publisher['name'])->first();
                    if (!empty($publisherDBRecord)) {
                        $bookDetails['publishers'][] = $publisherDBRecord->id;
                    } else {
                        $bookDetails['publishers'][] = $publisher['name'];
                    }
                }
            }

            return $bookDetails;

        } catch (Exception $e) {
            throw new ApiOperationFailedException('Unable to get book details : '.$e->getMessage());
        }
    }
}
