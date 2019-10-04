<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 05:55 PM
 */

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereValue($value)
 * @mixin \Eloquent
 * @property string $display_name
 * @property-read string $logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Setting ofKey($key)
 */
class Setting extends Model
{
    use ImageTrait;

    const RESERVE_DUE_DAYS = 'reserve_due_days';
    const RETURN_DUE_DAYS = 'return_due_days';
    const LIBRARY_LOGO = 'library_logo';
    const LIBRARY_NAME = 'library_name';
    const FAVICON_ICON = 'favicon_icon';

    const LOGO_PATH = 'images';

    public $table = 'settings';
    public $fillable = [
        'key',
        'value',
        'display_name',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'key'          => 'string',
        'value'        => 'string',
        'display_name' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'key'          => 'required',
        'value'        => 'required',
        'display_name' => 'required',
    ];

    /**
     * @param Builder $query
     * @param string $key
     *
     * @return Builder
     */
    public function scopeOfKey(Builder $query, $key)
    {
        return $query->where('key', $key);
    }

    /**
     * @return string
     */
    public function getLogoUrlAttribute()
    {
        if (!empty($this->value)) {
            return $this->imageUrl(Setting::LOGO_PATH.DIRECTORY_SEPARATOR.$this->value);
        }
    }
}
