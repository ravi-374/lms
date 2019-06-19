<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;
use Zizaco\Entrust\EntrustRole;

/**
 * Class Role
 * @package App\Models
 * @version June 19, 2019, 10:01 am UTC
 *
 * @property string name
 * @property string display_name
 * @property string description
 */
class Role extends EntrustRole
{
    public $table = 'roles';

    public $fillable = [
        'name',
        'display_name',
        'description',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'integer',
        'name'         => 'string',
        'display_name' => 'string',
        'description'  => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:roles,name',
    ];
}
