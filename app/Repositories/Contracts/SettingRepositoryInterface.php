<?php


namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Setting;
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