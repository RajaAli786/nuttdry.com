@extends('layouts.app')

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

    @if ($errors->any())
        <script>
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                html: `{!! implode('<br>', $errors->all()) !!}`
            });
        </script>
    @endif

    <div class="container">
        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Add Product</div>
            </div>

            <div class="card-body">
                <form action="{{ route('product.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label">Product Name</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">SKU</label>
                        <input type="text" name="sku" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Price</label>
                        <input type="number" step="0.01" name="price" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Old Price</label>
                        <input type="number" step="0.01" name="old_price" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Rating</label>
                        <select name="rating" class="form-control">
                            <option value="">Select Rating</option>
                            <option value="1">⭐ 1</option>
                            <option value="2">⭐⭐ 2</option>
                            <option value="3">⭐⭐⭐ 3</option>
                            <option value="4">⭐⭐⭐⭐ 4</option>
                            <option value="5">⭐⭐⭐⭐⭐ 5</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Tax Title</label>
                        <input type="text" step="1" name="tax_title" class="form-control" placeholder="Tax Title">
                    </div>

                    <div class="mb-3">
                        <label>Tax</label>
                        <input type="number" step="1" name="tax" class="form-control" placeholder="10%">
                    </div>


                    <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select name="category_id" class="form-control">
                            <option value="">Select</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Menu</label>
                        <select name="menu_id" class="form-control">
                            <option value="">Select</option>
                            @foreach($menus as $menu)
                                <option value="{{ $menu->id }}">{{ $menu->title }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Featured</label>
                        <select name="is_featured" class="form-control">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Top</label>
                        <select name="is_top" class="form-control">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>

                    <!-- <div class="mb-3">
                                            <label class="form-label">Discount (%)</label>
                                            <input type="number" step="0.01" name="discount" class="form-control">
                                        </div> -->

                    <div class="mb-3">
                        <label>Product Tag</label>
                        <input type="text" name="tags" class="form-control" placeholder="e.g:- Best Seller">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Coupon Code</label>
                        <input type="text" name="coupon_code" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Coupon Discount</label>
                        <input type="number" step="0.01" name="coupon_discount" class="form-control">
                    </div>

                    {{-- PRODUCT IMAGES --}}
                    <div class="mb-3">
                        <label>Product Images</label>

                        <div id="image-wrapper">
                            <div class="image-row mb-2 d-flex align-items-center">
                                <input type="file" name="images[]" class="form-control me-2" required>
                                <input type="radio" name="primary_image" value="0" checked>
                                <label class="ms-1">Primary</label>
                            </div>
                        </div>

                        <button type="button" class="btn btn-sm btn-secondary mt-2" onclick="addImage()">Add Image</button>
                    </div>

                    <div class="mb-3">
                        <label>Product Sizes & Prices</label>
                        <div id="size-wrapper">
                            <div class="size-row mb-2 d-flex align-items-center gap-2">
                                <input type="text" name="sizes[]" class="form-control" placeholder="Size (e.g., S, M, L)"
                                    required>
                                <input type="number" step="0.01" name="prices[]" class="form-control" placeholder="Price"
                                    required>
                                <input type="number" step="0.01" name="old_prices[]" class="form-control"
                                    placeholder="Old Price">
                                
                                    <select name="stock[]" class="form-control">
                                        <option value="1">In Stock</option>
                                        <option value="0">Out Of Stock</option>
                                    </select>

                                <select name="statuses[]" class="form-control">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>

                                <div class="form-check ms-2">
                                    <input type="radio" name="primary_size" class="form-check-input" value="0" checked>
                                    <label class="form-check-label">Primary</label>
                                </div>

                                <button type="button" class="btn btn-danger btn-sm remove-size">×</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm btn-secondary mt-2" onclick="addSize()">Add Size</button>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-control">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Short Description</label>
                        <textarea name="short_description" class="form-control" rows="3"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="5"></textarea>
                    </div>

                    <h5>SEO SECTION</h5>
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" name="meta_title" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Keyword</label>
                        <input type="text" name="meta_keyword" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <input type="text" name="meta_description" class="form-control">
                    </div>


                    <button class="btn btn-primary">Save Product</button>
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

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-image')) {
                e.target.closest('.image-row').remove();
                resetPrimaryIndexes();
            }
        });

        function resetPrimaryIndexes() {
            document.querySelectorAll('#image-wrapper .image-row').forEach((row, index) => {
                row.querySelector('input[type="radio"]').value = index;
            });
        }


        // Sises
        function addSize() {
            let wrapper = document.getElementById('size-wrapper');

            let row = document.createElement('div');
            row.className = 'size-row mb-2 d-flex align-items-center gap-2';
            row.innerHTML = `
            <input type="text" name="sizes[]" class="form-control" placeholder="Size (e.g., S, M, L)" required>
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
                <input type="radio" name="primary_size" class="form-check-input" value="0" checked>
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
        });
    </script>
@endpush