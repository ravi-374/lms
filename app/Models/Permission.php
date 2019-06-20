<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;
use Zizaco\Entrust\EntrustPermission;

/**
 * Class Permission
 * @package App\Models
 * @version June 19, 2019, 10:10 am UTC
 *
 * @property string name
 * @property string display_name
 * @property string description
 */
class Permission extends EntrustPermission
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:permissions,name',
    ];
    public $table = 'permissions';
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
}
