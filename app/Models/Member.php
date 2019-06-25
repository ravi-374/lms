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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Member whereUpdatedAt($value)
 */
class Member extends Model
{
    use ImageTrait;
    const SUSPENDED = 0;
    const IS_ACTIVE = 1;
    const IMAGE_PATH = 'members';

    public $table = 'members';

    protected $primaryKey = 'id';
    public $incrementing = false;


    public $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'membership_plan_id',
        'phone',
        'is_active',
        'image',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'                 => 'string',
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
        'password'           => 'required',
        'membership_plan_id' => 'required',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function (Member $member) {
            $member->id = uniqid();
        });
    }

    public function deleteMemberImage()
    {
        if (!empty($this->image)) {
            self::deleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image); // thumbnail
        }
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function address()
    {
        return $this->morphOne(Address::class, 'owner');
    }
}
