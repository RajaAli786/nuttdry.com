<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function show($id)
    {
        $page = Page::with('menu')->where('menu_id',$id)
            ->where('status',1)
            ->first();

        if(!$page){
            return response()->json([
                'status' => false,
                'message' => 'Page not found'
            ],404);
        }

        return response()->json([
            'status' => true,
            'data' => [
                'id' => $page->id, 
                'content' => $page->content,
                'menu' => $page->menu ? [ 'id' => $page->menu->id, 'name' => $page->menu->title, 'slug' => $page->menu->slug, ] : null,
                'page_title' => $page->page_title, 
                'meta_title' => $page->meta_title, 
                'meta_description' => $page->meta_description,
            ]
        ]);
    }
}
