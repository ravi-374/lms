<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Book;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Traits\ImageTrait;
use DB;
use Exception;
use Illuminate\Container\Container as Application;

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
        'author_id',
        'publisher_id',
        'price',
        'isbn',
        'url',
        'language_id',
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

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book::with(['tags', 'genres'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse|mixed
     *
     * @throws ApiOperationFailedException
     */
    public function update($input, $id)
    {
        /** @var Book $book */
        $book = $this->findOrFail($id);
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

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book::with(['tags', 'genres'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     * @return bool
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
}
