<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Tag
 *
 * @property int $id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Tag newModelQuery()
 * @method static Builder|Tag newQuery()
 * @method static Builder|Tag query()
 * @method static Builder|Tag whereCreatedAt($value)
 * @method static Builder|Tag whereId($value)
 * @method static Builder|Tag whereName($value)
 * @method static Builder|Tag whereUpdatedAt($value)
 * @mixin Eloquent
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
