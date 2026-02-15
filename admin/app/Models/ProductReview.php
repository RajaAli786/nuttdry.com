<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'product_id',
        'name',
        'email',
        'phone',
        'rating',
        'comment',
        'is_approved'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    
}
