<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Book;
use App\Repositories\Contracts\BookRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookAPIController
 */
class BookAPIController extends AppBaseController
{
    /**
     * @var BookRepositoryInterface
     */
    private $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $books = $this->bookRepository->searchBooks(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $books = $books->map(function (Book $record) {
            return $record->apiObj();
        });

        return $this->sendResponse(
            $books,
            'Books retrieved successfully.',
            ['totalRecords' => count($books)]
        );
    }

    /**
     * @return JsonResponse
     */
    public function totalBooks()
    {
        $count = Book::count();

        return $this->sendResponse($count, 'Books count retrieved successfully.');
    }
}