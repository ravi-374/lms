<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 05:57 PM
 */

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Setting;
use App\Traits\ImageTrait;
use Arr;
use Illuminate\Http\UploadedFile;

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
     * @return array
     */
    public function createOrUpdate($input)
    {
        $settingKeys = Arr::pluck($input, 'key');
        Setting::whereIn('key', $settingKeys)->delete();

        $settings = [];
        foreach ($input as $data) {
            $settings[] = Setting::create($data);
        }

        return $settings;
    }

    /**
     * @param UploadedFile $image
     *
     * @throws ApiOperationFailedException
     *
     * @return Setting|null
     */
    public function uploadLogo($image)
    {
        /** @var Setting $setting */
        $setting = Setting::where('key', Setting::LIBRARY_LOGO)->first();

        if (!empty($setting->value)) {
            $setting->deleteImage(Setting::LOGO_PATH.DIRECTORY_SEPARATOR.$setting->value);
        }

        $imageName = ImageTrait::makeImage($image, Setting::LOGO_PATH);
        $setting->update(['value' => $imageName]);

        return $setting->fresh();
    }
}