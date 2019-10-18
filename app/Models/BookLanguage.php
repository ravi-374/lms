<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Class BookLanguage
 *
 * @version June 19, 2019, 9:49 am UTC
 * @property string language_name
 * @property string language_code
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|BookLanguage newModelQuery()
 * @method static Builder|BookLanguage newQuery()
 * @method static Builder|BookLanguage query()
 * @method static Builder|BookLanguage whereCreatedAt($value)
 * @method static Builder|BookLanguage whereId($value)
 * @method static Builder|BookLanguage whereLanguageCode($value)
 * @method static Builder|BookLanguage whereLanguageName($value)
 * @method static Builder|BookLanguage whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read  Collection|BookItem[] $bookItems
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
     * @return HasMany
     */
    public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'language_id');
    }
}
