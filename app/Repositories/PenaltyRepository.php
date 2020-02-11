<?php

namespace App\Repositories;

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
     * @param  array  $input
     *
     * @return mixed
     */
    public function penaltyCharge($input)
    {
        /** @var IssuedBook $issuedbook */
        $issuedbook = IssuedBook::whereBookItemId($input['book_id'])->first();
        $data['collect_penalty'] = false;

        $returnDate = Carbon::parse($input['return_date']);
        $returnDueDate = Carbon::parse($issuedbook->issued_on)->addDays(IssuedBook::BOOK_RETURN_PERIOD);
        if($returnDate > $returnDueDate) {
            $days = $returnDate->diffInDays($returnDueDate);
            if ($days) {
                $data['collect_penalty'] = true;
                $data['penalty_amount'] = Setting::PENALTY_PER_DAY * $days;
                $data['total_due_days'] = $days;

                return $data;
            }
        }

        return $data;
    }
}
