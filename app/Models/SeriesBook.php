<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class SeriesBook
 * @package App\Models
 * @version June 25, 2019, 11:04 am UTC
 *
 * @property integer series_id
 * @property integer book_id
 * @property integer sequence
 */
class SeriesBook extends Model
{
    public $table = 'series_books';

    public $fillable = [
        'series_id',
        'book_id',
        'sequence'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'series_id' => 'integer',
        'book_id' => 'integer',
        'sequence' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'series_id' => 'required',
        'book_id' => 'required',
        'sequence' => 'required'
    ];

    
}
