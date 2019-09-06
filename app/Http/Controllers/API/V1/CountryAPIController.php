<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\CountryRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class CountryAPIController
 * @package App\Http\Controllers\API\V1
 */
class CountryAPIController extends AppBaseController
{
    /**
     * @var CountryRepository
     */
    private $countryRepository;

    public function __construct(CountryRepository $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $search = $request->except(['skip', 'limit']);

        $countries = $this->countryRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($countries, 'Countries retrieve successfully.');
    }
}