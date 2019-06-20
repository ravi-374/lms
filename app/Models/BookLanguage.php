<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class BookLanguage
 * @package App\Models
 * @version June 19, 2019, 9:49 am UTC
 *
 * @property string language_name
 * @property string language_code
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
}
