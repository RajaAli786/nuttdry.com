@extends('layouts.app')
<style>
    .table.table-bordered.dataTable {
        border-collapse: collapse !important;
    }

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
            <h2>Coupons</h2>
            <a href="{{ route('coupons.add') }}" class="btn btn-primary">Add Coupon</a>
        </div>

        <div class="card card-outline">
            <div class="card-body">
                <table class="table table-bordered table-hover align-middle dataTable">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse($coupons as $coupon)
                            <tr>
                                <td>{{ $coupon->code }}</td>
                                <td>{{ $coupon->type }}</td>
                                <td>{{ $coupon->value }}</td>
                                <td>
                                    {{ $coupon->is_active ? 'Active' : 'Inactive' }}
                                </td>
                                <td>
                                    <a href="{{ route('coupons.edit', $coupon->id) }}" class="btn btn-sm btn-primary">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="text-center">
                                    No coupons found
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>




    </div>
@endsection