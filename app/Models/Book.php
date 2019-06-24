<?php

namespace App\Models;

use App\Traits\ImageTrait;
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
 * @property int $author_id
 * @property int|null $publisher_id
 * @property float $price
 * @property string $isbn
 * @property string $url
 * @property int $language_id
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Genre[] $genres
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereAuthorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereIsbn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book wherePublishedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book wherePublisherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereUrl($value)
 * @mixin \Eloquent
 */
class Book extends Model
{
    use ImageTrait;
    use ImageTrait {
        deleteImage as traitDeleteImage;
    }

    const IMAGE_PATH = 'images'.DIRECTORY_SEPARATOR.'books';

    public $table = 'books';

    protected $appends = ['image_path'];

    public $fillable = [
        'name',
        'description',
        'image',
        'published_on',
        'author_id',
        'publisher_id',
        'price',
        'isbn',
        'url',
        'language_id',
        'is_featured',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'image' => 'binary',
        'published_on' => 'datetime',
        'author_id' => 'integer',
        'publisher_id' => 'integer',
        'price' => 'float',
        'isbn' => 'string',
        'url' => 'string',
        'language_id' => 'integer',
        'is_featured' => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:books,name',
        'author_id' => 'required',
        'price' => 'required',
        'genres' => 'required',
        'language_id' => 'required',
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
            return $this->traitDeleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
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
}