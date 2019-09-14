<?php

namespace App\Models;

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\IssuedBook
 *
 * @property int $id
 * @property int $book_item_id
 * @property int $member_id
 * @property string $reserve_date
 * @property string $issued_on
 * @property string $return_due_date
 * @property string $note
 * @property string $return_date
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereBookItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereIssuedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereReserveDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereReturnDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereReturnDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\BookItem $bookItem
 * @property-read \App\Models\Member $member
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook reserve()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook ofMember($memberId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook ofBookItem($bookItemId)
 * @property int|null $issuer_id
 * @property int|null $returner_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereIssuerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereReturnerId($value)
 * @property-read string|null $issuer_name
 * @property-read string|null $returner_name
 * @property-read \App\User|null $issuer
 * @property-read \App\User|null $returner
 * @property-read mixed $issue_due_date
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook lastIssuedBook()
 */
class IssuedBook extends Model
{
    const STATUS_RESERVED = 1;
    const STATUS_ISSUED = 2;
    const STATUS_RETURNED = 3;
    const STATUS_AVAILABLE = 4;
    const STATUS_UN_RESERVED = 5;
    const STATUS_LOST = 6;
    const STATUS_DAMAGED = 7;

    const STATUS_IN_STRING = ['issued', 'reserved', 'returned', 'unreserved', 'lost', 'damage'];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'member_id' => 'required|numeric',
        'status'    => 'required|numeric',
    ];

    public $table = 'issued_books';

    protected $appends = ['issue_due_date'];

    public $fillable = [
        'book_item_id',
        'member_id',
        'reserve_date',
        'issued_on',
        'return_due_date',
        'note',
        'return_date',
        'status',
        'issuer_id',
        'returner_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'integer',
        'book_item_id' => 'integer',
        'member_id'    => 'integer',
        'reserve_date' => 'datetime',
        'issued_on'    => 'datetime',
        'note'         => 'string',
        'return_date'  => 'datetime',
        'status'       => 'integer',
        'issuer_id'    => 'integer',
        'returner_id'  => 'integer',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bookItem()
    {
        return $this->belongsTo(BookItem::class, 'book_item_id');
    }

    /**
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopeReserve(Builder $query)
    {
        return $query->where('status', self::STATUS_RESERVED);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function issuer()
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function returner()
    {
        return $this->belongsTo(User::class, 'returner_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * @param int $memberId
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopeOfMember(Builder $query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    public function getIssuerNameAttribute()
    {
        if (!empty($this->issuer_id)) {
            return $this->issuer->first_name." ".$this->issuer->last_name;
        }
    }

    public function getReturnerNameAttribute()
    {
        if (!empty($this->returner_id)) {
            return $this->returner->first_name." ".$this->returner->last_name;
        }
    }

    /**
     * @return array
     */
    public function apiObj()
    {
        $record = $this->toArray();
        $record['issuer_name'] = $this->issuer_name;
        $record['returner_name'] = $this->returner_name;
        if (isset($record['book_item']['last_issued_book'])) {
            $record['expected_available_date'] = $this->getExpectedAvailableDate($record['book_item']['last_issued_book']);
        }
        unset($record['issuer']);
        unset($record['returner']);

        return $record;
    }

    public function getExpectedAvailableDate($lastIssuedBook)
    {
        if (empty($lastIssuedBook)) {
            return;
        }

        if ($lastIssuedBook['status'] == IssuedBook::STATUS_RESERVED) {
            $returnDueDays = getSettingValueByKey(Setting::RETURN_DUE_DAYS);

            return Carbon::now()->addDays($returnDueDays)->toDateTimeString();
        }
        if ($lastIssuedBook['status'] == IssuedBook::STATUS_ISSUED) {
            return $lastIssuedBook['return_due_date'];
        }
    }

    public function getIssueDueDateAttribute()
    {
        if ($this->status == self::STATUS_RESERVED) {
            $reserveDueDays = getSettingValueByKey(Setting::RESERVE_DUE_DAYS);

            return Carbon::parse($this->reserve_date)->addDays($reserveDueDays)->toDateTimeString();
        }
    }

    /**
     * @param int $bookItemId
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopeOfBookItem(Builder $query, $bookItemId)
    {
        return $query->where('book_item_id', $bookItemId);
    }

    /**
     * @param Builder $query
     *
     * @return Builder
     */
    public function scopeLastIssuedBook(Builder $query)
    {
        return $query->where('status', '!=', self::STATUS_RETURNED);
    }

    /**
     * @param string $statusInString
     *
     * @return int|null
     */
    public static function getStatusFromString($statusInString)
    {
        $status = null;
        switch ($statusInString) {
            case 'issued' :
                $status = self::STATUS_ISSUED;
                break;
            case 'returned' :
                $status = self::STATUS_RETURNED;
                break;
            case 'reserved' :
                $status = self::STATUS_RESERVED;
                break;
            case 'unreserved' :
                $status = self::STATUS_UN_RESERVED;
                break;
            case 'lost' :
                $status = self::STATUS_LOST;
                break;
            case 'damage' :
                $status = self::STATUS_DAMAGED;
                break;
        }

        return $status;
    }
}
