<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupons';

    protected $fillable = [
        'code',
        'type',     // flat | percent
        'value',    // 50 | 10 etc
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
