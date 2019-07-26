<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 13-07-2019
 * Time: 03:31 PM
 */
namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\CountryRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class CountryAPIController
 * @package App\Http\Controllers\API\B1
 */
class CountryAPIController extends AppBaseController
{
    /** @var CountryRepository */
    private $countryRepo;

    public function __construct(CountryRepository $countryRepo)
    {
        $this->countryRepo = $countryRepo;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $countries = $this->countryRepo->all(
            $request->except(['skip', 'limit']),
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($countries->toArray(), 'Countries retrieved successfully.');
    }
}