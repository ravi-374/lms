<?php

namespace App\Repositories\Contracts;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Support\Collection;
/**
 * Interface IssuedBookRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface IssuedBookRepositoryInterface
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
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return IssuedBook[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * @param array $input
     *
     * @return IssuedBook
     */
    public function issueBook($input);

    /**
     * @param array $input
     *
     * @return IssuedBook
     */
    public function reserveBook($input);

    /**
     * @param array $input
     *
     * @return IssuedBook
     */
    public function returnBook($input);

    /**
     * @param array $input
     *
     * @return IssuedBook
     */
    public function updateIssuedBookStatus($input);

    /**
     * @param BookItem $bookItem
     * @param array $input
     *
     * @return IssuedBook
     */
    public function unReserveBook($bookItem, $input);

    /**
     * @param int $id
     * @param array $with
     * @return mixed
     */
    public function findOrFail($id, $with = []);

    /**
     * Update model record for given id
     *
     * @param array $input
     * @param int $id
     *
     * @return IssuedBook|Collection
     */
    public function update($input, $id);
}