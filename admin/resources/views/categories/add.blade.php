@extends('layouts.app')

@section('content')
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-primary card-outline mb-4 col-md-12 my-5">
                    <div class="card-header">
                        <div class="card-title">Category</div>
                    </div>

                    <form id="categoryForm" action="{{ route('categories.store') }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Category Name</label>
                                <input type="text" name="name" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" name="description" rows="3"></textarea>
                            </div>

                            <div class="input-group mb-3">
                                <input type="file" name="image" class="form-control" />
                                <label class="input-group-text">Upload</label>
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" value="1" name="is_home" class="form-check-input" />
                                <label class="form-check-label">This categories show on home page</label>
                            </div>
                        </div>

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
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