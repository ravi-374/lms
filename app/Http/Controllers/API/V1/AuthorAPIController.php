<?php
namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\AuthorRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class AuthorAPIController
 * @package App\Http\Controllers\API
 */
class AuthorAPIController extends AppBaseController
{
    /** @var  AuthorRepository */
    private $authorRepository;

    public function __construct(AuthorRepository $authorRepo)
    {
        $this->authorRepository = $authorRepo;
    }

    /**
     * Display a listing of the Author.
     * GET|HEAD /authors
     *
     * @param Request $request
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
