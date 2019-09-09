<?php

use App\Models\Setting;
use Illuminate\Database\Eloquent\Builder;

/**
 * @param string $key
 *
 * @return null|string
 */
function getSettingValueByKey($key)
{
    /** @var Setting $setting */
    $setting = Setting::where('key', $key)->first();

    if (!empty($setting)) {
        return $setting->value;
    }
}

/**
 * @param string $str
 * @param string $delimiter
 *
 * @return array
 */
function explode_trim_remove_empty_values_from_array($str, $delimiter = ',')
{
    $arr = explode($delimiter, trim($str));
    $arr = array_map('trim', $arr);
    $arr = array_filter($arr, function ($value) {
        return !empty($value);
    });

    return $arr;
}

/**
 * @param Builder $query
 * @param string $keywords
 * @param array $columns
 *
 *
 * @return mixed
 */
function filterByColumns(&$query, $keywords, $columns)
{
    $keywords = explode_trim_remove_empty_values_from_array($keywords, ' ');

    $query->where(function (Builder $query) use ($keywords, $columns) {
        foreach ($keywords as $keyword) {
            foreach ($columns as $column) {
                $query->orWhereRaw("lower($column) LIKE ?", ['%'.trim(strtolower($keyword)).'%']);
            }
        }
    });

    return $query;
}