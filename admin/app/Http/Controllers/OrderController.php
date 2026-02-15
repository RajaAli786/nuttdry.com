<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Str;
use Auth;

class OrderController extends Controller
{
    // show create order page
    public function index()
    {
        $orders = Order::orderBy('id', 'desc')->paginate(10);
        return view('orders.index', compact('orders'));
    }

    public function create()
    {
        return view('orders.create');
    }

    // store order
    public function store(Request $request)
    {
        $request->validate([
            'billing_name'    => 'required|string|max:100',
            'billing_email'   => 'required|email|max:50',
            'billing_phone'   => 'required|max:15',
            'billing_address' => 'required',
            'subtotal'        => 'required|numeric',
            'grand_total'     => 'required|numeric',
        ]);

        Order::create([
            'order_number'       => 'ORD-' . strtoupper(Str::random(8)),
            'user_id'            => Auth::id(),
            'subtotal'           => $request->subtotal,
            'product_discount'   => $request->product_discount ?? 0,
            'coupon_discount'    => $request->coupon_discount ?? 0,
            'grand_total'        => $request->grand_total,
            'coupon_code'        => $request->coupon_code,
            'billing_name'       => $request->billing_name,
            'billing_email'      => $request->billing_email,
            'billing_phone'      => $request->billing_phone,
            'billing_address'    => $request->billing_address,
            'status'             => 'pending',
            'payment_status'     => 'pending',
            'payment_method'     => $request->payment_method,
        ]);

        return redirect()->back()->with('success', 'Order placed successfully');
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required',
            'payment_status' => 'required'
        ]);

        $order = Order::find($request->order_id);

        $order->status = $request->status;
        $order->payment_status = $request->payment_status;
        $order->save();

        return redirect()->back()->with('success', 'Order status updated successfully');
    }


    public function show($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        // dd($order);
        return view('orders.show', compact('order'));
    }


}
