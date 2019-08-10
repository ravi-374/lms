<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateGenreAPIRequest;
use App\Http\Requests\API\UpdateGenreAPIRequest;
use App\Models\Genre;
use App\Repositories\GenreRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class GenreAPIController
 * @package App\Http\Controllers\API
 */
class GenreAPIController extends AppBaseController
{
    /** @var  GenreRepository */
    private $genreRepository;

    public function __construct(GenreRepository $genreRepo)
    {
        $this->genreRepository = $genreRepo;
    }

    /**
     * Display a listing of the Genre.
     * GET|HEAD /genres
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $genres = $this->genreRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $genres->toArray(),
            'Genres retrieved successfully.',
            $this->getTotalRecords(Genre::class, $input, $genres)
        );
    }

    /**
     * Store a newly created Genre in storage.
     * POST /genres
     *
     * @param CreateGenreAPIRequest $request
     *
     * @return JsonResponse
     */
    public function store(CreateGenreAPIRequest $request)
    {
        $input = $request->all();

        $genre = $this->genreRepository->create($input);

        return $this->sendResponse($genre->toArray(), 'Genre saved successfully.');
    }

    /**
     * Display the specified Genre.
     * GET|HEAD /genres/{id}
     *
     * @param Genre $genre
     *
     * @return JsonResponse
     */
    public function show(Genre $genre)
    {
        return $this->sendResponse($genre->toArray(), 'Genre retrieved successfully.');
    }

    /**
     * Update the specified Genre in storage.
     * PUT/PATCH /genres/{genre}
     *
     * @param Genre $genre
     * @param UpdateGenreAPIRequest $request
     *
     * @return JsonResponse
     */
    public function update(Genre $genre, UpdateGenreAPIRequest $request)
    {
        $input = $request->all();

        $genre = $this->genreRepository->update($input, $genre->id);

        return $this->sendResponse($genre->toArray(), 'Genre updated successfully.');
    }

    /**
     * Remove the specified Genre from storage.
     * DELETE /genres/{genre}
     *
     * @param Genre $genre
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Genre $genre)
    {
        if (!empty($genre->books->toArray())) {
            throw new BadRequestHttpException('Genre can not be delete, it is used in one or more books.');
        }
        $genre->delete();

        return $this->sendResponse($genre, 'Genre deleted successfully.');
    }
}
