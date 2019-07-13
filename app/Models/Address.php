<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\Address
 *
 * @property int $id
 * @property int $owner_id
 * @property string $owner_type
 * @property string $address_1
 * @property string|null $address_2
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property string|null $country_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Address[] $owner
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereAddress1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereAddress2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereOwnerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Address whereZip($value)
 * @mixin \Eloquent
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
        'country_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'         => 'integer',
        'address_1'  => 'string',
        'address_2'  => 'string',
        'city'       => 'string',
        'state'      => 'string',
        'zip'        => 'integer',
        'country_id' => 'string',
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
