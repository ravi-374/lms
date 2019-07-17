<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\BookSeries
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SeriesBook[] $seriesItems
 */
class BookSeries extends Model
{
    public $table = 'book_series';

    public $fillable = [
        'title',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'    => 'integer',
        'title' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'title' => 'required|unique:book_series,title',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function seriesItems()
    {
        return $this->hasMany(SeriesBook::class, 'series_id')->orderBy('sequence');
    }
}
