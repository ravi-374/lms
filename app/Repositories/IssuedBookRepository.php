<?php

namespace App\Repositories;

use App\Models\IssuedBook;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;

/**
 * Class IssuedBookRepository
 * @package App\Repositories
 * @version June 25, 2019, 5:24 am UTC
 */
class IssuedBookRepository extends BaseRepository implements IssuedBookRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'book_id',
        'member_id',
        'reserve_date',
        'issued_on',
        'return_due_date',
        'return_date',
        'status'
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
        return IssuedBook::class;
    }

    /**
     * @param  array  $input
     * @return IssuedBook
     */
    public function store($input)
    {
        /** @var IssuedBook $issueBooked */
        $issueBooked = IssuedBook::create($input);

        return $issueBooked;
    }

    /**
     * @param  int  $reservedBookId
     * @param  int  $status
     * @return IssuedBook
     * @throws \Exception
     */
    public function updateStatus($reservedBookId, $status)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereStatus(IssuedBook::STATUS_RESERVED)->findOrFail($reservedBookId);

        if ($issueBook->status == $status) {
            $msg = '';
            if ($status == IssuedBook::STATUS_ISSUED) {
                $msg = 'Book already issued';
            } elseif ($status == IssuedBook::STATUS_RETURNED) {
                $msg = 'Book already returned';
            }
            throw new \Exception($msg, 422);
        }

        $issueBook->status = $status;
        $issueBook->save();

        return $issueBook;
    }
}
