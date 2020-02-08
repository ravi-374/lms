<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;


/**
 * App\Models\Author
 *
 * @property int $id
 * @property string $first_name
 * @property string|null $last_name
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Author newModelQuery()
 * @method static Builder|Author newQuery()
 * @method static Builder|Author query()
 * @method static Builder|Author whereCreatedAt($value)
 * @method static Builder|Author whereDescription($value)
 * @method static Builder|Author whereFirstName($value)
 * @method static Builder|Author whereId($value)
 * @method static Builder|Author whereLastName($value)
 * @method static Builder|Author whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Collection|Book[] $books
 */
class Author extends Model
{
    public $table = 'authors';

    public $fillable = [
        'first_name',
        'last_name',
        'description',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'          => 'integer',
        'first_name'  => 'string',
        'last_name'   => 'string',
        'description' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'first_name' => 'required',
    ];

    /**
     * @return BelongsToMany
     */
    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_authors', 'author_id', 'book_id');
    }

    /**
     * @param  Builder  $query
     * @param  array  $keywords
     *
     * @return mixed
     */
    public static function filterByKeywords(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(first_name) LIKE ?', ['%'.strtolower(trim($keyword)).'%']);
                $query->orWhereRaw('lower(last_name) LIKE ?', ['%'.strtolower(trim($keyword)).'%']);
            }
        });

        return $query;
    }

    /**
     * @param  Builder  $query
     * @param $keywords
     *
     * @return mixed
     */
    public static function filterById(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('authors.id = ?', [trim($keyword)]);
            }
        });

        return $query;
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
                $query->orWhereRaw('lower(first_name) LIKE ?', [trim(strtolower($keyword))]);
            }
        });

        return $query;
    }

    public function getFullNameAttribute($value)
    {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name);
    }
}
