<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class AuthorAPIController
 */
class AuthorAPIController extends AppBaseController
{
    /** @var  AuthorRepositoryInterface */
    private $authorRepository;

    public function __construct(AuthorRepositoryInterface $authorRepo)
    {
        $this->authorRepository = $authorRepo;
    }

    /**
     * Display a listing of the Author.
     * GET|HEAD /authors
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $authors = $this->authorRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($authors->toArray(), 'Authors retrieved successfully.');
    }
}
