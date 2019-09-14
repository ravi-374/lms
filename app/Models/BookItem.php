<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BookItem
 *
 * @property int $id
 * @property int $book_id
 * @property string $book_code
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereBookCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereEdition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Book $book
 * @property-read \App\Models\IssuedBook $lastIssuedBook
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IssuedBook[] $issuedBooks
 * @property float $price
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem wherePrice($value)
 * @property int|null $publisher_id
 * @property int $language_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem wherePublisherId($value)
 * @property-read mixed $expected_available_date
 * @property-read \App\Models\Publisher|null $publisher
 * @property-read \App\Models\BookLanguage|null $language
 */
class BookItem extends Model
{
    const STATUS_AVAILABLE = 1;
    const STATUS_NOT_AVAILABLE = 2;
    const STATUS_LOST = 3;
    const STATUS_DAMAGED = 4;

    const STATUS_ARRAY = [
        self::STATUS_AVAILABLE,
        self::STATUS_NOT_AVAILABLE,
        self::STATUS_LOST,
        self::STATUS_DAMAGED,
    ];

    const FORMAT_HARDCOVER = 1;
    const FORMAT_PAPERBACK = 2;

    public $table = 'book_items';
    protected $appends = ['book_item_status'];

    public $fillable = [
        'book_id',
        'book_code',
        'edition',
        'format',
        'status',
        'location',
        'price',
        'language_id',
        'publisher_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'integer',
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function lastIssuedBook()
    {
        return $this->hasOne(IssuedBook::class, 'book_item_id')
            ->lastIssuedBook();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function publisher()
    {
        return $this->belongsTo(Publisher::class, 'publisher_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function language()
    {
        return $this->belongsTo(BookLanguage::class, 'language_id');
    }

    public function getExpectedAvailableDateAttribute()
    {
        $lastIssuedBook = $this->lastIssuedBook;
        if (empty($lastIssuedBook)) {
            return;
        }

        if ($lastIssuedBook->status == IssuedBook::STATUS_RESERVED) {
            $returnDueDays = getSettingValueByKey(Setting::RETURN_DUE_DAYS);

            return Carbon::now()->addDays($returnDueDays)->toDateTimeString();
        }

        if ($lastIssuedBook->status == IssuedBook::STATUS_ISSUED) {
            return $lastIssuedBook->return_due_date;
        }
    }

    public function apiObj()
    {
        $bookItem = $this->toArray();
        $bookItem['expected_available_date'] = $this->expected_available_date;

        return $bookItem;
    }

    public function getBookItemStatusAttribute()
    {
        /** @var IssuedBook $lastIssuedBook */
        $lastIssuedBook = $this->lastIssuedBook;
        if (!empty($lastIssuedBook)) {
            return $lastIssuedBook->status;
        }

        return IssuedBook::STATUS_AVAILABLE;
    }
}
