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
                        <label>Rating</label>
                        <select name="rating" class="form-control">
                            <option value="">Select Rating</option>
                            @for ($i = 1; $i <= 5; $i++)
                                <option
                                    value="{{ $i }}"
                                    {{ old('rating', $product->rating) == $i ? 'selected' : '' }}
                                >
                                    {{ str_repeat('⭐', $i) }} {{ $i }}
                                </option>
                            @endfor
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Tax Title</label>
                        <input type="text" step="1" name="tax_title" class="form-control" value="{{ old('tax_title', $product->tax_title) }}" placeholder="Tax Title">
                    </div>

                    <div class="mb-3">
                        <label>Tax</label>
                        <input type="number" step="1" name="tax" class="form-control"
                            value="{{ old('tax', $product->tax) }}" placeholder="Tax percentage">
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

                    <!-- <div class="mb-3">
                                                <label>Discount (%)</label>
                                                <input type="number" step="0.01" name="discount" class="form-control"
                                                    value="{{ old('discount', $product->discount) }}">
                                            </div> -->

                    <div class="mb-3">
                        <label>Product Tag</label>
                        <input type="text" name="tags" class="form-control" value="{{ old('tags', $product->tags) }}"
                            placeholder="e.g:- Best Seller">
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
                        <label>Product Images</label>

                        <div id="image-wrapper">
                            @foreach($product->images as $index => $img)
                                <div class="image-row mb-2 d-flex align-items-center">
                                    <img src="{{ config('uploads.url') . '/' . $img->image }}" width="80" class="me-2 border">

                                    <input type="radio" name="primary_image" value="{{ $index }}" {{ $img->is_primary ? 'checked' : '' }}>
                                    <label class="ms-1">Primary</label>

                                    <a href="{{ route('product.image.delete', $img->id) }}"
                                        onclick="return confirm('Are you sure you want to delete this image?');">
                                        <button type="button" class="btn btn-danger btn-sm ms-2 remove-existing">×</button>
                                    </a>
                                </div>
                            @endforeach
                        </div>

                        <button type="button" class="btn btn-sm btn-secondary mt-2" onclick="addImage()">Add Image</button>
                    </div>

                    <!-- PRODUCT SIZES -->
                    <div class="mb-3">
                        <label>Product Sizes & Prices</label>
                        <div id="size-wrapper">
                            @foreach($product->sizes as $key=> $size)
                                <div class="size-row mb-2 d-flex align-items-center gap-2">
                                    <input type="text" name="sizes[]" class="form-control" placeholder="Size"
                                        value="{{ $size->size }}" required>
                                    <input type="number" step="0.01" name="prices[]" class="form-control" placeholder="Price"
                                        value="{{ $size->price }}" required>
                                    <input type="number" step="0.01" name="old_prices[]" class="form-control"
                                        placeholder="Old Price" value="{{ $size->old_price }}">
                                    <select name="stock[]" class="form-control">
                                        <option value="1" {{ $size->stock ? 'selected' : '' }}>In Stock</option>
                                        <option value="0" {{ !$size->stock ? 'selected' : '' }}>Out Of Stock</option>
                                    </select>
                                    <select name="statuses[]" class="form-control">
                                        <option value="1" {{ $size->status ? 'selected' : '' }}>Active</option>
                                        <option value="0" {{ !$size->status ? 'selected' : '' }}>Inactive</option>
                                    </select>

                                    <div class="form-check ms-2">
                                        <input type="radio" name="primary_size" class="form-check-input" value="{{ $key }}" {{ $size->is_primary ? 'checked' : '' }}>
                                        <label class="form-check-label">Primary</label>
                                    </div>

                                    <button type="button" class="btn btn-danger btn-sm remove-size">×</button>
                                </div>
                            @endforeach
                        </div>
                        <button type="button" class="btn btn-sm btn-secondary mt-2" onclick="addSize()">Add Size</button>
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
                        <textarea name="short_description" class="form-control"
                            rows="3">{{ old('short_description', $product->short_description) }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control"
                            rows="5">{{ old('description', $product->description) }}</textarea>
                    </div>

                    <h5>SEO SECTION</h5>
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" name="meta_title" value="{{ old('meta_title', $product->meta_title) }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keyword</label>
                        <input type="text" name="meta_keyword" value="{{ old('meta_keyword', $product->meta_keyword) }}"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <input type="text" name="meta_description"
                            value="{{ old('meta_description', $product->meta_description) }}" class="form-control">
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

        function addImage() {
            let wrapper = document.getElementById('image-wrapper');
            let index = wrapper.children.length;

            let row = document.createElement('div');
            row.className = 'image-row mb-2 d-flex align-items-center';

            row.innerHTML = `
                        <input type="file" name="images[]" class="form-control me-2" required>
                        <input type="radio" name="primary_image" value="${index}">
                        <label class="ms-1">Primary</label>
                        <button type="button" class="btn btn-danger btn-sm ms-2 remove-image">×</button>
                    `;

            wrapper.appendChild(row);
        }
        function addSize() {
            let wrapper = document.getElementById('size-wrapper');
            let index = wrapper.children.length;

            let row = document.createElement('div');
            row.className = 'size-row mb-2 d-flex align-items-center gap-2';
            row.innerHTML = `
            <input type="text" name="sizes[]" class="form-control" placeholder="Size" required>
            <input type="number" step="0.01" name="prices[]" class="form-control" placeholder="Price" required>
            <input type="number" step="0.01" name="old_prices[]" class="form-control" placeholder="Old Price">
            <select name="stock[]" class="form-control">
                <option value="1">In Stock</option>
                <option value="0">Out Of Stock</option>
            </select>
            <select name="statuses[]" class="form-control">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <div class="form-check ms-2">
                <input type="radio" name="primary_size" class="form-check-input" value="${index}">
                <label class="form-check-label">Primary</label>
            </div>

            <button type="button" class="btn btn-danger btn-sm remove-size">×</button>
        `;
            wrapper.appendChild(row);
        }

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-size')) {
                e.target.closest('.size-row').remove();
            }
            if (e.target.classList.contains('remove-image')) {
                e.target.closest('.image-row').remove();
            }
        });

        function resetPrimaryIndexes() {
            document.querySelectorAll('#image-wrapper .image-row').forEach((row, index) => {
                row.querySelector('input[type="radio"]').value = index;
            });
        }


    </script>




@endpush