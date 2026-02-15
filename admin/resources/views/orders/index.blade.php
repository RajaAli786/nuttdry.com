@extends('layouts.app')
<style>
    .dataTable th,
    .dataTable td {
        vertical-align: middle;
    }

    .dt-buttons {
        float: left !important;
    }

    .buttons-excel {
        background: green;
        color: #fff;
        padding: 2px 8px;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
@section('content')
    @if (session('success'))
        <script>
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "{{ session('success') }}"
            });
        </script>
    @endif

    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Orders List</h2>
        </div>

        <div class="card card-outline">
            <div class="card-body">
                <table class="table table-bordered table-hover align-middle dataTable">
                    <thead class="table-dark">
                        <tr>
                            <th>Sr.No.</th>
                            <th>Order No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($orders as $key => $order)
                            <tr>
                                <td>{{ $orders->firstItem() + $key }}</td>
                                <td>{{ $order->order_number }}</td>
                                <td>{{ $order->billing_name }}</td>
                                <td>{{ $order->billing_phone }}</td>
                                <td>₹{{ number_format($order->grand_total, 2) }}</td>

                                <td>
                                    <form action="{{ route('orders.update') }}" method="POST">
                                        @csrf
                                        <input type="hidden" name="order_id" value="{{ $order->id }}">
                                        <select name="status" class="form-select form-select-sm mb-1">
                                            <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pending
                                            </option>
                                            <option value="confirmed" {{ $order->status == 'confirmed' ? 'selected' : '' }}>Confirmed
                                            </option>
                                            <option value="shipped" {{ $order->status == 'shipped' ? 'selected' : '' }}>Shipped
                                            </option>
                                            <option value="delivered" {{ $order->status == 'delivered' ? 'selected' : '' }}>Delivered
                                            </option>
                                            <option value="cancelled" {{ $order->status == 'cancelled' ? 'selected' : '' }}>Cancelled
                                            </option>
                                        </select>
                                </td>

                                <td>
                                    <select name="payment_status" class="form-select form-select-sm mb-1">
                                        <option value="pending" {{ $order->payment_status == 'pending' ? 'selected' : '' }}>Pending
                                        </option>
                                        <option value="paid" {{ $order->payment_status == 'paid' ? 'selected' : '' }}>Paid</option>
                                        <option value="failed" {{ $order->payment_status == 'failed' ? 'selected' : '' }}>Failed
                                        </option>
                                    </select>
                                </td>

                                <td>{{ $order->created_at->format('d M Y') }}</td>
                                <td>
                                    <button class="btn btn-sm btn-success">Update</button>
                                    </form>

                                    <a href="{{ route('orders.show', $order->id) }}" class="btn btn-sm btn-primary">View</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="9" class="text-center">No Orders Found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>




    </div>
@endsection