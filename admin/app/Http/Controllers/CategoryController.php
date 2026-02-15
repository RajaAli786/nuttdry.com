<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return view('categories.index', compact('categories'));
    }

    public function add()
    {
        return view('categories.add');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->description = $request->description;
        $category->is_home = $request->is_home ?? 0;

        if ($request->hasFile('image')) {

            $image = $request->file('image');
        
            $filename = 'product_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/categories';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
        
            $data->image = 'categories/' . $filename;
        }

        $category->save();

        return redirect()->route('categories.index')
            ->with('success', 'Category added successfully!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id,
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->description = $request->description;

        if ($request->hasFile('image')) {

            $image = $request->file('image');
        
            $filename = 'categories_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        
            $path = config('uploads.path') . '/categories';
        
            if (!is_dir($path)) {
                mkdir($path, 0755, true);
            }
        
            $image->move($path, $filename);
            // dd($filename);
        
            $category->image = 'categories/' . $filename;
        }

        
        // dd($category->isDirty());
        $category->save(); 
        
        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully!');
    }


    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // delete image
        if ($category->image && file_exists(public_path($category->image))) {
            unlink(public_path($category->image));
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully!');
    }
}
