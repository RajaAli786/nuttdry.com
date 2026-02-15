@extends('layouts.app')
<style>
    .table.table-bordered.dataTable{
        border-collapse: collapse!important;
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
        <h2>Products</h2>
        <a href="{{ route('product.create') }}" class="btn btn-primary">Add Product</a>
    </div>

    <div class="card card-outline">
        <div class="card-body">
            <table class="table table-bordered table-hover align-middle dataTable">
                <thead class="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Featured</th>
                        <th>Top</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($products as $product)
                    <tr>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->price }}</td>
                        <td>
                        @if($product->images->first())
                            <img src="{{ config('uploads.url') . '/' . $product->images->first()->image }}"
                                alt="{{ $product->name }}"
                                width="60" height="60"
                                style="object-fit: cover; border-radius: 6px;">
                        @else
                            <span class="text-muted">No Image</span>
                        @endif
                        </td>
                        <td>{{ $product->is_featured ? 'Yes' : 'No' }}</td>
                        <td>{{ $product->is_top ? 'Yes' : 'No' }}</td>
                        <td>{{ $product->status ? 'Active' : 'Inactive' }}</td>
                        <td>
                            <a href="{{ route('product.edit', $product->id) }}" class="btn btn-sm btn-warning">Edit</a>
                            <form action="{{ route('product.delete', $product->id) }}" method="POST"
                                style="display:inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger"
                                    onclick="return confirm('Are you sure you want to delete this product?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>




</div>
@endsection