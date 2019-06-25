<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * Class Address
 * @package App\Models
 * @version June 20, 2019, 7:32 am UTC
 *
 * @property string address_1
 * @property string address_2
 * @property string city
 * @property string state
 * @property integer zip
 * @property string country
 */
class Address extends Model
{
    public $table = 'addresses';

    public $fillable = [
        'address_1',
        'address_2',
        'city',
        'state',
        'zip',
        'country'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'address_1' => 'string',
        'address_2' => 'string',
        'city' => 'string',
        'state' => 'string',
        'zip' => 'integer',
        'country' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];


    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function owner()
    {
        return $this->morphTo();
    }
}
