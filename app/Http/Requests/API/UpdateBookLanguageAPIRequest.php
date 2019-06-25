<?php

namespace App\Http\Requests\API;

use App\Models\BookLanguage;
use InfyOm\Generator\Request\APIRequest;

class UpdateBookLanguageAPIRequest extends APIRequest
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
        $rules['language_name'] = 'required|unique:book_languages,language_name,'.$this->route('book_language');

        return $rules;
    }
}
