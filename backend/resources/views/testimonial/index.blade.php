@extends('layouts.app')

@section('content')
<div class="container my-5">

    <div class="d-flex justify-content-between mb-3">
        <h3>Testimonials</h3>
        <a href="{{ route('testimonial.create') }}" class="btn btn-primary btn-sm">Add New</a>
    </div>

    <div class="card card-outline">
        <div class="card-body">

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Message</th>
                        <th>Order</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                @foreach($testimonials as $t)
                    <tr>
                        <td width="80">
                            @if($t->image)
                                <img src="{{ asset($t->image) }}" width="60" class="rounded">
                            @endif
                        </td>

                        <td>{{ $t->name }}</td>
                        <td>{{ $t->designation }}</td>
                        <td>{{ Str::limit($t->message, 50) }}</td>
                        <td>{{ $t->sort_order }}</td>

                        <td>
                            <a href="{{ route('testimonial.edit', $t->id) }}" class="btn btn-warning btn-sm">Edit</a>

                            <form action="{{ route('testimonial.delete', $t->id) }}" method="POST" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button onclick="return confirm('Are you sure?')" class="btn btn-danger btn-sm">
                                    Delete
                                </button>
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
