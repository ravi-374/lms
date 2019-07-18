<?php
namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Address;
use App\Models\Member;
use App\Models\MembershipPlan;
use DB;
use Exception;
use Hash;
use Illuminate\Support\Collection;

/**
 * Class MemberRepository
 * @package App\Repositories
 * @version June 24, 2019, 11:57 am UTC
 */
class MemberRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
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
        return Member::class;
    }

    /**
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return Member[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit)->with('address');

        /** @var Member[] $members */
        $members = $query->orderByDesc('id')->get();

        return $members;
    }

    /**
     * @param array $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function store($input)
    {
        MembershipPlan::findOrFail($input['membership_plan_id']);

        return $this->storeMember($input);
    }

    /**
     * @param $input
     * @throws ApiOperationFailedException
     *
     * @return Member
     */
    public function storeMember($input)
    {
        try {
            DB::beginTransaction();
            $input['password'] = Hash::make($input['password']);
            $input['member_id'] = $this->generateMemberId();
            $member = Member::create($input);
            if (!empty($input['image'])) {
                $imagePath = Member::makeImage($input['image'], Member::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (!empty($addressArr)) {
                $address = new Address($addressArr);
                $member->address()->save($address);
            }
            DB::commit();

            return Member::with('address')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param int $id
     * @param array $columns
     *
     * @return Member
     */
    public function find($id, $columns = ['*'])
    {
        $member = $this->findOrFail($id, ['address']);

        return $member;
    }

    /**
     * @param array $input
     * @param int $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function update($input, $id)
    {
        MembershipPlan::findOrFail($input['membership_plan_id']);
        try {
            if (!empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }
            $image = (!empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var Member $member */
            $member = $this->findOrFail($id);
            $member->update($input);

            if (!empty($image)) {
                $member->deleteMemberImage(); // delete old image;
                $imagePath = Member::makeImage($image, Member::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (!empty($addressArr)) {
                $isUpdate = $member->address()->update($addressArr);
                if (!$isUpdate) {
                    $address = new Address($addressArr);
                    $member->address()->save($address);
                }
            }
            DB::commit();

            return Member::with('address')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @return int
     */
    public function generateMemberId()
    {
        //todo: later will change format
        $memberId = rand(10000, 99999);
        while (true) {
            if (!Member::whereMemberId($memberId)->exists()) {
                break;
            }
            $memberId = rand(10000, 99999);
        }

        return $memberId;
    }
}
