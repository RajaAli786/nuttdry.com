<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('images')->latest()->get();
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
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|unique:products,sku|max:255',
            'price' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'sizes.*' => 'required|string|max:50', // optional
            'prices.*' => 'required|numeric|min:0',
            'old_prices.*' => 'nullable|numeric|min:0',
            'stock.*' => 'required|in:0,1',
        ]);

        $data = $request->except('_token', 'images');
        
        $data['slug'] = Str::slug($request->name) . '-' . uniqid();
        $data['meta_title'] = $request->meta_title ?? $request->name;
        $data['meta_keyword'] = $request->meta_keyword ?? '';
        $data['meta_description'] = $request->meta_description ?? '';
        $data['discount'] = $request->discount ?? 0;
        $data['coupon_discount'] = $request->coupon_discount ?? 0;
        $data['tags'] = $request->tags ?? 0;
        $data['rating'] = $request->rating ?? 0;
        $data['tax'] = $request->tax ?? 0;
        $data['tax_title'] = $request->tax_title ?? '';

        $product = Product::create($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $key => $img) {

                $filename = 'product_' . time() . '_' . uniqid() . '.' . $img->getClientOriginalExtension();
                $path = config('uploads.path') . '/products';

                if (!is_dir($path)) {
                    mkdir($path, 0755, true);
                }

                $img->move($path, $filename);

                $isPrimary = 0;
                if ($request->filled('primary_image')) {
                    $primaryIndex = (int) $request->primary_image;
                    if ($primaryIndex === $key) {
                        $isPrimary = 1;
                    }
                } elseif ($key == 0) {
                    // fallback if no radio selected
                    $isPrimary = 1;
                }

                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'products/' . $filename,
                    'is_primary' => $isPrimary,
                    'sort_order' => $key,
                ]);
            }
        }

        $sizes = $request->input('sizes', []);
        $prices = $request->input('prices', []);
        $oldPrices = $request->input('old_prices', []);
        $stocks = $request->input('stock', []);
        $statuses = $request->input('status', []);

        $primaryIndex = (int) $request->input('primary_size', 0);

        foreach ($sizes as $i => $size) {
            if (!empty($size) && isset($prices[$i])) {
                $product->sizes()->create([
                    'size' => $size,
                    'price' => $prices[$i],
                    'old_price' => $oldPrices[$i] ?? null,
                    'stock' => $stocks[$i],
                    'status' => $statuses[$i],
                    'is_primary' => $i === $primaryIndex ? 1 : 0, 
                ]);
            }
        }

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
            'name' => 'required',
            'sku' => 'required|unique:products,sku,' . $id,
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'sizes.*' => 'required|string|max:50',
            'prices.*' => 'required|numeric|min:0',
            'old_prices.*' => 'nullable|numeric|min:0',
            'stock.*' => 'required|in:0,1',
        ]);

        $data = $request->all();
        // dd($data);
        $data['slug'] = Str::slug($request->name);
        $data['discount'] = $request->discount ?? 0;
        $data['coupon_discount'] = $request->coupon_discount ?? 0;
        $data['tags'] = $request->tags ?? 0;
        $data['rating'] = $request->rating ?? 0;
        $data['tax'] = $request->tax ?? 0;
        $data['tax_title'] = $request->tax_title ?? '';
        // dd($data);
        // Image upload
        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $key => $img) {

                $filename = 'product_' . time() . '_' . uniqid() . '.' . $img->getClientOriginalExtension();

                $path = config('uploads.path') . '/products';

                if (!is_dir($path)) {
                    mkdir($path, 0755, true);
                }

                $img->move($path, $filename);
                
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'products/' . $filename,
                    'is_primary' => 0,
                    'sort_order' => $key,
                ]);
            }
        }

        if ($request->filled('primary_image')) {
            $primaryImageIndex = (int) $request->primary_image;
        
            // fetch all images ordered by sort_order
            $images = $product->images()->orderBy('sort_order')->get();
        
            foreach ($images as $i => $image) {
                $image->update([
                    'is_primary' => $i === $primaryImageIndex ? 1 : 0
                ]);
            }
        }


        $sizes     = $request->input('sizes', []);
        $prices    = $request->input('prices', []);
        $oldPrices = $request->input('old_prices', []);
        $stocks    = $request->input('stock', []);
        $statuses  = $request->input('statuses', []);
        $primaryIndex = (int) $request->input('primary_size', 0);

        $existingSizeIds = $product->sizes()->pluck('id')->toArray();
        $product->sizes()->delete();
      
        foreach ($sizes as $key => $size) {
            if (!empty($size) && isset($prices[$key])) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'size'       => $size,
                    'price'      => $prices[$key] ?? 0,
                    'old_price'  => $oldPrices[$key] ?? null,
                    'stock'      => $stocks[$key] ?? 1,
                    'status'     => $statuses[$key] ?? 1,
                    'is_primary' => $key === $primaryIndex ? 1 : 0,
                ]);
            }
        }


        $product->update($data);

        return redirect()->route('product.index')
            ->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = Product::with('images', 'sizes')->findOrFail($id);
        
        $path = config('uploads.path') . '/products';
        // Delete image from folder
        foreach ($product->images as $img) {

            $filePath = public_path($path . '/' . $img->image);
    
            if ($img->image && File::exists($filePath)) {
                File::delete($filePath);
            }
    
            $img->delete(); 
        }

        foreach ($product->sizes as $size) {
            $size->delete(); 
        }
        

        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully');
    }
}
