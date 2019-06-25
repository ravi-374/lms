<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as Model;
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
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereStripePlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MembershipPlan extends Model
{
    const MONTHLY_FREQUENCY = 1;
    const YEARLY_FREQUENCY = 2;

    public $table = 'membership_plans';

    protected $primaryKey = 'id';
    public $incrementing = false;

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
        'id'             => 'string',
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
        'name'           => 'required',
        'price'          => 'required',
        'frequency'      => 'required',
        'stripe_plan_id' => 'required',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function (MembershipPlan $model) {
            $model->id = uniqid();
            $model->slug = Str::slug($model->name);
        });
    }
}