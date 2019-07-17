<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 05:56 PM
 */
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateSettingAPIRequest;
use App\Http\Requests\API\UpdateSettingAPIRequest;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingAPIController extends AppBaseController
{
    /** @var SettingRepository */
    private $settingRepo;

    public function __construct(SettingRepository $settingRepo)
    {
        $this->settingRepo = $settingRepo;
    }


    /**
     * Display a listing of the Setting.
     * GET|HEAD /settings
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $settings = $this->settingRepo->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($settings->toArray(), 'Settings retrieved successfully.');
    }

    /**
     * Store a newly created Setting in storage.
     * POST /settings
     *
     * @param CreateSettingAPIRequest $request
     *
     * @return JsonResponse
     */
    public function store(CreateSettingAPIRequest $request)
    {
        $input = $request->all();

        $setting = $this->settingRepo->create($input);

        return $this->sendResponse($setting->toArray(), 'Setting saved successfully.');
    }

    /**
     * Display the specified Setting.
     * GET|HEAD /settings/{id}
     *
     * @param Setting $setting
     *
     * @return JsonResponse
     */
    public function show(Setting $setting)
    {
        return $this->sendResponse($setting->toArray(), 'Setting retrieved successfully.');
    }

    /**
     * Update the specified Setting in storage.
     * PUT/PATCH /settings/{id}
     *
     * @param Setting $setting
     * @param UpdateSettingAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(Setting $setting, UpdateSettingAPIRequest $request)
    {
        $input = $request->all();

        $setting = $this->settingRepo->update($input, $setting->id);

        return $this->sendResponse($setting->toArray(), 'Setting updated successfully.');
    }

    /**
     * Remove the specified Setting from storage.
     * DELETE settings/{id}
     *
     * @param Setting $setting
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Setting $setting)
    {
        $setting->delete();

        return $this->sendResponse($setting, 'Setting deleted successfully.');
    }
}