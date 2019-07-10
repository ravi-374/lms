<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreatePermissionAPIRequest;
use App\Http\Requests\API\UpdatePermissionAPIRequest;
use App\Models\Permission;
use App\Repositories\PermissionRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PermissionAPIController
 * @package App\Http\Controllers\API
 */
class PermissionAPIController extends AppBaseController
{
    /** @var  PermissionRepository */
    private $permissionRepository;

    public function __construct(PermissionRepository $permissionRepo)
    {
        $this->permissionRepository = $permissionRepo;
    }

    /**
     * Display a listing of the Permission.
     * GET|HEAD /permissions
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $permissions = $this->permissionRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($permissions->toArray(), 'Permissions retrieved successfully.');
    }

    /**
     * Store a newly created Permission in storage.
     * POST /permissions
     *
     * @param CreatePermissionAPIRequest $request
     *
     * @return JsonResponse
     */
    public function store(CreatePermissionAPIRequest $request)
    {
        $input = $request->all();

        $permission = $this->permissionRepository->create($input);

        return $this->sendResponse($permission->toArray(), 'Permission saved successfully.');
    }

    /**
     * Display the specified Permission.
     * GET|HEAD /permissions/{id}
     *
     * @param Permission $permission
     *
     * @return JsonResponse
     */
    public function show(Permission $permission)
    {
        return $this->sendResponse($permission->toArray(), 'Permission retrieved successfully.');
    }

    /**
     * Update the specified Permission in storage.
     * PUT/PATCH /permissions/{id}
     *
     * @param Permission $permission
     * @param UpdatePermissionAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(Permission $permission, UpdatePermissionAPIRequest $request)
    {
        $input = $request->all();

        $permission = $this->permissionRepository->update($input, $permission->id);

        return $this->sendResponse($permission->toArray(), 'Permission updated successfully.');
    }

    /**
     * Remove the specified Permission from storage.
     * DELETE /permissions/{id}
     *
     * @param Permission $permission
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return $this->sendResponse($permission, 'Permission deleted successfully.');
    }
}
