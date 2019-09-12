<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Address;
use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterface;
use DB;
use Exception;
use Hash;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class MemberRepository
 */
class MemberRepository extends BaseRepository implements MemberRepositoryInterface
{
    /** @var MembershipPlanRepository */
    private $membershipPlanRepo;

    public function __construct(Application $app, MembershipPlanRepository $membershipRepo)
    {
        parent::__construct($app);
        $this->membershipPlanRepo = $membershipRepo;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
        'phone',
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
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Member[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && ($search['order_by'] == 'membership_plan_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with('address', 'membershipPlan');
        $query = $this->applyDynamicSearch($search, $query);
        $members = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'membership_plan_name') {
                $orderString = 'membershipPlan.name';
            }

            $members = $members->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $members->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $query->orWhereHas('membershipPlan', function (Builder $query) use ($search) {
                filterByColumns($query, $search['search'], ['name']);
            });
        });

        return $query;
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function store($input)
    {
        $this->membershipPlanRepo->findOrFail($input['membership_plan_id']);

        return $this->storeMember($input);
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
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
            if (! empty($input['image'])) {
                $imagePath = Member::makeImage($input['image'], Member::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (! empty($addressArr)) {
                $address = new Address($addressArr);
                $member->address()->save($address);
            }
            DB::commit();

            return Member::with('address', 'membershipPlan')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return Member
     */
    public function find($id, $columns = ['*'])
    {
        $member = $this->findOrFail($id, ['address', 'membershipPlan']);

        return $member;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function update($input, $id)
    {
        try {
            DB::beginTransaction();
            if (! empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }
            $image = (! empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var Member $member */
            $member = $this->findOrFail($id);
            $member->update($input);

            if (! empty($image)) {
                $member->deleteMemberImage(); // delete old image;
                $imagePath = Member::makeImage($image, Member::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            if (! empty($input['remove_image'])) {
                $member->deleteMemberImage();
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (! empty($addressArr)) {
                $isUpdate = $member->address()->update($addressArr);
                if (! $isUpdate) {
                    $address = new Address($addressArr);
                    $member->address()->save($address);
                }
            }
            DB::commit();

            return Member::with('address', 'membershipPlan')->findOrFail($member->id);
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
            if (! Member::whereMemberId($memberId)->exists()) {
                break;
            }
            $memberId = rand(10000, 99999);
        }

        return $memberId;
    }
}
