<?php

namespace App\Repositories;

use App\Models\MembershipPlan;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class MembershipPlanRepository
 * @package App\Repositories
 * @version June 24, 2019, 10:42 am UTC
*/

class MembershipPlanRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'frequency',
        'stripe_plan_id'
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
        return MembershipPlan::class;
    }

    /**
     * @param int $id
     * @param array $columns
     *
     * @return MembershipPlan
     */
    public function find($id, $columns = ['*'])
    {
        return $this->findOrFail($id);
    }

    /**
     * @param array $input
     *
     * @return MembershipPlan
     */
    public function store($input)
    {
        $this->validateMembershipPlan($input);

        $membershipPlan = MembershipPlan::create($input);

        return $membershipPlan;
    }

    /**
     * @param array $input
     * @param int $id
     *
     * @return MembershipPlan
     */
    public function update($input, $id)
    {
        $this->validateMembershipPlan($input);

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->findOrFail($id);
        $membershipPlan->update($input);

        return $membershipPlan;
    }

    /**
     * @param array $input
     *
     * @return bool
     */
    public function validateMembershipPlan($input)
    {
        if (!in_array($input['frequency'], [MembershipPlan::MONTHLY_FREQUENCY, MembershipPlan::YEARLY_FREQUENCY])) {
            throw new UnprocessableEntityHttpException('invalid frequency.');
        }

        return true;
    }
}
