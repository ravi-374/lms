<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BookRequest
 *
 * @property int $id
 * @property int $member_id
 * @property string $book_name
 * @property string $isbn
 * @property string $edition
 * @property int $format
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Member $member
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereBookName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereEdition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereIsbn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookRequest whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $request_count
 */
class BookRequest extends Model
{
    const PENDING = 0;
    const APPROVED = 1;
    const AVAILABLE = 2;
    const CANCELLED = 3;

    const STATUS_ARR = [self::PENDING, self::APPROVED, self::AVAILABLE, self::CANCELLED];

    const STATUS_TEXT = [
        self::PENDING   => 'Pending', self::APPROVED => 'Approved', self::AVAILABLE => 'Available',
        self::CANCELLED => 'Cancelled',
    ];

    public $table = 'book_requests';

    protected $appends = ['request_count'];

    public $fillable = [
        'member_id',
        'book_name',
        'isbn',
        'edition',
        'status',
        'format',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'        => 'integer',
        'member_id' => 'integer',
        'book_name' => 'string',
        'isbn'      => 'string',
        'edition'   => 'string',
        'status'    => 'integer',
        'format'    => 'integer',
    ];

    public static $rules = [
        'book_name' => 'required',
        'isbn'      => 'required',
        'format'    => 'required',
        'edition'   => 'required',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function getRequestCountAttribute()
    {
        return BookRequest::whereIsbn($this->isbn)->count();
    }

    /**
     * @return array
     */
    public function apiM1BookRequestListObj()
    {

        $record = [
            "id"              => $this->id,
            "book_name"       => $this->book_name,
            "isbn"           => $this->isbn,
            "status"          => $this->status,
        ];

        return $record;
    }

    /**
     * @return array
     */
    public function apiM1BookRequestObj()
    {

        $record = [
            "id"              => $this->id,
            "book_name"       => $this->book_name,
            "isbn"           => $this->isbn,
            "status"          => $this->status,
            "edition"          => $this->edition,
        ];

        return $record;
    }
}
