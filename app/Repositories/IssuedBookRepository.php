<?php

namespace App\Repositories;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Container\Container as Application;
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

        $query->when(!empty($search['due_date']), function (Builder $query) use ($search) {
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
    public function validateBook($input)
    {
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
     *
     * @return bool
     */
    public function issueBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        $input = [
            'book_item_id'    => $input['book_item_id'],
            'member_id'       => $input['member_id'],
            'issued_on'       => Carbon::now(),
            'return_due_date' => Carbon::now()->addDays(15),
            'note'            => !empty($input['note']) ? $input['note'] : null,
            'status'          => IssuedBook::STATUS_ISSUED,
        ];
        if (!empty($issueBook)) {
            if ($issueBook->status == IssuedBook::STATUS_RESERVED && $issueBook->member_id != $input['member_id']) {
                throw new UnprocessableEntityHttpException('Book is already reserved by another member.');
            }
            if ($issueBook->status == IssuedBook::STATUS_ISSUED) {
                throw new UnprocessableEntityHttpException('Book is already issued.');
            }

            $issueBook->update($input);

            return true;
        }

        IssuedBook::create($input);
        $bookItem->update(['is_available' => false]);

        return true;
    }

    /**
     * @param array $input
     *
     * @return bool
     */
    public function reserveBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);
        if (!empty($issueBook) || !$bookItem->is_available) {
            throw new UnprocessableEntityHttpException('Book is not available.');
        }

        IssuedBook::create([
            'book_item_id'    => $input['book_item_id'],
            'member_id'       => $input['member_id'],
            'note'            => !empty($input['note']) ? $input['note'] : null,
            'status'          => IssuedBook::STATUS_RESERVED,
        ]);
        $bookItem->update(['is_available' => false]);

        return true;
    }

    /**
     * @param array $input
     *
     * @return bool
     */
    public function returnBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        if (empty($issueBook)) {
            throw new UnprocessableEntityHttpException('Book must be issued before returning it.');
        }

        $issueBook->update([
            'return_date' => Carbon::now(),
            'note'        => !empty($input['note']) ? $input['note'] : null,
            'status'      => IssuedBook::STATUS_RETURNED,
        ]);
        $bookItem->update(['is_available' => true]);

        return true;
    }
}
