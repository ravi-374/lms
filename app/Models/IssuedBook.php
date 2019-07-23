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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook reserve()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook ofMember($memberId)
 * @property int|null $issuer_id
 * @property int|null $returner_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereIssuerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereReturnerId($value)
 * @property-read string|null $issuer_name
 * @property-read string|null $returner_name
 * @property-read \App\User|null $issuer
 * @property-read \App\User|null $returner
 */
class IssuedBook extends Model
{
    const STATUS_RESERVED = 1;
    const STATUS_ISSUED = 2;
    const STATUS_RETURNED = 3;
    const STATUS_LOST = 4;
    const STATUS_DAMAGED = 5;

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
            return $this->issuer->first_name. " ".$this->issuer->last_name;
        }
    }

    public function getReturnerNameAttribute()
    {
        if (!empty($this->returner_id)) {
            return $this->returner->first_name. " ".$this->returner->last_name;
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

        unset($record['issuer']);
        unset($record['returner']);

        return $record;
    }

    public function getIssueDueDateAttribute()
    {
        if ($this->status == self::STATUS_RESERVED) {
            $reserveDueDays = getSettingValueByKey(Setting::RESERVE_DUE_DAYS);

            return Carbon::parse($this->reserve_date)->addDays($reserveDueDays)->toDateTimeString();
        }
    }
}
