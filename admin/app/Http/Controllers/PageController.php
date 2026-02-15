<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Menu;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with('menu')->latest()->get();
        // dd($pages);
        return view('pages.index', compact('pages'));
    }

    public function create()
    {
        $menus = Menu::where('status', 1)->where('page_type', '>', 0)->get();
        return view('pages.page', compact('menus'));
    }

    public function store(Request $request)
    {
        $request->validate([
            // 'title' => 'required',
            'menu_id' => 'required|nullable|exists:menus,id',
        ]);

        $data = $request->all();


        Page::create($data);

        return redirect()->route('pages.index')->with('success','Page Created Successfully');
    }

    public function edit($id)
    {
        $page = Page::findOrFail($id);
        $menus = Menu::where('status',1)->where('page_type', '>', 0)->get();

        return view('pages.page', compact('page','menus'));
    }

    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);

        $request->validate([
            'menu_id' => 'required|nullable|exists:menus,id',
        ]);

        $data = $request->all();

        $page->update($data);

        return redirect()->route('pages.index')->with('success','Page Updated Successfully');
    }
}
