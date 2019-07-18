<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\Publisher
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $publishers
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $bookItems
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'publisher_id');
    }
}
