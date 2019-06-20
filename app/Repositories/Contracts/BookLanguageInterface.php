<?php

namespace App\Repositories\Contracts;

interface BookLanguageInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();
}