@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Slider List</h2>

    <a href="{{ route('sliders.create') }}" class="btn btn-primary mb-3">Add New Slider</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Sort Order</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sliders as $slider)
            <tr>
                <td><img src="{{ asset($slider->image) }}" width="100"></td>
                <td>{{ $slider->title }}</td>
                <td>{{ $slider->status ? 'Active' : 'Inactive' }}</td>
                <td>{{ $slider->sort_order }}</td>
                <td>
                    <a href="{{ route('sliders.edit', $slider->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="{{ route('sliders.delete', $slider->id) }}" class="btn btn-danger btn-sm"
                        onclick="return confirm('Delete slider?')">Delete</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
