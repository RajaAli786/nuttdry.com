@extends('layouts.app')

@section('content')
    <div class="container">

        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Add Testimonial</div>
            </div>
            <div class="card-body">
                <form action="{{ route('testimonial.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="card-body">

                        <div class="mb-3">
                            <label>Name</label>
                            <input name="name" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label>Designation</label>
                            <input name="designation" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label>Rating</label>
                            <select name="rating" class="form-control" required>
                                <option value="">Select Rating</option>
                                <option value="1">⭐ 1</option>
                                <option value="2">⭐⭐ 2</option>
                                <option value="3">⭐⭐⭐ 3</option>
                                <option value="4">⭐⭐⭐⭐ 4</option>
                                <option value="5">⭐⭐⭐⭐⭐ 5</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label>Message</label>
                            <textarea name="message" class="form-control" rows="4" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label>Image</label>
                            <input type="file" name="image" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label>Sort Order</label>
                            <input type="number" name="sort_order" class="form-control" value="0">
                        </div>

                    </div>

                    <div class="card-footer">
                        <button class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
@endsection