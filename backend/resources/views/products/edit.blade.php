@extends('layouts.app')

@section('content')
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="container">
        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Edit Product</div>
            </div>

            <div class="card-body">
                <form action="{{ route('product.update', $product->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label>Product Name</label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $product->name) }}"
                            required>
                    </div>

                    <div class="mb-3">
                        <label>SKU</label>
                        <input type="text" name="sku" class="form-control" value="{{ old('sku', $product->sku) }}" required>
                    </div>

                    <div class="mb-3">
                        <label>Price</label>
                        <input type="number" step="0.01" name="price" class="form-control"
                            value="{{ old('price', $product->price) }}" required>
                    </div>

                    <div class="mb-3">
                        <label>Old Price</label>
                        <input type="number" step="0.01" name="old_price" class="form-control"
                            value="{{ old('old_price', $product->old_price) }}">
                    </div>

                    <div class="mb-3">
                        <label>Category</label>
                        <select name="category_id" class="form-control">
                            <option value="">Select</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" {{ $product->category_id == $cat->id ? 'selected' : '' }}>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Menu</label>
                        <select name="menu_id" class="form-control">
                            <option value="">Select</option>
                            
                            @foreach($menus as $menu)
                                <option value="{{ $menu->id }}" {{ $product->menu_id == $menu->id ? 'selected' : '' }}>
                                    {{ $menu->title }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Featured</label>
                        <select name="is_featured" class="form-control">
                            <option value="0" {{ $product->is_featured == 0 ? 'selected' : '' }}>No</option>
                            <option value="1" {{ $product->is_featured == 1 ? 'selected' : '' }}>Yes</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Top</label>
                        <select name="is_top" class="form-control">
                            <option value="0" {{ $product->is_top == 0 ? 'selected' : '' }}>No</option>
                            <option value="1" {{ $product->is_top == 1 ? 'selected' : '' }}>Yes</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Discount (%)</label>
                        <input type="number" step="0.01" name="discount" class="form-control"
                            value="{{ old('discount', $product->discount) }}">
                    </div>

                    <div class="mb-3">
                        <label>Coupon Code</label>
                        <input type="text" name="coupon_code" class="form-control"
                            value="{{ old('coupon_code', $product->coupon_code) }}">
                    </div>

                    <div class="mb-3">
                        <label>Coupon Discount</label>
                        <input type="number" step="0.01" name="coupon_discount" class="form-control"
                            value="{{ old('coupon_discount', $product->coupon_discount) }}">
                    </div>

                    <div class="mb-3">
                        <label>Image</label><br>
                        @if($product->image)
                            <img src="{{ asset('products/' . $product->image) }}" width="80" class="mb-2"><br>
                        @endif
                        <input type="file" name="image" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Status</label>
                        <select name="status" class="form-control">
                            <option value="1" {{ $product->status == 1 ? 'selected' : '' }}>Active</option>
                            <option value="0" {{ $product->status == 0 ? 'selected' : '' }}>Inactive</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Short Description</label>
                        <textarea name="short_description" class="form-control" rows="3">{{ old('short_description', $product->short_description) }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="5">{{ old('description', $product->description) }}</textarea>
                    </div>

                    <h5>SEO SECTION</h5>
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" name="meta_title" value="{{ old('meta_title', $product->meta_title) }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keyword</label>
                        <input type="text" name="meta_keyword" value="{{ old('meta_keyword', $product->meta_keyword) }}" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <input type="text" name="meta_description" value="{{ old('meta_description', $product->meta_description) }}" class="form-control">
                    </div>

                    <button class="btn btn-primary">Update Product</button>
                    <a href="{{ route('product.index') }}" class="btn btn-secondary">Back</a>
                </form>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <script>
        $(document).ready(function () {
            if ($("#categoryForm").length) {
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
                    },
                    errorElement: 'span',
                    errorClass: 'text-danger',
                    highlight: function (element) {
                        $(element).addClass('is-invalid');
                    },
                    unhighlight: function (element) {
                        $(element).removeClass('is-invalid');
                    }
                });
            }
        });
    </script>
@endpush