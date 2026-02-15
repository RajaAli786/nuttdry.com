<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'icon',
        'sort_order',
        'status',
        'type',
        'page_type',
        'page_title',
        'meta_keyword',
        'meta_description',
    ];

    // Relationship: Parent menu
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    // Relationship: Children menu
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('sort_order');
    }
}
