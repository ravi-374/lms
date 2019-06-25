<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BookItem
 *
 * @property int $id
 * @property int $book_id
 * @property string $book_item_id
 * @property string $edition
 * @property int $format
 * @property int $status
 * @property string $location
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereBookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereBookItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereEdition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BookItem extends Model
{
    const STATUS_AVAILABLE = 1;
    const STATUS_ISSUED = 2;
    const STATUS_LOST = 3;
    const STATUS_DAMAGED = 4;

    const STATUS_ARRAY = [
        self::STATUS_AVAILABLE, self::STATUS_ISSUED, self::STATUS_LOST, self::STATUS_DAMAGED
    ];

    const FORMAT_HARDCOVER = 1;
    const FORMAT_PAPERBACK = 2;

    public $table = 'book_items';

    public $fillable = [
        'book_id',
        'book_item_id',
        'edition',
        'format',
        'status',
        'location',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
