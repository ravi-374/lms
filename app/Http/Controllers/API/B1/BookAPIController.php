<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookAPIRequest;
use App\Http\Requests\API\UpdateBookAPIRequest;
use App\Http\Requests\BookDetailsRequest;
use App\Models\Book;
use App\Repositories\Contracts\BookRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class BookAPIController
 * @package App\Http\Controllers\API
 */
class BookAPIController extends AppBaseController
{
    /** @var  BookRepositoryInterface */
    private $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    /**
     * Display a listing of the Book.
     * GET|HEAD /books
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $books = $this->bookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $books->toArray(),
            'Books retrieved successfully.',
            $this->getTotalRecords(Book::class, $input, $books)
        );
    }

    /**
     * Store a newly created Book in storage.
     * POST /books
     *
     * @param  CreateBookAPIRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateBookAPIRequest $request)
    {
        $input = $request->all();

        $book = $this->bookRepository->store($input);

        return $this->sendResponse($book->toArray(), 'Book saved successfully.');
    }

    /**
     * Display the specified Book.
     * GET|HEAD /books/{id}
     *
     * @param  Book  $book
     *
     * @return JsonResponse
     */
    public function show(Book $book)
    {
        $book = Book::with(['tags', 'genres', 'authors', 'items.language', 'items.publisher'])->findOrFail($book->id);

        return $this->sendResponse($book->toArray(), 'Book retrieved successfully.');
    }

    /**
     * Update the specified Book in storage.
     * PUT/PATCH /books/{id}
     *
     * @param  Book  $book
     * @param  UpdateBookAPIRequest  $request
     *
     * @throws ApiOperationFailedException
     * @return JsonResponse
     */
    public function update(Book $book, UpdateBookAPIRequest $request)
    {
        $input = $request->all();

        $book = $this->bookRepository->update($input, $book->id);

        return $this->sendResponse($book->toArray(), 'Book updated successfully.');
    }

    /**
     * Remove the specified Book from storage.
     * DELETE /books/{id}
     *
     * @param  Book  $book
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Book $book)
    {
        if (! empty($book->items->toArray())) {
            throw new BadRequestHttpException('Book can not be delete, it is has one or more book items.');
        }
        $book->deleteImage();
        $book->delete();

        return $this->sendResponse($book, 'Book deleted successfully.');
    }

    /**
     * @param  Book  $book
     * @param  Request  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function addItems(Book $book, Request $request)
    {
        $request->validate(['items' => 'required']);

        $items = $request->get('items');

        $book = $this->bookRepository->addBookItems($book, $items);

        return $this->sendResponse($book->toArray(), 'Book items added successfully.');
    }

    /**
     * @param  Book  $book
     *
     * @return JsonResponse
     */
    public function removeImage(Book $book)
    {
        $book->deleteImage();

        return $this->sendSuccess('Book image removed successfully.');
    }

    /**
     * @param  BookDetailsRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function getBookDetails(BookDetailsRequest $request)
    {
        $bookDetails = $this->bookRepository->getBookDetailsFromISBN($request->get('isbn'));

        return \Response::json($bookDetails, 200);
    }
}
