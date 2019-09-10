<?php


namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
/**
 * Interface SettingRepositoryInterface
 * @package App\Repositories\Contracts
 */
interface SettingRepositoryInterface
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
     * Retrieve all records with given filter criteria
     *
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * Update model record for given id
     *
     * @param array $input
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|Model
     */
    public function update($input, $id);

    /**
     * @param array $input
     *
     * @return array
     */
    public function createOrUpdate($input);

    /**
     * @param UploadedFile $image
     *
     * @throws ApiOperationFailedException
     *
     * @return Setting|null
     */
    public function uploadLogo($image);
}