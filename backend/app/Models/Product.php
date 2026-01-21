<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'sku',
        'price',
        'old_price',
        'image',
        'category_id',
        'menu_id',
        'is_featured',
        'is_top',
        'discount',
        'coupon_code',
        'coupon_discount',
        'status',
        'meta_title',
        'meta_keyword',
        'meta_description',
    ];

    // Relations
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
