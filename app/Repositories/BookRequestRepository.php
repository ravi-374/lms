<?php

namespace App\Repositories;

use App\Models\BookItem;
use App\Models\BookRequest;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRequestRepository
 */
class BookRequestRepository extends BaseRepository implements BookRequestRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'book_name',
        'isbn',
        'edition',
        'format',
        'member_id',
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
        return BookRequest::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return BookRequest[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $search['order_by'] = (isset($search['order_by'])) ? $search['order_by'] : 'created_at';
        $search['direction'] = (isset($search['direction'])) ? $search['direction'] : 'desc';

        if ($search['order_by'] == 'request_count') {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit);
        $records = $query->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = 'request_count';

            $records = $records->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        $records = $records->groupBy('isbn')->map(function ($records) {
            return $records[0];
        });

        return $records->values();
    }

    /**
     * @param  array  $input
     *
     * @return BookRequest|Collection
     */
    public function store($input)
    {
        $this->validate($input);

        $bookRequest = BookRequest::create($input);

        return $bookRequest;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return BookRequest|Collection
     */
    public function update($input, $id)
    {
        $this->validate($input);

        $bookRequest = BookRequest::findOrFail($id);
        $bookRequest->update($input);

        return $bookRequest->fresh();
    }

    /**
     * @param  array  $input
     *
     * @return bool
     */
    public function validate($input)
    {
        if (! in_array($input['format'], [BookItem::FORMAT_HARDCOVER, BookItem::FORMAT_PAPERBACK])) {
            throw new UnprocessableEntityHttpException('Invalid format.');
        }

        return true;
    }
}
