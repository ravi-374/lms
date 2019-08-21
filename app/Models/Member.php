<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
 * @property string|null $image
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereUpdatedAt($value)
 * @property string $member_id
 * @property-read \App\Models\Address $address
 * @property-read \App\Models\MembershipPlan $membershipPlan
 * @property string|null $activation_code
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereActivationCode($value)
 */
class Member extends Authenticatable implements JWTSubject
{
    use ImageTrait;
    const SUSPENDED = 0;
    const IS_ACTIVE = 1;
    const IMAGE_PATH = 'members';

    public $table = 'members';
    protected $appends = ['image_path'];

    public $fillable = [
        'member_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'membership_plan_id',
        'phone',
        'is_active',
        'image',
        'activation_code',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
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
        'password'           => 'required|min:6',
        'membership_plan_id' => 'required',
    ];

    public static $memberRules = [
        'first_name' => 'required',
        'last_name'  => 'required',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['issued_for' => 'member'];
    }

    public function getImagePathAttribute()
    {
        if (!empty($this->image)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
        }
    }

    public function deleteMemberImage()
    {
        if (!empty($this->image)) {
            self::deleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image); // thumbnail

            $this->update(['image' => null]);
        }
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function address()
    {
        return $this->morphOne(Address::class, 'owner')->with('country');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function membershipPlan()
    {
        return $this->belongsTo(MembershipPlan::class, 'membership_plan_id');
    }

    /**
     * @param Builder $query
     * @param array $keywords
     *
     * @return mixed
     */
    public static function filterByMemberName(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(first_name) LIKE ?', [trim(strtolower($keyword))]);
                $query->orWhereRaw('lower(last_name) LIKE ?', [trim(strtolower($keyword))]);
            }
        });

        return $query;
    }
}
