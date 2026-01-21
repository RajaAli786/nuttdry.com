@extends('layouts.app')

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="card card-primary card-outline mb-4 col-md-12 my-5">
                <div class="card-header">
                    <div class="card-title">Edit Category</div>
                </div>

                <form id="categoryForm" 
                    action="{{ route('categories.update', $category->id) }}" 
                    method="POST" 
                    enctype="multipart/form-data">

                    @csrf
                    @method('PUT')

                    <div class="card-body">

                        <!-- Category Name -->
                        <div class="mb-3">
                            <label class="form-label">Category Name</label>
                            <input type="text" 
                                name="name" 
                                class="form-control" 
                                value="{{ old('name', $category->name) }}" 
                                required>
                        </div>

                        <!-- Description -->
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" 
                                    name="description" 
                                    id="description"
                                    rows="3">{{ old('description', $category->description) }}</textarea>
                        </div>

                        <!-- Current Image -->
                        <div class="mb-3">
                            <label class="form-label d-block">Current Image</label>

                            @if($category->image)
                                <img src="{{ asset($category->image) }}" 
                                    width="80" 
                                    class="mb-2 rounded">
                            @endif
                        </div>

                        <!-- Upload New Image -->
                        <div class="input-group mb-3">
                            <input type="file" name="image" class="form-control">
                            <label class="input-group-text">Upload</label>
                        </div>

                        <!-- Is Home -->
                        <div class="mb-3 form-check">
                            <input type="checkbox" 
                                value="1" 
                                name="is_home" 
                                class="form-check-input"
                                {{ old('is_home', $category->is_home) ? 'checked' : '' }}>
                            <label class="form-check-label">Show on Home Page</label>
                        </div>

                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Update Category</button>
                    </div>

                </form>

            </div>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
<script>
$(document).ready(function() {
    ClassicEditor
        .create(document.querySelector('#description'))
        .catch(error => {
            console.error(error);
        });
        
    $("#categoryForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            }
        },
        messages: {
            name: {
                required: "Please enter category name",
                minlength: "Category name must be at least 3 characters"
            }
        }
    });
});
</script>
@endpush
