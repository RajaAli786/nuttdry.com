<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    public function apply(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'subtotal' => 'required|numeric'
        ]);

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', 1)
            ->first();

        if (!$coupon) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid coupon code'
            ], 400);
        }

        // percentage OR flat
        if ($coupon->type === 'percent') {
            $discount = ($request->subtotal * $coupon->value) / 100;
        } else {
            $discount = $coupon->value;
        }

        return response()->json([
            'status' => true,
            'discount' => round($discount),
            'message' => 'Coupon applied successfully'
        ]);
    }
}
