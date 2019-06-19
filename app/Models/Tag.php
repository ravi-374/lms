<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Tag
 * @package App\Models
 * @version June 19, 2019, 6:00 am UTC
 *
 * @property string name
 */
class Tag extends Model
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:tags,name',
    ];
    public $table = 'tags';
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
}
