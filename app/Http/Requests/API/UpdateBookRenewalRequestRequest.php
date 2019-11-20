<?php

namespace App\Http\Requests\API;

use App\Models\BookRenewalRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRenewalRequestRequest extends FormRequest
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
        $rules = BookRenewalRequest::$rules;

        return $rules;
    }
}
