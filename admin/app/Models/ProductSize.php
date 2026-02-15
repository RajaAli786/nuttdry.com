<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'price',
        'old_price',
        'stock',
        'status',
        'is_primary',
    ];

    // RELATIONSHIP: Size belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
