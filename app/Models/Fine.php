<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Fine
 */
class Fine extends Model
{
    public $table = 'fines';

    protected $fillable = [
        'member_id',
        'book_item_id',
        'fine',
        'notes',
        'collected_at',
        'collected_by',
    ];

    protected $casts = [
        'member_id'    => 'integer',
        'book_item_id' => 'integer',
        'fine'         => 'double',
        'notes'        => 'string',
        'collected_at' => 'datetime',
        'collected_by' => 'integer',
    ];
}
