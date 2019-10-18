<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\BookSeries
 *
 * @property int $id
 * @property string $title
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|BookSeries newModelQuery()
 * @method static Builder|BookSeries newQuery()
 * @method static Builder|BookSeries query()
 * @method static Builder|BookSeries whereCreatedAt($value)
 * @method static Builder|BookSeries whereId($value)
 * @method static Builder|BookSeries whereTitle($value)
 * @method static Builder|BookSeries whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Collection|SeriesBook[] $seriesItems
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
     * @return HasMany
     */
    public function seriesItems()
    {
        return $this->hasMany(SeriesBook::class, 'series_id')->orderBy('sequence');
    }
}
