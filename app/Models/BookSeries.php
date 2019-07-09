<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class BookSeries
 * @package App\Models
 * @version June 25, 2019, 10:36 am UTC
 *
 * @property string title
 */
class BookSeries extends Model
{
    public $table = 'book_series';

    public $fillable = [
        'title'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'title' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'title' => 'required|unique:book_series,title',
    ];

}
