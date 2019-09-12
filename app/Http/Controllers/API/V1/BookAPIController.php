<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookController
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
        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($books->toArray(), 'Books retrieved successfully.');
    }
}
