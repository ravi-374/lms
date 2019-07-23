<?php

use App\Models\Setting;

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