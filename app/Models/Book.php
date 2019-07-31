<?php
namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Model;
use phpDocumentor\Reflection\Types\Nullable;

/**
 * App\Models\Book
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string|Nullable $image
 * @property \Illuminate\Support\Carbon $published_on
 * @property string $isbn
 * @property string $url
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Genre[] $genres
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $items
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereIsbn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book wherePublishedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereUrl($value)
 * @mixin \Eloquent
 * @property-read string $image_path
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Author[] $authors
 */
class Book extends Model
{
    use ImageTrait;
    use ImageTrait {
        deleteImage as traitDeleteImage;
    }

    const IMAGE_PATH = 'books';

    public $table = 'books';

    protected $appends = ['image_path'];

    public $fillable = [
        'name',
        'description',
        'image',
        'published_on',
        'isbn',
        'url',
        'is_featured',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'integer',
        'name'         => 'string',
        'description'  => 'string',
        'image'        => 'binary',
        'published_on' => 'datetime',
        'isbn'         => 'string',
        'url'          => 'string',
        'is_featured'  => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'   => 'required|unique:books,name',
        'isbn'   => 'required|unique:books,isbn',
        'genres' => 'required',
    ];

    /**
     * @return string
     */
    public function getImagePathAttribute()
    {
        if (!empty($this->image)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
        }
    }

    /**
     * @return bool
     */
    public function deleteImage()
    {
        if (!empty($this->image)) {
            $this->traitDeleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
            $this->update(['image' => null]);

            return true;
        }
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'book_tags', 'book_id', 'tag_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'book_genres', 'book_id', 'genre_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items()
    {
        return $this->hasMany(BookItem::class, 'book_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function authors()
    {
        return $this->belongsToMany(Author::class, 'book_authors', 'book_id', 'author_id');
    }

    /**
     * @param Builder $query
     * @param array $keywords
     *
     * @return mixed
     */
    public static function filterByKeywords(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(name) LIKE ?', ['%'.strtolower(trim($keyword)).'%']);
            }
        });

        return $query;
    }

    /**
     * @param $query
     * @param $keywords
     *
     * @return mixed
     */
    public static function filterById(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('id = ?', [trim($keyword)]);
            }
        });

        return $query;
    }
}
