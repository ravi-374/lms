<?php

namespace App\Repositories;

use App;
use App\Models\BookItem;
use App\Models\BookRenewalRequest;
use App\Models\IssuedBook;
use App\Repositories\Contracts\BookRenewalRequestRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Carbon\Carbon;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRenewalRequestRepository
 */
class BookRenewalRequestRepository extends BaseRepository implements BookRenewalRequestRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'book_id',
        'member_id',
        'status',
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
        return BookRenewalRequest::class;
    }

    /**
     * @param  array  $input
     *
     * @return BookRenewalRequest
     */
    public function store($input)
    {
        $this->validateRenewalRequest($input);

        return BookRenewalRequest::create($input);
    }

    /**
     * @param  array  $input
     * @param  int|null  $id
     *
     * @return bool
     */
    public function validateRenewalRequest($input, $id = null)
    {
        BookItem::findOrFail($input['book_id']);

        $query = BookRenewalRequest::query();

        if (! is_null($id)) {
            $query->where('id', '!=', $id);
        }

        $query->where('book_id', $input['book_id'])->where('member_id', $input['member_id']);

        if ($query->exists()) {
            throw new UnprocessableEntityHttpException('Book renewal request already exist.');
        }

        return true;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return BookRenewalRequest
     */
    public function update($input, $id)
    {
        $this->validateRenewalRequest($input, $id);

        $bookRenewalRequest = BookRenewalRequest::findOrFail($id);
        $bookRenewalRequest->update($input);

        return $bookRenewalRequest;
    }

    /**
     * @param  BookRenewalRequest  $bookRenewalRequest
     * @param  int  $status
     *
     * @return bool
     */
    public function updateStatus($bookRenewalRequest, $status)
    {
        $statusText = ($status == BookRenewalRequest::APPROVED) ? 'Approved' : 'Cancelled';
        if ($status == $bookRenewalRequest->status) {
            throw new UnprocessableEntityHttpException('Book is already '.$statusText);
        }

        if ($status == BookRenewalRequest::CANCELLED) {
            $bookRenewalRequest->update(['status' => $status]);

            return true;
        }

        /** @var IssuedBookRepositoryInterface $issuedBookRepo */
        $issuedBookRepo = App::make(IssuedBookRepositoryInterface::class);

        $input['member_id'] = $bookRenewalRequest->member_id;
        $input['book_item_id'] = $bookRenewalRequest->book_id;

        // 1. First change current record to return
        $issuedBookRepo->returnBook($input);

        // 2. Now, create new record as issued book
        $issuedBookRepo->issueBook($input);

        $bookRenewalRequest->update(['status' => $status]);

        return true;
    }

    /**
     * @param  BookItem  $bookItem
     * @param  int  $memberId
     *
     * @return IssuedBook
     */
    public function renewBook($bookItem, $memberId)
    {
        $issuedBook = $bookItem->lastIssuedBook;

        $diffInDay = Carbon::parse($issuedBook->return_due_date)->diffInDays(Carbon::now());
        if ($diffInDay > 1) {
            throw new UnprocessableEntityHttpException('You can only renew book before 1 day.');
        }

        /** @var IssuedBookRepositoryInterface $issuedBookRepo */
        $issuedBookRepo = App::make(IssuedBookRepositoryInterface::class);

        $input['member_id'] = $memberId;
        $input['book_item_id'] = $bookItem->id;

        // 1. First change current record to return
        $issuedBookRepo->returnBook($input);

        // 2. Now, create new record as issued book
        $issuedBookRepo->issueBook($input);

        BookRenewalRequest::create(array_merge(
            $input,
            ['status' => BookRenewalRequest::APPROVED, 'book_id' => $bookItem->id]
        ));

        return $issuedBook;
    }
}
