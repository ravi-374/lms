<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\IssuedBook
 *
 * @property int $id
 * @property int $book_id
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereBookId($value)
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
 */
class IssuedBook extends Model
{
    const STATUS_RESERVED = 1;
    const STATUS_ISSUED = 2;
    const STATUS_RETURNED = 3;
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'member_id'       => 'required|numeric',
        'status'          => 'required|numeric',
    ];
    public $table = 'issued_books';
    public $fillable = [
        'book_id',
        'member_id',
        'reserve_date',
        'issued_on',
        'return_due_date',
        'note',
        'return_date',
        'status',
    ];
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'integer',
        'book_id'      => 'integer',
        'member_id'    => 'integer',
        'reserve_date' => 'datetime',
        'issued_on'    => 'datetime',
        'note'         => 'string',
        'return_date'  => 'datetime',
        'status'       => 'integer',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
