<?php

use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

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

/**
 * @param  string  $startDate
 * @param  string  $endDate
 * @param  Collection  $records
 *
 * @return array
 */
function prepareCountFromDate($startDate, $endDate, $records)
{
    $result = [];
    if (! empty($startDate)) {
        /** @var Collection $records */
        $records = $records->groupBy('date');
        while (strtotime($startDate) <= strtotime($endDate)) {
            $monthText = date('M Y', strtotime($startDate));;
            $result[$monthText][] = 0;
            if (isset($records[$startDate])) {
                $result[$monthText][] = $records[$startDate]->count();
            }

            $startDate = Carbon::parse($startDate)->addDay()->toDateString();
        }
    }

    return $result;
}

/**
 * @param  string  $startDate
 * @param  string  $endDate
 * @param  string  $format
 *
 * @return array
 */
function prepareDateText($startDate, $endDate, $format = 'jS M')
{
    $dates = [];
    while (strtotime($startDate) <= strtotime($endDate)) {
        $dateText = date($format, strtotime($startDate));
        $dates[] = $dateText;
        $startDate = Carbon::parse($startDate)->addDay()->toDateString();
    }

    return $dates;
}