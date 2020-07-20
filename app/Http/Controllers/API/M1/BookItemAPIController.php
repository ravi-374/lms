<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;

    public function __construct(BookItemRepositoryInterface $bookItemRepo)
    {
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchBooksByName(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiM1Obj();
        });

        return $this->sendResponse($records, 'BookItem retrieved successfully.');
    }
    
    /**
     * @param  BookItem  $bookItem
     *
     * @return JsonResponse|null
     */
    public function downloadEBook(BookItem $bookItem)
    {
        if ($bookItem->format == BookItem::FORMAT_E_BOOK) {
            $path = storage_path().'/app/public/'.BookItem::DOCUMENT_PATH.'/'.$bookItem->file_name;
            if (file_exists($path)) {
                return Response::download($path);
            }
        }

        return $this->sendError('File Not Found.');
    }
}
