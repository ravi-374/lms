<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 11-07-2019
 * Time: 10:16 AM
 */
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\Book;
use App\Models\BookItem;
use App\Repositories\BookItemRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepository */
    private $bookItemRepo;

    public function __construct(BookItemRepository $bookItemRepo)
    {
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param Book $book
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function availableBooks(Book $book, Request $request)
    {
        $search = $request->only(['member_id']);
        $search['book_id'] = $book->id;
        $search['is_available'] = true;
        $search['for_member'] = true;

        $records = $this->bookItemRepo->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($records->toArray(), 'Books history retrieved successfully.');
    }

    /**
     * @param BookItem $bookItem
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookItem $bookItem)
    {
        if (!$bookItem->is_available) {
            throw new BadRequestHttpException('BookItem can not be delete, it is reserved OR issued by someone.');
        }
        $bookItem->delete();

        return $this->sendSuccess('BookItem deleted successfully.');
    }
}