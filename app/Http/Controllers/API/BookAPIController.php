<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Book;
use App\Models\Genre;
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
        $input['is_featured'] = true;

        list($books, $count) = $this->bookRepository->searchBooks(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $books = $books->map(function (Book $record) {
            return $record->apiObj();
        });

        $data['books'] = $books;
        $data['genres'] = Genre::where('show_on_landing_page', 1)->get();

        return $this->sendResponse(
            $data,
            'Books retrieved successfully.',
            ['totalRecords' => $count]
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
