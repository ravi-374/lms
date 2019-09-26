<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SeriesBook
 *
 * @property int $id
 * @property int $series_id
 * @property int $book_id
 * @property int $sequence
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereBookId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereSequence($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereSeriesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeriesBook whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SeriesBook extends Model
{
    public $table = 'series_books';

    public $fillable = [
        'series_id',
        'book_id',
        'sequence',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'        => 'integer',
        'series_id' => 'integer',
        'book_id'   => 'integer',
        'sequence'  => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'series_id' => 'required',
        'book_id'   => 'required',
        'sequence'  => 'required',
    ];

    /**
     * @return BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
