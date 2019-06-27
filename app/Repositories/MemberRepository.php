<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Member;
use App\Models\MembershipPlan;
use DB;
use Exception;
use Hash;

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
        'password',
        'membership_plan_id',
        'phone',
        'address1',
        'address2',
        'city',
        'state',
        'country',
        'zip'
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
     * @param array $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function store($input)
    {
        MembershipPlan::findOrFail($input['membership_plan_id']);

        $input['password'] = Hash::make($input['password']);

        if (!empty($input['member_id'])) {
            $member = Member::whereMemberId($input['member_id'])->first();
            if (!empty($member)) {
                throw new Exception('Member with same id already exist.');
            }
        } else {
            $input['membership_plan_id'] = $this->generateMemberId();
        }

        $member = Member::create($input);
        if (!empty($input['image'])) {
            $imagePath = Member::makeImage($input['image'], Member::IMAGE_PATH);
            $member->update(['image' => $imagePath]);
        }

        return $member;
    }
    /**
     * @param array $input
     * @param int $id
     *
     * @throws ApiOperationFailedException
     *
     * @return Member
     *
     */
    public function update($input, $id)
    {
        MembershipPlan::findOrFail($input['membership_plan_id']);

        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        }
        $image = (!empty($input['image'])) ? $input['image'] : null;
        unset($input['image']);
        unset($input['member_id']);

        /** @var Member $member */
        $member = $this->findOrFail($id);
        $member->update($input);

        if (!empty($image)) {
            $member->deleteMemberImage(); // delete old image;
            $imagePath = Member::makeImage($image, Member::IMAGE_PATH);
            $member->update(['image' => $imagePath]);
        }

        return $member;
    }


    /**
     * @return string
     */
    public function generateMemberId()
    {
        return rand(10000, 99999);
    }
}
