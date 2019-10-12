<?php

namespace App\Repositories;

use App;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Setting;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class IssuedBookRepository
 */
class IssuedBookRepository extends BaseRepository implements IssuedBookRepositoryInterface
{
    /** @var BookItemRepository */
    private $bookItemRepo;

    public function __construct(Application $app, BookItemRepository $bookItemRepository)
    {
        parent::__construct($app);
        $this->bookItemRepo = $bookItemRepository;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'reserve_date',
        'issued_on',
        'return_due_date',
        'return_date',
        'status',
        'member_id',
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
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return IssuedBook[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && in_array($search['order_by'],
                ['name', 'book_code', 'member_name', 'reserved_on'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        if (! empty($search['search']) && in_array($search['search'], IssuedBook::STATUS_IN_STRING)) {
            $search['status'] = IssuedBook::getStatusFromString($search['search']);
            unset($search['search']);
        }

        $with = ['issuer', 'returner', 'bookItem.book', 'member'];
        $query = $this->allQuery($search, $skip, $limit)->with($with);
        $query = $this->applyDynamicSearch($search, $query);

        $query->when(! empty($search['due_date']), function (Builder $query) use ($search) {
            $query->whereRaw('DATE(return_due_date) = ?', $search['due_date']);
        });

        $bookRecords = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';
            switch ($orderBy) {
                case 'name' :
                    $orderString = 'bookItem.book.name';
                    break;
                case 'book_code' :
                    $orderString = 'bookItem.book_code';
                    break;
                case 'member_name' :
                    $orderString = 'member.first_name';
                    break;
                case 'reserved_on' :
                    $orderString = 'reserve_date';
                    break;
            }

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        };

        return $bookRecords->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $searchString = $search['search'];
            $query->orWhereHas('bookItem', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['book_code']);
            });

            $query->orWhereHas('bookItem.book', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['name']);
            });

            $query->orWhereHas('member', function (Builder $query) use ($searchString) {
                filterByColumns($query, $searchString, ['first_name', 'last_name']);
            });
        });

        return $query;
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return IssuedBook
     */
    public function find($id, $columns = ['*'])
    {
        return $this->findOrFail($id, ['bookItem.book', 'member']);
    }

    /**
     * @param  array  $input
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
     * @param  array  $input
     *
     * @return bool
     */
    public function validateBook($input)
    {
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->exists();

        if ($issueBook) {
            throw new UnprocessableEntityHttpException('Book is not available');
        }

        return true;
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function issueBook($input)
    {
        $issuedOn = (! empty($input['issued_on'])) ? Carbon::parse($input['issued_on']) : Carbon::now();
        if ($issuedOn->format('Y-m-d') > Carbon::now()->format('Y-m-d')) {
            throw new UnprocessableEntityHttpException('Issue date must be less or equal to today\'s date.');
        }

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = $this->bookItemRepo->findOrFail($input['book_item_id']);

        $input = [
            'book_item_id'    => $input['book_item_id'],
            'member_id'       => $input['member_id'],
            'issued_on'       => $issuedOn,
            'return_due_date' => Carbon::parse($issuedOn)->addDays(getSettingValueByKey(Setting::RETURN_DUE_DAYS)),
            'note'            => ! empty($input['note']) ? $input['note'] : null,
            'status'          => IssuedBook::STATUS_ISSUED,
            'issuer_id'       => Auth::id(),
        ];

        if (! empty($issueBook)) {
            if ($issueBook->status == IssuedBook::STATUS_RESERVED && $issueBook->member_id != $input['member_id']) {
                throw new UnprocessableEntityHttpException('Book is already reserved by another member.');
            }
            if ($issueBook->status == IssuedBook::STATUS_ISSUED) {
                throw new UnprocessableEntityHttpException('Book is already issued.');
            }

            $isUpdate = ($issueBook->status == IssuedBook::STATUS_UN_RESERVED && $issueBook->member_id == $input['member_id']) ? true : false;
            if ($isUpdate || $issueBook->member_id == $input['member_id']) {
                $issueBook->update($input);
                $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

                return $this->find($issueBook->id);
            }
        }

        $issueBook = IssuedBook::create($input);
        $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function reserveBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);
        if ($bookItem->status == BookItem::STATUS_NOT_AVAILABLE) {
            throw new UnprocessableEntityHttpException('Book is not available.');
        }

        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['reserve_date'] = (! empty($input['reserve_date'])) ? $input['reserve_date'] : Carbon::now();
        $input['note'] = ! empty($input['note']) ? $input['note'] : null;

        if (! empty($issueBook) && $issueBook->status == IssuedBook::STATUS_UN_RESERVED && $issueBook->member_id == $input['member_id']) {
            $issueBook->update($input);
        } else {
            $issueBook = IssuedBook::create($input);
        }

        $bookItem->update(['status' => BookItem::STATUS_NOT_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function returnBook($input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        if (empty($issueBook)) {
            throw new UnprocessableEntityHttpException('Book must be issued before returning it.');
        }

        $issueBook->update([
            'return_date' => (! empty($input['return_date'])) ? $input['return_date'] : Carbon::now(),
            'note'        => ! empty($input['note']) ? $input['note'] : null,
            'status'      => IssuedBook::STATUS_RETURNED,
            'returner_id' => Auth::id(),
        ]);
        $bookItem->update(['status' => BookItem::STATUS_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function updateIssuedBookStatus($input)
    {
        if (! in_array($input['status'], [
            IssuedBook::STATUS_DAMAGED,
            IssuedBook::STATUS_LOST,
        ])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($input['book_item_id']);

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($input['book_item_id'])
            ->lastIssuedBook()
            ->first();

        if (empty($issueBook)) {
            throw new UnprocessableEntityHttpException('Book is not issued.');
        }

        $issueBook->update(['status' => $input['status']]);

        if ($input['status'] == IssuedBook::STATUS_LOST) {
            $input['status'] = BookItem::STATUS_LOST;
        }

        if ($input['status'] == IssuedBook::STATUS_DAMAGED) {
            $input['status'] = BookItem::STATUS_DAMAGED;
        }

        $bookItem->update(['status' => $input['status']]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  BookItem  $bookItem
     * @param  array  $input
     *
     * @return IssuedBook
     */
    public function unReserveBook($bookItem, $input)
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::ofBookItem($bookItem->id)
            ->where('status', IssuedBook::STATUS_RESERVED)
            ->firstOrFail();

        if ($issueBook->member_id != $input['member_id']) {
            throw new UnauthorizedException('You can un-reserve only your books.');
        }

        $issueBook->update(['status' => IssuedBook::STATUS_UN_RESERVED]);
        $bookItem->update(['status' => BookItem::STATUS_AVAILABLE]);

        return $this->find($issueBook->id);
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function reserveBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::reserve();
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(reserve_date) as date'));
            $query->whereRaw('DATE(reserve_date) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(reserve_date) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $reservedBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $reservedBooks];
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function issuedBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::whereStatus(IssuedBook::STATUS_ISSUED);
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(issued_on) as date'));
            $query->whereRaw('DATE(issued_on) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(issued_on) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $issuedBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $issuedBooks];
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function overDueBooksCount($today, $startDate = null, $endDate = null)
    {
        $query = IssuedBook::query();
        if (! empty($startDate) && ! empty($endDate)) {
            $query->select('*', DB::raw('DATE(return_due_date) as date'));
            $query->whereRaw('DATE(return_due_date) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(return_due_date) = ?', [Carbon::now()->toDateString()]);
        } else {
            $query->overDue();
        }

        $records = $query->get();
        $overDueBooks = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $overDueBooks];
    }


}
