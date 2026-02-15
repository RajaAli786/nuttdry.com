@extends('layouts.app')
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

    @if ($errors->any())
        <script>
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                html: `{!! implode('<br>', $errors->all()) !!}`
            });
        </script>
    @endif

    <div class="container">
        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">{{ $coupon->id ? 'Edit Coupon' : 'Add Coupon' }}</div>
            </div>

            <div class="card-body">

                <form method="POST" action="{{ $coupon->id
        ? route('coupons.update', $coupon->id)
        : route('coupons.store') }}">

                    @csrf

                    <div class="mb-3">
                        <label>Coupon Code</label>
                        <input type="text" name="code" class="form-control" value="{{ old('code', $coupon->code) }}"
                            required>
                    </div>

                    <div class="mb-3">
                        <label>Title</label>
                        <input type="text" name="title" class="form-control" value="{{ old('title', $coupon->title) }}">
                    </div>

                    <div class="mb-3">
                        <label>Type</label>
                        <select name="type" class="form-control">
                            <option value="flat" {{ $coupon->type == 'flat' ? 'selected' : '' }}>
                                Flat
                            </option>
                            <option value="percent" {{ $coupon->type == 'percent' ? 'selected' : '' }}>
                                Percent
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Value</label>
                        <input type="number" step="0.01" name="value" class="form-control"
                            value="{{ old('value', $coupon->value) }}">
                    </div>

                    <div class="mb-3">
                        <label>Min Order Amount</label>
                        <input type="number" name="min_order_amount" class="form-control"
                            value="{{ old('min_order_amount', $coupon->min_order_amount) }}">
                    </div>

                    <div class="mb-3">
                        <label>Usage Limit</label>
                        <input type="number" name="usage_limit" class="form-control"
                            value="{{ old('usage_limit', $coupon->usage_limit) }}">
                    </div>

                    <div class="mb-3">
                        <label>Start Date</label>
                        <input type="datetime-local" name="start_date" class="form-control"
                            value="{{ old('start_date', $coupon->start_date) }}">
                    </div>

                    <div class="mb-3">
                        <label>End Date</label>
                        <input type="datetime-local" name="end_date" class="form-control"
                            value="{{ old('end_date', $coupon->end_date) }}">
                    </div>

                    <div class="form-check mb-3">
                        <input type="checkbox" name="is_active" class="form-check-input" {{ $coupon->is_active ? 'checked' : '' }}>
                        <label class="form-check-label">
                            Active
                        </label>
                    </div>

                    <button class="btn btn-primary">
                        {{ $coupon->id ? 'Update Coupon' : 'Create Coupon' }}
                    </button>
                </form>

            </div>
        </div>
    </div>


@endsection