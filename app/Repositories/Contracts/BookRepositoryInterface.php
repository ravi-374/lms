<?php

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Book;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

/**
 * Interface BookRepositoryInterface
 */
interface BookRepositoryInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Book[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param  string  $isbn
     *
     * @throws ApiOperationFailedException
     *
     * @return array
     */
    public function getBookDetailsFromISBN($isbn);

    /**
     * @param  Book  $book
     * @param  array  $bookItems
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return bool
     */
    public function createOrUpdateBookItems($book, $bookItems);

    /**
     * @param  Book  $book
     * @param  array  $items
     * @throws Exception
     *
     * @return Book
     */
    public function addBookItems($book, $items);

    /**
     * @param  array  $input
     * @param  int  $id
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse|mixed
     */
    public function update($input, $id);

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return mixed
     */
    public function store($input);

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return int
     */
    public function booksCount($today, $startDate = null, $endDate = null);
}