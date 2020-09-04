<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Setting newModelQuery()
 * @method static Builder|Setting newQuery()
 * @method static Builder|Setting query()
 * @method static Builder|Setting whereCreatedAt($value)
 * @method static Builder|Setting whereId($value)
 * @method static Builder|Setting whereKey($value)
 * @method static Builder|Setting whereUpdatedAt($value)
 * @method static Builder|Setting whereValue($value)
 * @mixin Eloquent
 * @property string $display_name
 * @property-read string $logo_url
 * @method static Builder|Setting whereDisplayName($value)
 * @method static Builder|Setting ofKey($key)
 */
class Setting extends Model
{
    use ImageTrait;

    const RESERVE_DUE_DAYS = 'reserve_due_days';
    const RETURN_DUE_DAYS = 'return_due_days';
    const LIBRARY_LOGO = 'library_logo';
    const LIBRARY_NAME = 'library_name';
    const FAVICON_ICON = 'favicon_icon';
    const RESERVE_BOOKS_LIMIT = 'reserve_books_limit';
    const ISSUE_BOOKS_LIMIT = 'issue_books_limit';

    const DEFAULT_LOGO_NAME = 'logo-blue-black.png';
    const DEFAULT_FAVICON_NAME = 'favicon.ico';
    const PENALTY_PER_DAY = 'penalty_per_day';
    const BOOK_DUE_REMINDER_DAYS = 'book_due_reminder_before_days';

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
     * @param  Builder  $query
     * @param  string  $key
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
        if (! empty($this->value)) {
            return $this->imageUrl(Setting::LOGO_PATH.DIRECTORY_SEPARATOR.$this->value);
        }
    }

    /**
     * @return string
     */
    public function getCurrencySymbolAttribute()
    {
        if (! empty($this->value)) {
            return getCurrencySymbol();
        }
    }
}
