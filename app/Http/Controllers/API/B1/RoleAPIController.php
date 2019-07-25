<?php
namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateRoleAPIRequest;
use App\Http\Requests\API\UpdateRoleAPIRequest;
use App\Models\Role;
use App\Repositories\RoleRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
     *
     * @return JsonResponse
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
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
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
     * @param Role $role
     *
     * @return JsonResponse
     */
    public function show(Role $role)
    {
        $role->perms;

        return $this->sendResponse($role->toArray(), 'Role retrieved successfully.');
    }

    /**
     * Update the specified Role in storage.
     * PUT/PATCH /roles/{id}
     * @param Role $role
     * @param UpdateRoleAPIRequest $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function update(Role $role, UpdateRoleAPIRequest $request)
    {
        $input = $request->all();

        $role = $this->roleRepository->update($input, $role->id);

        return $this->sendResponse($role->toArray(), 'Role updated successfully.');
    }

    /**
     * Remove the specified Role from storage.
     * DELETE /roles/{id}
     *
     * @param Role $role
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Role $role)
    {
        if (!$role->users->isEmpty()) {
            return $this->sendError(
                'Role is assigned to one or more users.',
                HttpResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $role->delete();

        return $this->sendSuccess('Role deleted successfully.');
    }
}
