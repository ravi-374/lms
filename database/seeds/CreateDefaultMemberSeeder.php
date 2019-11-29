<?php

use App\Models\Member;
use App\Models\MembershipPlan;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CreateDefaultMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plan = MembershipPlan::whereName('Silver')->first();

        $input = [
            'member_id'          => uniqid(),
            'first_name'         => 'LMS',
            'last_name'          => 'Member',
            'email'              => 'member@lms.com',
            'password'           => Hash::make('lms@12345'),
            'email_verified_at'  => Carbon::now(),
            'is_active'          => true,
            'membership_plan_id' => $plan->id,
        ];

        /** @var Member $member */
        $member = Member::create($input);
    }
}
