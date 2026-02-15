<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Coupon;
use Carbon\Carbon;

class CouponController extends Controller
{
    /**
     * Validate Coupon
     */
    public function validateCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'subtotal' => 'required|numeric',
        ]);

        $code = strtoupper($request->code);
        $subtotal = (float) $request->subtotal;

        /* ================= FIND COUPON ================= */

        $coupon = Coupon::where('code', $code)
            ->where('is_active', 1)
            ->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid coupon code'
            ], 404);
        }

        $now = Carbon::now();

        /* ================= DATE CHECK ================= */

        if (
            ($coupon->start_date && $now < $coupon->start_date) ||
            ($coupon->end_date && $now > $coupon->end_date)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon expired'
            ], 400);
        }

        /* ================= USAGE LIMIT ================= */

        if (
            $coupon->usage_limit &&
            $coupon->used_count >= $coupon->usage_limit
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon usage limit reached'
            ], 400);
        }

        /* ================= MIN ORDER CHECK ================= */

        $minOrder = (float) $coupon->min_order_amount;

        // If min order > 0 then only check
        if ($minOrder > 0 && $subtotal < $minOrder) {
            return response()->json([
                'success' => false,
                'message' => 'Minimum order amount not reached',
                'required_minimum' => $minOrder,
                'subtotal' => $subtotal
            ], 400);
        }

        /* ================= DISCOUNT CALCULATION ================= */

        if ($coupon->type === 'percent') {
            $discount = ($subtotal * $coupon->value) / 100;
        } else {
            $discount = $coupon->value;
        }

        // Discount subtotal se zyada nahi hoga
        $discount = min($discount, $subtotal);

        /* ================= RESPONSE ================= */

        return response()->json([
            'success' => true,
            'message' => 'Coupon applied successfully',
            'data' => [
                'code' => $coupon->code,
                'title' => $coupon->title,
                'type' => $coupon->type, // flat / percent
                'value' => $coupon->value,
                'discount' => round($discount, 2),
                'subtotal' => $subtotal,
                'final_total' => round($subtotal - $discount, 2),
            ]
        ]);
    }
}
