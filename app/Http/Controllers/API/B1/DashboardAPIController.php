<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\Book;
use App\Models\IssuedBook;
use App\Models\Member;
use Illuminate\Http\JsonResponse;

/**
 * Class DashboardAPIController
 */
class DashboardAPIController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function dashboardDetails()
    {
        $data['total_books'] = Book::count();
        $data['total_issued_books'] = IssuedBook::whereStatus(IssuedBook::STATUS_ISSUED)->count();
        $data['total_reserved_books'] = IssuedBook::reserve()->count();
        $data['total_members'] = Member::count();
        $data['total_overdue_books'] = IssuedBook::overDue()->count();

        return $this->sendResponse($data, 'Dashboard details retrieved successfully.');
    }
}