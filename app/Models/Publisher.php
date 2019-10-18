<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\Publisher
 *
 * @property int $id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|BookItem[] $publishers
 * @method static Builder|Publisher newModelQuery()
 * @method static Builder|Publisher newQuery()
 * @method static Builder|Publisher query()
 * @method static Builder|Publisher whereCreatedAt($value)
 * @method static Builder|Publisher whereId($value)
 * @method static Builder|Publisher whereName($value)
 * @method static Builder|Publisher whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Collection|BookItem[] $bookItems
 */
class Publisher extends Model
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:publishers,name',
    ];

    public $table = 'publishers';

    public $fillable = [
        'name',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'   => 'integer',
        'name' => 'string',
    ];

    /**
     * @return HasMany
     */
    public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'publisher_id');
    }

    /**
     * @param  Builder  $query
     * @param  array  $keywords
     *
     * @return mixed
     */
    public static function filterByName(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(name) LIKE ?', [trim(strtolower($keyword))]);
            }
        });

        return $query;
    }
}
