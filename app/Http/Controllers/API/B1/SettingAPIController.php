<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 12-07-2019
 * Time: 05:56 PM
 */

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateSettingAPIRequest;
use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\SettingRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Class SettingAPIController
 * @package App\Http\Controllers\API\B1
 */
class SettingAPIController extends AppBaseController
{
    /** @var SettingRepository */
    private $settingRepo;

    /** @var SettingRepositoryInterface */
    private $settingRepoInterface;

    public function __construct(
        SettingRepositoryInterface $settingRepoInterface,
        SettingRepository $settingRepo
    ) {
        $this->settingRepo = $settingRepo;
        $this->settingRepoInterface = $settingRepoInterface;
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
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $input = $request->all();

        foreach ($input as $data) {
            $validator = Validator::make($data, Setting::$rules);
            if ($validator->fails()) {
                $errors = $validator->errors()->first();

                return $this->sendError($errors, 422);
            }
        }

        $settings = $this->settingRepoInterface->createOrUpdate($input);

        return $this->sendResponse($settings, 'Setting saved successfully.');
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

    /**
     * @param Request $request
     *
     * @throws \App\Exceptions\ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function uploadLogo(Request $request)
    {
        $request->validate(['logo' => 'required']);

        $setting = $this->settingRepoInterface->uploadLogo($request->file('logo'));

        return $this->sendResponse($setting, 'Logo updated successfully.');
    }
}