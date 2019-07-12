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
 * @property bool $is_available
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Book $book
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IssuedBook[] $issuedBooks
 * @property float $price
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem wherePrice($value)
 */
class BookItem extends Model
{
    const STATUS_AVAILABLE = 1;
    const STATUS_NOT_AVAILABLE = 2;

    const STATUS_ARRAY = [
        self::STATUS_AVAILABLE, self::STATUS_NOT_AVAILABLE
    ];

    const FORMAT_HARDCOVER = 1;
    const FORMAT_PAPERBACK = 2;

    public $table = 'book_items';

    public $fillable = [
        'book_id',
        'book_item_id',
        'edition',
        'format',
        'is_available',
        'location',
        'price',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function issuedBooks()
    {
        return $this->hasMany(IssuedBook::class, 'book_item_id');
    }
}
