<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    // LIST
    public function index()
    {
        $coupons = Coupon::latest()->get();
        return view('coupons.index', compact('coupons'));
    }

    // SAME FORM (ADD + EDIT)
    public function form($id = null)
    {
        $coupon = $id ? Coupon::findOrFail($id) : new Coupon();

        return view('coupons.form', compact('coupon'));
    }

    // SAVE (STORE + UPDATE)
    public function save(Request $request, $id = null)
    {
        $request->validate([
            'code' => 'required',
            'type' => 'required|in:flat,percent',
            'value' => 'required|numeric',
        ]);

        $coupon = $id
            ? Coupon::findOrFail($id)
            : new Coupon();

        $coupon->code = strtoupper($request->code);
        $coupon->title = $request->title;
        $coupon->type = $request->type;
        $coupon->value = $request->value;
        $coupon->min_order_amount = $request->min_order_amount;
        $coupon->usage_limit = $request->usage_limit;
        $coupon->start_date = $request->start_date;
        $coupon->end_date = $request->end_date;
        $coupon->is_active = $request->is_active ? 1 : 0;

        $coupon->save();

        return redirect()
            ->route('coupons.index')
            ->with('success', 'Coupon saved successfully');
    }
}
