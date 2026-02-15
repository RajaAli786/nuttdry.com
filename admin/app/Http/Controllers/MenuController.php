<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::whereNull('parent_id')
            ->with('children')
            ->orderBy('sort_order')
            ->get();

        return view('menu.index', compact('menus'));
    }

    // Form
    public function create()
    {
        $mainMenus = Menu::whereNull('parent_id')->get(); // For dropdown selection
        return view('menu.create', compact('mainMenus'));
    }

    // Store menu
    public function store(Request $request)
    {
        
        $request->validate([
            'title' => 'required',
            'slug' => 'nullable',
            'parent_id' => 'nullable|exists:menus,id',
            'sort_order' => 'nullable|integer',
        ]);

        Menu::create([
            'title' => $request->title,
            'slug' => $request->slug ?? strtolower(str_replace(' ', '-', $request->title)), 
            'parent_id' => $request->parent_id,
            'sort_order' => $request->sort_order ?? 0,
            'status' => 1,
            'type' => $request->type ?? 0,
            'page_type' => $request->page_type ?? 0,
            'page_title' => $request->page_title ?? 0,
            'meta_keyword' => $request->meta_keyword ?? 0,
            'meta_description' => $request->meta_description ?? 0,
        ]);

        return redirect()->route('menu.index')->with('success', 'Menu created successfully!');
    }

    public function edit($id)
    {
        $menu = Menu::findOrFail($id);

        $mainMenus = Menu::whereNull('parent_id')
            ->where('id', '!=', $id) // stop selecting itself
            ->get();

        return view('menu.edit', compact('menu', 'mainMenus'));
    }

    // 2. Update Menu
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        // dd($request->all());
        $request->validate([
            'title' => 'required',
            'slug' => 'nullable',
            'parent_id' => 'nullable|exists:menus,id',
            'sort_order' => 'nullable|integer',
        ]);

        $menu->update([
            'title' => $request->title,
            'slug' => $request->slug ?? strtolower(str_replace(' ', '-', $request->title)), 
            'parent_id' => $request->parent_id,
            'sort_order' => $request->sort_order ?? 0,
            'type' => $request->type ?? 0,
            'page_type' => $request->page_type ?? 0,
            'page_title' => $request->page_title ?? 0,
            'meta_keyword' => $request->meta_keyword ?? 0,
            'meta_description' => $request->meta_description ?? 0,
        ]);

        return redirect()->route('menu.index')->with('success', 'Menu updated successfully!');
    }

    // 3. Delete Menu
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->route('menu.index')->with('success', 'Menu deleted successfully!');
    }
}
