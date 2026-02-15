<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductReview;

class ProductReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'name'       => 'required|string|max:255',
            'email'      => 'required|email',
            'phone'      => 'required|digits:10',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'required|string',
        ]);

        ProductReview::create([
            'product_id' => $request->product_id,
            'name'       => $request->name,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
            'is_approved'=> 0 // admin approve karega
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully. Waiting for approval.'
        ]);
    }

    public function index($product_id)
    {
        $reviews = ProductReview::where('product_id', $product_id)
            ->where('is_approved', 1)
            ->latest()
            ->get();

        $average = ProductReview::where('product_id', $product_id)
            ->where('is_approved', 1)
            ->avg('rating');

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => round($average, 1),
        ]);
    }
    
}
