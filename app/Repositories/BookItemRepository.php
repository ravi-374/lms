<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 01-07-2019
 * Time: 11:57 AM
 */

namespace App\Repositories;

use App\Models\BookItem;
class BookItemRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'edition',
        'format',
        'is_available',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return BookItem::class;
    }
}