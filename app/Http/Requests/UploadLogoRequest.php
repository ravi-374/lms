<?php

namespace App\Http\Requests;

use InfyOm\Generator\Request\APIRequest;

class UploadLogoRequest extends APIRequest
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
     * @return string
     */
    public function rules()
    {
        $rules['logo'] = 'required';

        return $rules;
    }
}
