<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user(); 

        $orders = Order::with('items') 
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    public function placeOrder(Request $request)
    {
        // 1️⃣ Validate request
        $request->validate([
            'cartItems' => 'required|array|min:1',
            'cartItems.*.id' => 'required|integer',
            'cartItems.*.name' => 'required|string',
            'cartItems.*.price' => 'required|numeric',
            'cartItems.*.qty' => 'required|integer|min:1',

            'formData.name' => 'required|string|max:100',
            'formData.email' => 'required|email|max:50',
            'formData.phone' => 'required|string|max:15',
            'formData.address' => 'required|string',

            'subtotal' => 'required|numeric|min:0',
            'productDiscount' => 'nullable|numeric|min:0',
            'couponDiscount' => 'nullable|numeric|min:0',
            'couponCode' => 'nullable|string',

            'grandTotal' => 'required|numeric|min:0',
            'paymentId' => 'required|string',
        ]);

        DB::beginTransaction();

        try {

            // 2️⃣ Create Order
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),

                'subtotal' => $request->subtotal,
                'product_discount' => $request->productDiscount ?? 0,
                'coupon_discount' => $request->couponDiscount ?? 0,
                'grand_total' => $request->grandTotal,
                'coupon_code' => $request->couponCode,

                'billing_name' => $request->formData['name'],
                'billing_email' => $request->formData['email'],
                'billing_phone' => $request->formData['phone'],
                'billing_address' => $request->formData['address'],

                'status' => 'completed',
                'payment_status' => 'paid',
                'payment_method' => 'razorpay',
            ]);

            // 3️⃣ Create Order Items
            foreach ($request->cartItems as $item) {
                $order->items()->create([
                    'product_id' => $item['id'],
                    'product_name' => $item['name'],
                    'qty' => $item['qty'],
                    'price' => $item['price'],
                    'discount' => $item['discount'] ?? 0,
                ]);
            }

            // 4️⃣ Create Payment
            $order->payment()->create([
                'order_id'         => $order->id,
                'user_id'          => auth()->id(),
                'payment_id'       => $request->paymentId,
                'order_amount'     => $request->grandTotal,  
                'coupon_code'      => $request->couponCode,
                'coupon_discount'  => $request->couponDiscount ?? 0,
                'status'           => 'success',
                'payment_method'   => 'razorpay',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'order_id' => $order->id,
                'message' => 'Order placed successfully'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            logger('ORDER ERROR', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return response()->json([
                'success' => false,
                'error'   => $e->getMessage(),
                'line'    => $e->getLine(),
            ], 500);
        }
    }

}
