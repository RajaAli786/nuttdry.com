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
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Categories</h2>
            <a href="{{ route('categories.add') }}" class="btn btn-primary">Add New Category</a>
        </div>

        <div class="card card-outline">
            <div class="card-body">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th style="width:50%">Description</th>
                            <th>Image</th>
                            <th>Is Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $sr = 1; @endphp
                        @foreach($categories as $category)
                            <tr>
                                <td>{{ $sr }}</td>
                                <td>{{ $category->name }}</td>
                                <td>{{ $category->description }}</td>
                                <td>
                                    @if($category->image)
                                        <img src="{{ config('uploads.url') . '/' . $category->image }}" alt="{{ $category->name }}" width="50">
                                    @else
                                        N/A
                                    @endif
                                </td>
                                <td>{{ $category->is_home ? 'Yes' : 'No' }}</td>
                                <td>
                                    <a href="{{ route('categories.edit', $category->id) }}"
                                        class="btn btn-sm btn-warning">Edit</a>
                                    <a href="{{ route('categories.delete', $category->id) }}"><button type="submit"
                                            class="btn btn-sm btn-danger"
                                            onclick="return confirm('Are you sure?')">Delete</button></a>

                                </td>
                            </tr>
                            @php $sr++; @endphp
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>




    </div>
@endsection