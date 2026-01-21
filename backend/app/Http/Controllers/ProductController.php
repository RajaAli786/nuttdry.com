<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        $categories = Category::all();
        $menus = Menu::all();
        return view('products.create', compact('categories', 'menus'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'sku' => 'required|unique:products,sku',
            'price' => 'required|numeric',
        ]);

        // $data = $request->all();
        $data = $request->except('_token', 'image');

        $data['slug'] = Str::slug($request->name) . '-' . uniqid();
        $data['meta_title'] = $request->meta_title ?? $request->name;
        $data['meta_keyword'] = $request->meta_keyword ?? '';
        $data['meta_description'] = $request->meta_description ?? '';
        $data['discount'] = $request->discount ?? 0;
        $data['coupon_discount'] = $request->coupon_discount ?? 0;
        // $data['is_featured'] = $request->is_featured ?? 0;
        // $data['is_top'] = $request->is_top ?? 0;
        // $data['status'] = $request->status ?? 1;

        // Image upload
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path; 
        }

        Product::create($data);

        return redirect()->route('product.index')->with('success', 'Product added successfully');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        $menus = Menu::all();
        // dd($menus);
        return view('products.edit', compact('product', 'categories', 'menus'));
    }

    public function update(Request $request, $id)
    {
        // dd($request->all());
        $product = Product::findOrFail($id);

        $request->validate([
            'name'  => 'required',
            'sku'   => 'required|unique:products,sku,' . $id,
            'price' => 'required|numeric',
            'image' => 'nullable|image',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->name);

        // Image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = 'storage/' . $path; 
        }

        $product->update($data);

        return redirect()->route('product.index')
            ->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete image from folder
        if ($product->image && File::exists(public_path('products/'.$product->image))) {
            File::delete(public_path('products/'.$product->image));
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully');
    }
}
