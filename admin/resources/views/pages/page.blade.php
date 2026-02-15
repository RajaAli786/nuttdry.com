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
                <div class="card-title">{{ isset($page) ? 'Edit Page' : 'Add Page' }}</div>
            </div>

            <div class="card-body">

                <form method="POST" action="{{ isset($page) ? route('pages.update', $page->id) : route('pages.store') }}"
                    enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label>Menu</label>
                        <select name="menu_id" class="form-control required">
                            <option value="">Select Menu</option>
                            @foreach($menus as $menu)
                                <option value="{{ $menu->id }}" {{ isset($page) && $page->menu_id == $menu->id ? 'selected' : '' }}>
                                    {{ $menu->title }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <!-- <div class="mb-3">
                        <label>Title</label>
                        <input type="text" name="title" class="form-control" value="{{ $page->title ?? old('title') }}"
                            required>
                    </div> -->


                    <div class="mb-3">
                        <label>Content</label>
                        <textarea name="content" class="form-control editor" rows="6">{{ $page->content ?? old('content') }}</textarea>
                    </div>

                    <div class="mb-3">
                        <label>Status</label>
                        <select name="status" class="form-control">
                            <option value="1" {{ isset($page) && $page->status == 1 ? 'selected' : '' }}>Active</option>
                            <option value="0" {{ isset($page) && $page->status == 0 ? 'selected' : '' }}>Inactive</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        {{ isset($page) ? 'Update' : 'Create' }}
                    </button>
                </form>

            </div>
        </div>
    </div>


@endsection

@push('scripts')
<script src="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function () {

        CKEDITOR.config.versionCheck = false;

        document.querySelectorAll('.editor').forEach(function(el) {
            CKEDITOR.replace(el, {
                filebrowserUploadUrl: "{{ route('ckeditor.upload') }}?_token={{ csrf_token() }}",
                filebrowserUploadMethod: 'form'
            });
        });

    });
</script>

@endpush