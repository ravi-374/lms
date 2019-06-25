<?php

namespace App\Repositories;

use App\Models\BookSeries;
use App\Models\SeriesBook;


/**
 * Class BookSeriesRepository
 * @package App\Repositories
 * @version June 25, 2019, 10:36 am UTC
*/

class BookSeriesRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title'
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
        return BookSeries::class;
    }

    /**
     * @param array $input
     *
     * @return void
     */
    public function addSeriesBook($input)
    {
        return SeriesBook::create($input);
    }
}
