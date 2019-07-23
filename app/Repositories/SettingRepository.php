<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 05:57 PM
 */
namespace App\Repositories;

use App\Models\Setting;

/**
 * Class SettingRepository
 * @package App\Repositories
 */
class SettingRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'key',
        'value',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Setting::class;
    }

    /**
     * @param array $input
     *
     * @return Setting
     */
    public function createOrUpdate($input)
    {
        $setting = Setting::where('key', $input['key'])->first();

        if (empty($setting)) {
            $setting = Setting::create($input);

            return $setting;
        }

        $setting->update($input);

        return $setting->fresh();
    }
}