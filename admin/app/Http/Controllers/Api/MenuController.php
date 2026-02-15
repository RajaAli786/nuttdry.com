<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // GET ALL MENUS
    public function index()
    {
        $menus = Menu::where('status', 1)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $menus,
        ], 200, [
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0'
        ]);
    }

    // GET SINGLE MENU
    public function show($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json(['status' => false, 'message' => 'Menu not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $menu], 200, [
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0'
        ]);
    }

    // public function footerMenus()
    // {
    //     return response()->json([
    //         'status' => true,
    //         'data' => Menu::where('type', true, 'status', true)->orderBy('parent_id','desc','sort_order', 'desc')->get()
    //     ], 200, [
    //         'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0'
    //     ]);
    // }



    
}
