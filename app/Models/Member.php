<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\Member
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member query()
 * @mixin \Eloquent
 * @property string $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property int $membership_plan_id
 * @property string|null $phone
 * @property string|null $address1
 * @property string|null $address2
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $zip
 * @property string|null $image
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereAddress1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereAddress2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereMembershipPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereZip($value)
 */
class Member extends Model
{
    use ImageTrait;
    const SUSPENDED = 0;
    const IS_ACTIVE = 1;
    const IMAGE_PATH = 'members';

    public $table = 'members';

    public $fillable = [
        'member_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'membership_plan_id',
        'phone',
        'address1',
        'address2',
        'city',
        'state',
        'country',
        'zip',
        'is_active',
        'image',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'                 => 'integer',
        'member_id'          => 'string',
        'first_name'         => 'string',
        'last_name'          => 'string',
        'email'              => 'string',
        'password'           => 'string',
        'membership_plan_id' => 'integer',
        'phone'              => 'string',
        'address1'           => 'string',
        'address2'           => 'string',
        'city'               => 'string',
        'state'              => 'string',
        'country'            => 'string',
        'zip'                => 'string',
        'is_active'          => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'first_name'         => 'required',
        'last_name'          => 'required',
        'email'              => 'required|unique:members,email',
        'password'           => 'required',
        'membership_plan_id' => 'required',
    ];

    public function deleteMemberImage()
    {
        if (!empty($this->image)) {
            self::deleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image); // thumbnail
        }
    }
}
