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
                        <th>Page</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($pages as $page)
                    <tr>
                        <td>{{ optional($page->menu)->title }}</td>
                        <td>{{ $page->status ? 'Active' : 'Inactive' }}</td>
                        <td>
                            <a href="{{ route('pages.edit', $page->id) }}" class="btn btn-sm btn-warning">Edit</a>
                            
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>




</div>
@endsection