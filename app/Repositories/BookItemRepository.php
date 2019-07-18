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
}