<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Address;
use App\User;
use DB;
use Exception;
use Hash;

/**
 * Class UserRepository
 * @package App\Repositories
 * @version June 20, 2019, 7:52 am UTC
*/

class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email'
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
        return User::class;
    }

    /**
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return User[]|
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit)->with('roles','address');

        /** @var User[] $users */
        $users = $query->orderByDesc('id')->get();

        return $users;
    }

    /**
     * @param int $id
     * @param array $columns
     *
     * @return User
     */
    public function find($id, $columns = ['*'])
    {
        $user = $this->findOrFail($id, ['roles','address']);

        return $user;
    }

    /**
     * @param array $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return User|\Illuminate\Database\Eloquent\Model
     */
    public function store($input)
    {
        try {
            DB::beginTransaction();

            $input['password'] = Hash::make($input['password']);
            $user = User::create($input);
            if (!empty($input['roles'])) {
                $user->roles()->sync($input['roles']);
            }

            $address = new Address($input['address']);
            $user->address()->save($address);

            if (!empty($input['image'])) {
                $imagePath = User::makeImage($input['image' ], User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }
            DB::commit();

            return User::with('address')->findOrFail($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param array $input
     * @param int $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return User
     */
    public function update($input, $id)
    {
        try {
            DB::beginTransaction();

            if (!empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }

            $image = (!empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var User $user */
            $user = $this->findOrFail($id);
            $user->update($input);

            if (!empty($image)) {
                $user->deleteUserImage(); // delete old image;
                $imagePath = User::makeImage($image, User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }

            if (!empty($input['roles'])) {
                $user->roles()->sync($input['roles']);
            }

            if (!empty($input['address'])) {
                $address = new Address($input['address']);
                $user->address()->save($address);
            }

            DB::commit();

            return User::with('address')->findOrFail($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }
}
