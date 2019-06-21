<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateRoleAPIRequest;
use App\Http\Requests\API\UpdateRoleAPIRequest;
use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;
use Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * Class RoleAPIController
 * @package App\Http\Controllers\API
 */
class RoleAPIController extends AppBaseController
{
    /** @var  RoleRepository */
    private $roleRepository;

    public function __construct(RoleRepository $roleRepo)
    {
        $this->roleRepository = $roleRepo;
    }

    /**
     * Display a listing of the Role.
     * GET|HEAD /roles
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $roles = $this->roleRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($roles->toArray(), 'Roles retrieved successfully.');
    }

    /**
     * Store a newly created Role in storage.
     * POST /roles
     * @param CreateRoleAPIRequest $request
     *
     * @throws \App\Exceptions\ApiOperationFailedException
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateRoleAPIRequest $request)
    {
        $input = $request->all();

        $role = $this->roleRepository->store($input);

        return $this->sendResponse($role->toArray(), 'Role saved successfully.');
    }

    /**
     * Display the specified Role.
     * GET|HEAD /roles/{id}
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Role $role */
        $role = $this->roleRepository->find($id);

        return $this->sendResponse($role->toArray(), 'Role retrieved successfully.');
    }

    /**
     * Update the specified Role in storage.
     * PUT/PATCH /roles/{id}
     * @param int $id
     * @param UpdateRoleAPIRequest $request
     *
     * @throws \App\Exceptions\ApiOperationFailedException
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateRoleAPIRequest $request)
    {
        $input = $request->all();

        /** @var Role $role */
        $this->roleRepository->findOrFail($id);

        $role = $this->roleRepository->update($input, $id);

        return $this->sendResponse($role->toArray(), 'Role updated successfully.');
    }

    /**
     * Remove the specified Role from storage.
     * DELETE /roles/{id}
     *
     * @param int $id
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Role $role */
        $role = Role::withCount('perms')->findOrFail($id);
        if ($role->perms_count > 0) {
            return $this->sendError(
                'Role is attached with one or more permissions.',
                HttpResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $role->delete();

        return $this->sendResponse($id, 'Role deleted successfully.');
    }
}
