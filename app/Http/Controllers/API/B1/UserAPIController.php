<?php

namespace App\Http\Controllers\API\B1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateUserAPIRequest;
use App\Http\Requests\API\UpdateUserAPIRequest;
use App\Http\Requests\API\UpdateUserProfileAPIRequest;
use App\Repositories\UserRepository;
use App\User;
use Exception;
use Illuminate\Http\JsonResponse;
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
     *
     * @return JsonResponse
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
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
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
     * @param User $user
     *
     * @return JsonResponse
     */
    public function show(User $user)
    {
        $user->roles;
        $user->address;

        return $this->sendResponse($user->toArray(), 'User retrieved successfully.');
    }

    /**
     * Update the specified User in storage.
     * PUT/PATCH /users/{id}
     * @param User $user
     * @param UpdateUserAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function update(User $user, UpdateUserAPIRequest $request)
    {
        $input = $request->all();
        $user = $this->userRepository->update($input, $user->id);

        return $this->sendResponse($user->toArray(), 'User updated successfully.');
    }

    /**
     * Remove the specified User from storage.
     * DELETE /users/{id}
     *
     * @param User $user
     *
     * @return JsonResponse
     */
    public function destroy(User $user)
    {
        $user->deleteUserImage();
        $user->delete();

        return $this->sendResponse($user, 'User deleted successfully.');
    }

    /**
     * @param User $user
     *
     * @return JsonResponse
     */
    public function removeImage(User $user)
    {
        $user->deleteUserImage();

        return $this->sendSuccess('User image removed successfully.');
    }

    /**
     * @param User $user
     *
     * @return JsonResponse
     */
    public function updateStatus(User $user)
    {
        $user->is_active = ($user->is_active) ? 0 : 1;
        $user->save();
        $message = "User has been ".(($user->is_active) ? 'activated' : 'deactivated')." successfully.";

        return $this->sendSuccess($message);
    }

    /**
     * @return JsonResponse
     */
    public function getLoggedInUserDetails()
    {
        /** @var User $loginUser */
        $loginUser = \Auth::user();
        $loginUser->address;
        $loginUser->roles;

        return $this->sendResponse($loginUser, 'User details retrieved successfully.');
    }

    /**
     * @param UpdateUserProfileAPIRequest $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return JsonResponse
     */
    public function updateUserProfile(UpdateUserProfileAPIRequest $request)
    {
        $input = $request->all();

        $userId = \Auth::user()->id;

        $user = $this->userRepository->update($input, $userId);

        return $this->sendResponse($user->toArray(), 'User profile updated successfully.');
    }
}
