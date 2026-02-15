@extends('layouts.app')

@section('content')
    <div class="container">

        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Edit Testimonial</div>
            </div>
            <div class="card-body">
                <form action="{{ route('testimonial.update', $testimonial->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf

                    <div class="card-body">

                        <div class="mb-3">
                            <label>Name</label>
                            <input name="name" class="form-control" value="{{ $testimonial->name }}" required>
                        </div>

                        <div class="mb-3">
                            <label>Designation</label>
                            <input name="designation" class="form-control" value="{{ $testimonial->designation }}">
                        </div>

                        <div class="mb-3">
                        <label>Rating</label>
                        <select name="rating" class="form-control" required>
                            <option value="">Select Rating</option>
                            @for ($i = 1; $i <= 5; $i++)
                                <option
                                    value="{{ $i }}"
                                    {{ old('rating', $testimonial->rating) == $i ? 'selected' : '' }}
                                >
                                    {{ str_repeat('⭐', $i) }} {{ $i }}
                                </option>
                            @endfor
                        </select>
                    </div>

                        <div class="mb-3">
                            <label>Message</label>
                            <textarea name="message" class="form-control" rows="4"
                                required>{{ $testimonial->message }}</textarea>
                        </div>

                        <div class="mb-3">
                            <label>Image</label>
                            <input type="file" name="image" class="form-control">
                            @if($testimonial->image)
                                <img src="{{ asset($testimonial->image) }}" width="80" class="mt-2 rounded">
                            @endif
                        </div>

                        <div class="mb-3">
                            <label>Sort Order</label>
                            <input type="number" name="sort_order" class="form-control"
                                value="{{ $testimonial->sort_order }}">
                        </div>

                    </div>

                    <div class="card-footer">
                        <button class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
@endsection