<?php


namespace App\Http\Controllers\API\V1;


use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ChangeMemberPasswordRequest;
use Auth;
use Hash;

class ChangeMemberPasswordAPIController extends AppBaseController
{
    public function changePassword(ChangeMemberPasswordRequest $request)
    {
        $input=$request->all();
        $user=Auth::user();

        if(!Hash::check($input['current_password'],$user->password)){
            return $this->sendError("Password Changing Failed");
        }

        $user->password=Hash::make($input['password']);
        $user->save();

        return $this->sendSuccess("password Changed Successfully");

    }
}