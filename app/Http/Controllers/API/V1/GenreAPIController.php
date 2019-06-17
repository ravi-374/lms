<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateGenreAPIRequest;
use App\Http\Requests\API\UpdateGenreAPIRequest;
use App\Models\Genre;
use App\Repositories\GenreRepository;
use Illuminate\Http\Request;
use Response;

/**
 * Class GenreController
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
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        $genres = $this->genreRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($genres->toArray(), 'Genres retrieved successfully');
    }

    /**
     * Store a newly created Genre in storage.
     * POST /genres
     *
     * @param  CreateGenreAPIRequest  $request
     *
     * @return Response
     */
    public function store(CreateGenreAPIRequest $request)
    {
        $input = $request->all();

        $genre = $this->genreRepository->create($input);

        return $this->sendResponse($genre->toArray(), 'Genre saved successfully');
    }

    /**
     * Display the specified Genre.
     * GET|HEAD /genres/{id}
     *
     * @param  int  $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Genre $genre */
        $genre = $this->genreRepository->findOrFail($id);

        return $this->sendResponse($genre->toArray(), 'Genre retrieved successfully');
    }

    /**
     * Update the specified Genre in storage.
     * PUT/PATCH /genres/{id}
     *
     * @param  int  $id
     * @param  UpdateGenreAPIRequest  $request
     *
     * @return Response
     */
    public function update($id, UpdateGenreAPIRequest $request)
    {
        $input = $request->all();

        $this->genreRepository->findOrFail($id);

        $genre = $this->genreRepository->update($input, $id);

        return $this->sendResponse($genre->toArray(), 'Genre updated successfully');
    }

    /**
     * Remove the specified Genre from storage.
     * DELETE /genres/{id}
     *
     * @param  int  $id
     *
     * @return Response
     * @throws \Exception
     *
     */
    public function destroy($id)
    {
        /** @var Genre $genre */
        $genre = $this->genreRepository->findOrFail($id);

        $genre->delete();

        return $this->sendResponse($id, 'Genre deleted successfully');
    }
}
