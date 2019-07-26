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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class BookItemRepository
 * @package App\Repositories
 */
class BookItemRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'edition',
        'format',
        'is_available',
        'book_id',
        'book_code',
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

    /**
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     * @param array $columns
     *
     * @return BookItem|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit);

        $query->when(isset($search['for_member']), function (Builder $query) use ($search) {
            $query->orwhereHas('issuedBooks', function (Builder $query) use ($search) {
                $query->reserve()->ofMember($search['member_id']);
            });
        });

        return $query->get();
    }

    /**
     * @param array $search
     * @param int|null $skip
     * @param int|null $limit
     *
     * @return BookItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null)
    {
        $query = $this->allQuery($search, $skip, $limit)->with(['book.authors', 'lastIssuedBook', 'publisher', 'language']);
        $query = $this->applyDynamicSearch($search, $query);

        $query->orderByDesc('is_available');

        $records = $query->get();
        $records = $this->sortByReturnDueDate($records);

        return $records;
    }

    /**
     * @param BookItem[]|Collection $records
     *
     * @return BookItem[]
     */
    public function sortByReturnDueDate($records)
    {
        $available = collect($records->where('is_available' , 1));
        $notAvailable = collect($records->where('is_available' , 0))
            ->sortBy('lastIssuedBook.return_due_date');

        $records = $available->merge($notAvailable);

        return $records;
    }

    /**
     * @param array $search
     * @param Builder $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['name']), function (Builder $query) use($search) {
            $query->whereHas('book', function (Builder $query)  use ($search) {
                $searchString = ['%'.$search['name'].'%'];

                // search by book name
                if (!empty($search['search_by_book'])) {
                    $query->whereRaw('name LIKE ? ', $searchString);
                }

                // search by book authors
                if (!empty($search['search_by_author'])) {
                    $query->whereHas('authors', function (Builder $query) use ($search, $searchString) {
                        $query->whereRaw('first_name LIKE ? ', $searchString);
                        $query->orWhereRaw('last_name LIKE ? ', $searchString);
                    });
                }
            });
        });

        return $query;
    }
}