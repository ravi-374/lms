<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class BookLanguage
 *
 * @package App\Models
 * @version June 19, 2019, 9:49 am UTC
 * @property string language_name
 * @property string language_code
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereLanguageCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereLanguageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read  \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $bookItems
 */
class BookLanguage extends Model
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'language_name' => 'required|unique:book_languages,language_name',
        'language_code' => 'required|unique:book_languages,language_code',
    ];
    public $table = 'book_languages';
    public $fillable = [
        'language_name',
        'language_code',
    ];
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'            => 'integer',
        'language_name' => 'string',
        'language_code' => 'string',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'language_id');
    }
}
