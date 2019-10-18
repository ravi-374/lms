<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Str;

/**
 * App\Models\MembershipPlan
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property string $description
 * @property int $frequency
 * @property string $slug
 * @property string $stripe_plan_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|MembershipPlan newModelQuery()
 * @method static Builder|MembershipPlan newQuery()
 * @method static Builder|MembershipPlan query()
 * @method static Builder|MembershipPlan whereCreatedAt($value)
 * @method static Builder|MembershipPlan whereDescription($value)
 * @method static Builder|MembershipPlan whereFrequency($value)
 * @method static Builder|MembershipPlan whereId($value)
 * @method static Builder|MembershipPlan whereName($value)
 * @method static Builder|MembershipPlan wherePrice($value)
 * @method static Builder|MembershipPlan whereSlug($value)
 * @method static Builder|MembershipPlan whereStripePlanId($value)
 * @method static Builder|MembershipPlan whereUpdatedAt($value)
 * @mixin Eloquent
 * @property string $membership_plan_id
 * @property-read Member $member
 * @method static Builder|MembershipPlan whereMembershipPlanId($value)
 */
class MembershipPlan extends Model
{
    const MONTHLY_FREQUENCY = 1;
    const YEARLY_FREQUENCY = 2;

    public $table = 'membership_plans';

    public $fillable = [
        'name',
        'price',
        'description',
        'frequency',
        'slug',
        'stripe_plan_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'             => 'integer',
        'name'           => 'string',
        'price'          => 'float',
        'description'    => 'string',
        'frequency'      => 'integer',
        'slug'           => 'string',
        'stripe_plan_id' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'      => 'required',
        'price'     => 'required',
        'frequency' => 'required',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function (MembershipPlan $model) {
            $model->slug = Str::slug($model->name);
        });
    }

    /**
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'membership_plan_id');
    }
}
