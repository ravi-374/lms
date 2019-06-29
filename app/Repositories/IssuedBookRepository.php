<?php

namespace App\Repositories;

use App\Models\IssuedBook;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

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
        'book_item_id',
        'member_id',
        'reserve_date',
        'issued_on',
        'return_due_date',
        'return_date',
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
        return IssuedBook::class;
    }

    /**
     * @param array $search
     * @param null $skip
     * @param null $limit
     * @param array $columns
     *
     *
     * @return IssuedBook[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit)->with('bookItem');

        $query->when(!empty($search['due_date']), function (Builder $query) use($search) {
            $query->whereRaw('DATE(return_due_date) = ?', $search['due_date']);
        });
        $bookRecords = $query->orderByDesc('id')->get();

        return $bookRecords;
    }

    /**
     * @param array $input
     *
     * @return IssuedBook
     */
    public function store($input)
    {
        $this->validateBook($input);
        /** @var IssuedBook $issueBooked */
        $issueBooked = IssuedBook::create($input);

        return $issueBooked;
    }

    /**
     * @param array $input
     *
     * @return bool
     */
    public function validateBook($input) {
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->exists();

        if ($issueBook) {
            throw new UnprocessableEntityHttpException('Book is not available');
        }

        return true;
    }

    /**
     * @param array $input
     * @param int $status
     * @return IssuedBook
     * @throws \Exception
     */
    public function updateStatus($input, $status)
    {
        $statusMessage = [2 => 'issued', 3 => 'returned'];
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status','!=', IssuedBook::STATUS_RETURNED)
            ->first();

        // if book records is there, then may be book is reserved or issued
        if (!empty($issueBook)) {
            // reserved book are not allow to issue by another member
            if ($issueBook->status == IssuedBook::STATUS_RESERVED && $issueBook->member_id != $input['member_id']) {
                throw new UnprocessableEntityHttpException('Book is already reserved by another member');
            } else if ($issueBook->status == $status) {
                throw new UnprocessableEntityHttpException('Book is already '.$statusMessage[$status]);
            }

            // if status if issue it means, book is already reserved and member want to issue it
            if ($status == IssuedBook::STATUS_ISSUED) {
                $issueBook->update([
                    'book_item_id'         => $input['book_item_id'],
                    'member_id'       => $input['member_id'],
                    'issued_on'       => Carbon::now(),
                    'return_due_date' => Carbon::now()->addDays(15),
                    'note'            => !empty($input['note']) ? $input['note'] : null,
                    'status'          => IssuedBook::STATUS_ISSUED,
                ]);
            } else {
                // return book
                $issueBook->status = $status;
                $issueBook->return_date = Carbon::now();
                $issueBook->save();
            }
        } else {
            if ($status == IssuedBook::STATUS_RETURNED) {
                throw new UnprocessableEntityHttpException('Book should not be return without issuing it.');
            }
            // if book record is not there it means book is available
            $input = [
                'book_item_id'         => $input['book_item_id'],
                'member_id'       => $input['member_id'],
                'issued_on'       => Carbon::now(),
                'return_due_date' => Carbon::now()->addDays(15),
                'note'            => !empty($input['note']) ? $input['note'] : null,
                'status'          => IssuedBook::STATUS_ISSUED,
            ];
            $issueBook = $this->store($input);
        }

        return $issueBook;
    }
}
