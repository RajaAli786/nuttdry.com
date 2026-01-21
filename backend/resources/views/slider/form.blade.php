@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card card-primary card-outline mb-4 col-md-12 my-5">
        <div class="card-header">
            <div class="card-title"><strong>{{ isset($slider) ? 'Edit Slider' : 'Add Slider' }}</strong></div>
        </div>

        <form action="{{ isset($slider) ? route('sliders.update',$slider->id) : route('sliders.store') }}" method="post"
            enctype="multipart/form-data">

            @csrf
            <div class="card-body">
                <div class="mb-3">
                    <label>Title</label>
                    <input type="text" class="form-control" name="title" value="{{ $slider->title ?? '' }}">
                </div>

                <div class="mb-3">
                    <label>Subtitle</label>
                    <textarea class="form-control" name="subtitle">{{ $slider->subtitle ?? '' }}</textarea>
                </div>

                <div class="mb-3">
                    <label>Button Text</label>
                    <input type="text" class="form-control" name="button_text" value="{{ $slider->button_text ?? '' }}">
                </div>

                <div class="mb-3">
                    <label>Button Link</label>
                    <input type="text" class="form-control" name="button_link" value="{{ $slider->button_link ?? '' }}">
                </div>

                <div class="mb-3">
                    <label>Sort Order</label>
                    <input type="number" class="form-control" name="sort_order" value="{{ $slider->sort_order ?? 0 }}">
                </div>

                <div class=" mb-3">
                    <label>Status</label>
                    <select name="status" class="form-control">
                        <option value="1" {{ isset($slider) && $slider->status ? 'selected' : '' }}>Active</option>
                        <option value="0" {{ isset($slider) && !$slider->status ? 'selected' : '' }}>Inactive</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label>Slider Image</label>
                    <input type="file" name="image" class="form-control">
                    @if(isset($slider))
                    <img src="{{ asset($slider->image) }}" width="120" class="mt-2">
                    @endif
                </div>

                <button type="submit" class="btn btn-success">
                    {{ isset($slider) ? 'Update' : 'Save' }}
                </button>
            </div>
        </form>
    </div>

</div>
@endsection