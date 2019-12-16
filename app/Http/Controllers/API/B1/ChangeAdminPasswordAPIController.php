<?php


namespace App\Http\Controllers\API\B1;


use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ChangeAdminPasswordRequest;
use Auth;
use Illuminate\Support\Facades\Hash;

class ChangeAdminPasswordAPIController extends AppBaseController
{
        public function changePassword(ChangeAdminPasswordRequest $request)
        {
            $input=$request->all();
            $user=Auth::user();

            if(!Hash::check($input['current_password'],$user->password)){
                return $this->sendError("Password Changing Failed");
            }

            $user->password=Hash::make($input['password']);
            $user->save();

            return $this->sendSuccess("Password Changed Successfully");

        }
}