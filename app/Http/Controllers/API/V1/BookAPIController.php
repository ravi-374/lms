<?php

namespace App\Http\Controllers\API\V1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateBookAPIRequest;
use App\Http\Requests\API\UpdateBookAPIRequest;
use App\Models\Book;
use App\Repositories\BookRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookController
 * @package App\Http\Controllers\API
 */
class BookAPIController extends AppBaseController
{
    /** @var  BookRepository */
    private $bookRepository;

    public function __construct(BookRepository $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    /**
     * Display a listing of the Book.
     * GET|HEAD /books
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($books->toArray(), 'Books retrieved successfully.');
    }

    /**
     * Store a newly created Book in storage.
     * POST /books
     *
     * @param CreateBookAPIRequest $request
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
     * @param Book $book
     *
     * @return JsonResponse
     */
    public function show(Book $book)
    {
        $book->tags;
        $book->genres;
        $book->items;
        $book->authors;

        return $this->sendResponse($book->toArray(), 'Book retrieved successfully.');
    }

    /**
     * Update the specified Book in storage.
     * PUT/PATCH /books/{id}
     *
     * @param Book $book
     * @param UpdateBookAPIRequest $request
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
     * @param Book $book
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return $this->sendResponse($book, 'Book deleted successfully.');
    }

    /**
     * @param Book $book
     * @param Request $request
     *
     * @throws Exception
     *
     * @return Book
     */
    public function addItems(Book $book, Request $request)
    {
        $request->validate(['items' => 'required']);

        $items = $request->get('items');

        return $this->bookRepository->addBookItems($book, $items);
    }

    /**
     * @param Book $book
     *
     * @return JsonResponse
     */
    public function removeImage(Book $book)
    {
        $book->deleteImage();

        return $this->sendSuccess('Book image removed successfully.');
    }
}
