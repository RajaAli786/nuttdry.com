<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';

    // Fillable fields (for mass assignment)
    protected $fillable = [
        'order_id',           // ID of the related order
        'user_id',            // User who made the payment
        'payment_id',         // Razorpay payment ID
        'order_amount',       // Amount paid
        'coupon_code',        // Optional applied coupon
        'coupon_discount',    // Discount applied via coupon
        'status',             // Payment status: success/failure
        'payment_method',     // Razorpay, COD, etc.
    ];
}
