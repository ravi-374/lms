<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateUserAPIRequest;
use App\Http\Requests\API\UpdateUserAPIRequest;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Http\Request;

/**
 * Class UserController
 * @package App\Http\Controllers\API
 */

class UserAPIController extends AppBaseController
{
    /** @var  UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepository = $userRepo;
    }

    /**
     * Display a listing of the User.
     * GET|HEAD /users
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $users = $this->userRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($users->toArray(), 'Users retrieved successfully.');
    }

    /**
     * Store a newly created User in storage.
     * POST /users
     * @param CreateUserAPIRequest $request
     *
     * @throws \App\Exceptions\ApiOperationFailedException
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateUserAPIRequest $request)
    {
        $input = $request->all();

        $user = $this->userRepository->store($input);

        return $this->sendResponse($user->toArray(), 'User saved successfully.');
    }

    /**
     * Display the specified User.
     * GET|HEAD /users/{id}
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        /** @var User $user */
        $user = $this->userRepository->find($id);

        return $this->sendResponse($user->toArray(), 'User retrieved successfully.');
    }

    /**
     * Update the specified User in storage.
     * PUT/PATCH /users/{id}
     * @param int $id
     * @param UpdateUserAPIRequest $request
     *
     * @throws \App\Exceptions\ApiOperationFailedException
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, UpdateUserAPIRequest $request)
    {
        $input = $request->all();

        $user = $this->userRepository->update($input, $id);

        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }

    /**
     * Remove the specified User from storage.
     * DELETE /users/{id}
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        /** @var User $user */
        $user = $this->userRepository->findOrFail($id);

        $user->deleteUserImage();
        $user->delete();

        return $this->sendResponse($id, 'User deleted successfully.');
    }
}
