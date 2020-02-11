<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Fine
 *
 * @property int $id
 * @property int|null $member_id
 * @property int|null $book_item_id
 * @property float $actual_penalty
 * @property float $collected_penalty
 * @property string $notes
 * @property \Illuminate\Support\Carbon $collected_at
 * @property int|null $collected_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereActualPenalty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereBookItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedPenalty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Penalty extends Model
{
    /**
     * @var string
     */
    public $table = 'penalties';

    /**
     * @var array
     */
    protected $fillable = [
        'member_id',
        'book_item_id',
        'penalty_collect',
        'collected_penalty',
        'notes',
        'collected_at',
        'collected_by',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'member_id'         => 'integer',
        'book_item_id'      => 'integer',
        'penalty_collect'    => 'double',
        'collected_penalty' => 'double',
        'notes'             => 'string',
        'collected_at'      => 'datetime',
        'collected_by'      => 'integer',
    ];
}
