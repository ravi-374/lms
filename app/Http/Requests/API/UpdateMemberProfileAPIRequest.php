<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 25-07-2019
 * Time: 03:23 PM.
 */

namespace App\Http\Requests\API;


use App\Models\Member;
use Auth;
use InfyOm\Generator\Request\APIRequest;
/**
 * Class UpdateMemberProfile
 * @package App\Http\Requests\API
 */
class UpdateMemberProfileAPIRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $loggedInMemberId = Auth::user()->id;

        $rules = Member::$rules;
        $rules['email'] = 'required|unique:members,email,'.$loggedInMemberId;

        return $rules;
    }
}