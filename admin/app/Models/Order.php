<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'product_discount',
        'coupon_discount',
        'grand_total',
        'coupon_code',
        'status',
        'payment_status',
        'payment_method',
        'billing_name',
        'billing_email',
        'billing_phone',
        'billing_address',
        'shipping',
        'tax_amount',
        'payment_id',
        'payment_response'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
