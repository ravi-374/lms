<?php

namespace App\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\Member;
use App\Models\Penalty;
use App\Models\Setting;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class PenaltyRepository
 */
class PenaltyRepository extends BaseRepository implements PenaltyRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'collected_penalty',
    ];

    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && in_array($search['order_by'],
                ['book_item_name', 'actual_penalty', 'member_name', 'collected_by_name'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }


        $query = $this->allQuery($search, $skip, $limit);
        $query = $this->applyDynamicSearch($search, $query);
        $records = $query->get();


        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';
            switch ($orderBy) {
                case 'book_item_name' :
                    $orderString = 'bookItem.book.name';
                    break;
                case 'actual_penalty' :
                    $orderString = 'actual_penalty';
                    break;
                case 'member_name' :
                    $orderString = 'member.first_name';
                    break;
                case 'collected_by_name' :
                    $orderString = 'collectecBy.first_name';
                    break;
            }

            $records = $records->sortBy($orderString, SORT_REGULAR, $sortDescending);
        };


        return $records->values();
    }

    public function applyDynamicSearch($search, $query)
    {
        $query->when(isset($search['search']), function (Builder $query) use ($search) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');

            $query->orwhereHas('bookItem.book', function (Builder $query) use ($keywords) {
                Book::filterByKeywords($query, $keywords);
            });

            $query->orwhereHas('member', function (Builder $query) use ($keywords) {
                Member::filterByMemberName($query, $keywords);
            });

            $query->orwhereHas('collectedBy', function (Builder $query) use ($keywords) {
                User::filterByMemberName($query, $keywords);
            });
        });

        return $query;
    }

    /**
     * @inheritDoc
     */
    public function model()
    {
        return Penalty::class;
    }

    /**
     * @inheritDoc
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * @param  int  $bookItemId
     *
     * @return mixed
     */
    public function checkIsBookItemDue($bookItemId)
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::findOrFail($bookItemId);

        $returnDate = Carbon::now();
        $returnDueDate = Carbon::parse($bookItem->lastIssuedBook->issued_on)
            ->addDays(getSettingValueByKey(Setting::RETURN_DUE_DAYS));

        if ($returnDate < $returnDueDate) {
            $data['total_due_amount'] = 0;
            $data['total_due_days'] = 0;

            return $data;
        }

        $days = $returnDate->diffInDays($returnDueDate);
        $charge = getSettingValueByKey(Setting::PENALTY_PER_DAY);
        $data['total_due_amount'] = $charge * $days;
        $data['total_due_days'] = $days;

        return $data;
    }
}
