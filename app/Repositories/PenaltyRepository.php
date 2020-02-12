<?php

namespace App\Repositories;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Penalty;
use App\Models\Setting;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use Carbon\Carbon;

/**
 * Class PenaltyRepository
 */
class PenaltyRepository extends BaseRepository implements PenaltyRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'member_id',
        'book_item_id',
        'penalty_collected',
        'collected_by',
    ];

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
    public function calculatePenaltyAmount($bookItemId)
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
