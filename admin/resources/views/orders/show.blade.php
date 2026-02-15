@extends('layouts.app')

@section('content')
    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Orders Details</h2>
        </div>

        {{-- Order Info --}}
        <div class="card mb-3">
            <div class="card-body">
                <strong>Order No:</strong> {{ $order->order_number }} <br>
                <strong>Status:</strong> {{ ucfirst($order->status) }} <br>
                <strong>Payment:</strong> {{ ucfirst($order->payment_status) }} <br>
                <strong>Total:</strong> ₹{{ number_format($order->grand_total, 2) }}
            </div>
        </div>

        {{-- Billing Info --}}
        <div class="card mb-3">
            <div class="card-header">Billing Details</div>
            <div class="card-body">
                <p><strong>Name:</strong> {{ $order->billing_name }}</p>
                <p><strong>Email:</strong> {{ $order->billing_email }}</p>
                <p><strong>Phone:</strong> {{ $order->billing_phone }}</p>
                <p><strong>Address:</strong> {{ $order->billing_address }}</p>
            </div>
        </div>

        {{-- Products --}}
        <div class="card">
            <div class="card-header">Ordered Products</div>
            <div class="card-body table-responsive">
                <table class="table table-bordered align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($order->items as $item)
                                            <tr>
                                                <td>
                                                    @if($item->product && $item->product->image)
                                                        <img src="{{ config('uploads.url') . '/' . $item->product->image }}" width="60">
                                                    @else
                                                        <span>N/A</span>
                                                    @endif
                                                </td>

                                                <td>
                                                    {{ $item->product_name }} <br>
                                                    @if($item->product)
                                                        <small class="text-muted">
                                                            Slug: {{ $item->product->slug }}
                                                        </small>
                                                    @endif
                                                </td>

                                                <td>₹{{ number_format($item->price, 2) }}</td>

                                                <td>{{ $item->qty }}</td>

                                                <td>₹{{ number_format($item->discount, 2) }}</td>

                                                <td>
                                                    ₹{{ number_format(
                                ($item->price * $item->qty) - $item->discount,
                                2
                            ) }}
                                                </td>
                                            </tr>
                        @endforeach
                    </tbody>
                </table>

            </div>
        </div>

    </div>
@endsection