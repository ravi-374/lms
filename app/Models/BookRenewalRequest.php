<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\BookRenewalRequest
 *
 * @property int $id
 * @property int $book_id
 * @property int $member_id
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereBookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRenewalRequest whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BookRenewalRequest extends Model
{
    const PENDING = 0;
    const APPROVED = 1;
    const CANCELLED = 2;

    public $table = 'book_renewal_requests';

    public $fillable = [
        'book_id',
        'member_id',
        'status',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'        => 'integer',
        'book_id'   => 'integer',
        'member_id' => 'integer',
        'status'    => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'book_id' => 'required',
    ];
}
