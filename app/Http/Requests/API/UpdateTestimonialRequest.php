<?php

namespace App\Http\Requests\API;

use App\Models\Testimonial;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateTestimonialRequest
 */
class UpdateTestimonialRequest extends APIRequest
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
        $updateRules=Testimonial::$rules;
        $updateRules['name'] = 'required|unique:testimonials,name,'.$this->route('testimonial')->id;

        return $updateRules;
    }
}
