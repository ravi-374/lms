<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class DashboardAPIController
 */
class DashboardAPIController extends AppBaseController
{
    /** @var BookRepositoryInterface $bookRepo */
    private $bookRepo;

    /** @var IssuedBookRepositoryInterface $issuedBookRepo */
    private $issuedBookRepo;

    /** @var MemberRepositoryInterface $memberRepo */
    private $memberRepo;

    public function __construct(
        BookRepositoryInterface $bookRepo,
        IssuedBookRepositoryInterface $issuedBookRepo,
        MemberRepositoryInterface $memberRepo
    ) {
        $this->bookRepo = $bookRepo;
        $this->memberRepo = $memberRepo;
        $this->issuedBookRepo = $issuedBookRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function dashboardDetails(Request $request)
    {
        $data['total_books'] = $this->bookRepo->booksCount(
            $request->get('today', false), $request->get('start_date'), $request->get('end_date')
        );

        $data['total_members'] = $this->memberRepo->membersCount(
            $request->get('today', false), $request->get('start_date'), $request->get('end_date')
        );

        $data['total_reserved_books'] = $this->issuedBookRepo->reserveBooksCount(
            $request->get('today', false), $request->get('start_date'), $request->get('end_date')
        );

        $data['total_issued_books'] = $this->issuedBookRepo->issuedBooksCount(
            $request->get('today', false), $request->get('start_date'), $request->get('end_date')
        );

        $data['total_overdue_books'] = $this->issuedBookRepo->issuedBooksCount(
            $request->get('today', false), $request->get('start_date'), $request->get('end_date')
        );

        return $this->sendResponse($data, 'Dashboard details retrieved successfully.');
    }
}