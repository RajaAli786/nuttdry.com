<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\ProductReview;


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
        'rating',
        'tax',
        'tax_title',
        'tags',
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

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class, 'product_id', 'id')
                    ->where('is_primary', 1);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }
    public function primarySize()
    {
        return $this->hasOne(ProductSize::class, 'product_id', 'id')
                    ->where('is_primary', 1);
    }
    
    public function reviews()
    {
        return $this->hasMany(ProductReview::class)
                    ->where('is_approved', 1);
    }
    
    public function averageRating()
    {
        return $this->reviews()->avg('rating');
    }
    
}
