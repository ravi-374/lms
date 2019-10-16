<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Genre
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Book[] $books
 * @property int $is_default
 * @property-read int|null $books_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Genre whereIsDefault($value)
 */
class Genre extends Model
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:genres,name',
    ];

    public $table = 'genres';
    public $fillable = [
        'name',
        'description',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'          => 'integer',
        'name'        => 'string',
        'description' => 'string',
    ];

    /**
     * @return BelongsToMany
     */
    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_genres', 'genre_id', 'book_id');
    }
}
