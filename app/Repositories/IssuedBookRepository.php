<?php

namespace App\Repositories;

use App\Models\BookItem;
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
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return IssuedBook[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $with = ['issuer', 'returner', 'bookItem.book'];
        $query = $this->allQuery($search, $skip, $limit)->with($with);

        $query->when(!empty($search['due_date']), function (Builder $query) use ($search) {
            $query->whereRaw('DATE(return_due_date) = ?', $search['due_date']);
        });
        $bookRecords = $query->orderByDesc('issued_on')->get();

        return $bookRecords;
    }

    /**
     * @param int $id
     * @param array $columns
     *
     * @return IssuedBook
     */
    public function find($id, $columns = ['*'])
    {
        return $this->findOrFail($id, ['bookItem.book']);
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
     * @return IssuedBook
     */
    public function issueBook($input)
    {
        $issuedOn = (!empty($input['issued_on'])) ? Carbon::parse($input['issued_on'] ) : Carbon::now();
        if ($issuedOn->format('Y-m-d') > Carbon::now()->format('Y-m-d')) {
            throw new UnprocessableEntityHttpException('Issue date must be less or equal to today\'s date.');
        }

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::whereBookItemId($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        $input = [
            'book_item_id'    => $input['book_item_id'],
            'member_id'       => $input['member_id'],
            'issued_on'       => $issuedOn,
            'return_due_date' => Carbon::parse($issuedOn)->addDays(15),
            'note'            => !empty($input['note']) ? $input['note'] : null,
            'status'          => IssuedBook::STATUS_ISSUED,
            'issuer_id'       => Auth::id(),
        ];
        if (!empty($issueBook)) {
            if ($issueBook->status == IssuedBook::STATUS_RESERVED && $issueBook->member_id != $input['member_id']) {
                throw new UnprocessableEntityHttpException('Book is already reserved by another member.');
            }
            if ($issueBook->status == IssuedBook::STATUS_ISSUED) {
                throw new UnprocessableEntityHttpException('Book is already issued.');
            }

            $issueBook->update($input);

            return $this->find($issueBook->id);
        }

        $issueBook = IssuedBook::create($input);
        $bookItem->update(['is_available' => false]);

        return $this->find($issueBook->id);
    }

    /**
     * @param array $input
     *
     * @return IssuedBook
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

        $reserveDate = (!empty($input['reserve_date'])) ? $input['reserve_date'] : Carbon::now();
        $issueBook = IssuedBook::create([
            'book_item_id' => $input['book_item_id'],
            'member_id'    => $input['member_id'],
            'note'         => !empty($input['note']) ? $input['note'] : null,
            'reserve_date' => $reserveDate,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);
        $bookItem->update(['is_available' => false]);

        return $this->find($issueBook->id);
    }

    /**
     * @param array $input
     *
     * @return IssuedBook
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
            'return_date' => (!empty($input['return_date'])) ? $input['return_date'] : Carbon::now(),
            'note'        => !empty($input['note']) ? $input['note'] : null,
            'status'      => IssuedBook::STATUS_RETURNED,
            'returner_id' => Auth::id(),
        ]);
        $bookItem->update(['is_available' => true]);

        return $this->find($issueBook->id);
    }
}
