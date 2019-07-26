<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;

/**
 * Class CommonAPIController
 * @package App\Http\Controllers\API\B1
 */
class CommonAPIController extends AppBaseController
{
    /**
     * @return array
     */
    public function currencies()
    {
        $collection = collect([
            'INR' => 'Indian Rupee',
            'USD' => 'United States',
            'GBP' => 'United Kingdom',
            'AED' => 'United Arab Emirates',
            'CAD' => 'Canada',
            'CNY' => 'China',
            'RUB' => 'Russia',
        ]);

        $currencies = $collection->map(function ($key , $value) {
           return ['country' => $key, 'iso_code' => $value];
        });

        return $currencies->values();
    }
}