<?php

namespace App\Http\Requests\API;

use App\Models\Publisher;
use InfyOm\Generator\Request\APIRequest;

class UpdatePublisherAPIRequest extends APIRequest
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
        $rules['name'] = 'required|unique:publishers,name,'.$this->route('publisher');

        return $rules;
    }
}
