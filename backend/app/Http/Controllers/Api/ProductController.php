<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Only active products
        $query->where('status', 1);

        if ($request->filled('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        if ($request->filled('is_top')) {
            $query->where('is_top', $request->is_top);
        }

        if ($request->filled('is_new')) {
            $query->orderBy('created_at', 'desc');
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('menu_id')) {
            $query->where('menu_id', $request->menu_id);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float) $request->max_price);
        }

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                  ->orWhere('description', 'like', '%' . $request->q . '%');
            });
        }
        // dd($query->toSql());

        $products = $query->latest()->get();
        $maxPrice = Product::where('status', 1)->max('price');
        // dd($products);
        return response()->json([
            'success' => true,
            'count' => $products->count(),
            'data' => $products,
            'max_price' => $maxPrice, 
        ]);
    }

    public function categories(Request $request)
    {
        // Only active categories
        $categories = Category::where('status', 1)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'count' => $categories->count(),
            'data' => $categories
        ]);
    }
    public function categoryById($id)
    {
        $categories = Category::where('status', 1)->find($id);

        if (!$categories) {
            return response()->json([
                'success' => false,
                'message' => 'Categories not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function priceRange()
    {

        $maxPrice = Product::where('status', 1)->max('price');

        return response()->json([
            'success' => true,
            'max_price' => (int) ($maxPrice ?? 0),
        ]);
    }


    public function show($id)
    {
        $product = Product::where('status', 1)->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }
}
