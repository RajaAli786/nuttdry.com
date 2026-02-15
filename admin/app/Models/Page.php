<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $table = 'pages';

    protected $fillable = [
        'menu_id',
        'content',
        'status'
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
