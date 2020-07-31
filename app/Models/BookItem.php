<?php

namespace App\Models;

use App\User;
use Auth;
use Carbon\Carbon;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
 * @method static Builder|BookItem newModelQuery()
 * @method static Builder|BookItem newQuery()
 * @method static Builder|BookItem query()
 * @method static Builder|BookItem whereBookId($value)
 * @method static Builder|BookItem whereBookCode($value)
 * @method static Builder|BookItem whereCreatedAt($value)
 * @method static Builder|BookItem whereEdition($value)
 * @method static Builder|BookItem whereFormat($value)
 * @method static Builder|BookItem whereId($value)
 * @method static Builder|BookItem whereLocation($value)
 * @method static Builder|BookItem whereStatus($value)
 * @method static Builder|BookItem whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Book $book
 * @property-read IssuedBook $lastIssuedBook
 * @property-read Collection|IssuedBook[] $issuedBooks
 * @property float $price
 * @method static Builder|BookItem wherePrice($value)
 * @property int|null $publisher_id
 * @property int $language_id
 * @method static Builder|BookItem whereLanguageId($value)
 * @method static Builder|BookItem wherePublisherId($value)
 * @property-read mixed $expected_available_date
 * @property-read Publisher|null $publisher
 * @property-read BookLanguage|null $language
 * @property-read string $bookRequest
 * @property-read int $book_item_status
 * @property-read int|null $issued_books_count
 * @property string|null $file_name
 * @property-read string $book_item_name
 * @property-read int $e_book_url
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookItem eBook()
 */
class BookItem extends Model
{
    const DOCUMENT_PATH = 'book-items';

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
    const FORMAT_E_BOOK = 3;

    public $table = 'book_items';
    protected $appends = ['book_item_status', 'e_book_url'];

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
        'file_name',
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
     * @return BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    /**
     * @return HasMany
     */
    public function issuedBooks()
    {
        return $this->hasMany(IssuedBook::class, 'book_item_id');
    }

    /**
     * @return HasOne
     */
    public function lastIssuedBook()
    {
        return $this->hasOne(IssuedBook::class, 'book_item_id')
            ->lastIssuedBook();
    }

    /**
     * @return BelongsTo
     */
    public function publisher()
    {
        return $this->belongsTo(Publisher::class, 'publisher_id');
    }

    /**
     * @return BelongsTo
     */
    public function language()
    {
        return $this->belongsTo(BookLanguage::class, 'language_id');
    }

    /**
     * @return string
     */
    public function getBookItemNameAttribute()
    {
        return $this->book->name;
    }

    /**
     * @return string|null
     */
    public function getExpectedAvailableDateAttribute()
    {
        $lastIssuedBook = $this->lastIssuedBook;
        if (empty($lastIssuedBook)) {
            return null;
        }

        if ($lastIssuedBook->status == IssuedBook::STATUS_RESERVED) {
            $returnDueDays = getSettingValueByKey(Setting::RETURN_DUE_DAYS);

            return Carbon::now()->addDays($returnDueDays)->toDateTimeString();
        }

        if ($lastIssuedBook->status == IssuedBook::STATUS_ISSUED) {
            return $lastIssuedBook->return_due_date;
        }
    }

    /**
     * @return array
     */
    public function apiObj()
    {
        $bookItem = $this->toArray();
        $bookItem['expected_available_date'] = $this->expected_available_date;

        return $bookItem;
    }

    /**
     * @return int
     */
    public function getBookItemStatusAttribute()
    {
        /** @var IssuedBook $lastIssuedBook */
        $lastIssuedBook = $this->lastIssuedBook;
        if (! empty($lastIssuedBook)) {
            return $lastIssuedBook->status;
        }

        return IssuedBook::STATUS_AVAILABLE;
    }


    /**
     * @return string|null
     */
    public function getEBookUrlAttribute()
    {
        if ($this->format == BookItem::FORMAT_E_BOOK) {
            return (Auth::user() instanceof User) ? url('b1/book-items/'.$this->id.'/download') :
                url('v1/book-items/'.$this->id.'/download');
        }

        return null;
    }

    /**
     * @return array
     */
    public function apiM1Obj()
    {
        $bookItem = [
            "id"                      => $this->id,
            "name"                    => $this->book->name,
            "status"                  => $this->status,
            "language_name"           => $this->language->language_name,
            "authors"                 => implode(',', $this->book->authors->pluck('full_name')->toArray()),
            "isbn_no"                 => $this->book->isbn,
            "edition"                 => $this->edition,
            "book_code"               => $this->book_code,
            "expected_available_date" => $this->expected_available_date,
            "is_reserved"             => ($this->lastIssuedBook) ? $this->lastIssuedBook->status == IssuedBook::STATUS_RESERVED ? true : false : false,
        ];

        return $bookItem;
    }

    public function apiEBookResponse()
    {
        $bookItem = [
            "id"            => $this->id,
            "name"          => $this->book->name,
            "status"        => $this->status,
            "format"        => $this->format,
            "language_name" => $this->language->language_name,
            "authors"       => implode(',', $this->book->authors->pluck('full_name')->toArray()),
            "isbn_no"       => $this->book->isbn,
            "edition"       => $this->edition,
            "book_code"     => $this->book_code,
            "e_book_url"    => $this->e_book_url,
        ];

        return $bookItem;
    }

    /**
     * @param  Builder  $query
     *
     *
     * @return Builder
     */
    public function scopeEBook(Builder $query)
    {
        return $query->where('format', self::FORMAT_E_BOOK);
    }
}
