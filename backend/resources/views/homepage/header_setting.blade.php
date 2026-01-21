@extends('layouts.app')

@section('content')
<div class="container">
<div class="card card-primary card-outline mb-4 col-md-12 my-5">
    <div class="card-header">
        <div class="card-title"><strong>Header Settings</strong></div>
    </div>

    <form id="headerSettingForm" action="{{ route('header-setting.save') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="card-body">

            <div class="row">

                <!-- Logo -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Logo</label>
                    <input type="file" name="logo" class="form-control">
                    @if(!empty($setting->logo))
                        <img src="{{ asset($setting->logo) }}" class="mt-2" height="60">
                    @endif
                </div>

                <!-- Favicon -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Favicon</label>
                    <input type="file" name="favicon" class="form-control">
                    @if(!empty($setting->favicon))
                        <img src="{{ asset($setting->favicon) }}" class="mt-2" height="40">
                    @endif
                </div>

                <!-- Contact Number -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">Contact Number</label>
                    <input type="text" name="contact_number" value="{{ $setting->contact_number ?? '' }}" class="form-control">
                </div>

                <!-- Email -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" value="{{ $setting->email ?? '' }}" class="form-control">
                </div>

                <!-- Address -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">Address</label>
                    <input type="text" name="address" value="{{ $setting->address ?? '' }}" class="form-control">
                </div>

                <!-- Social Links -->
                <div class="col-md-4 mb-3">
                    <label class="form-label">Facebook Link</label>
                    <input type="text" name="facebook_link" value="{{ $setting->facebook_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">Instagram Link</label>
                    <input type="text" name="instagram_link" value="{{ $setting->instagram_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">YouTube Link</label>
                    <input type="text" name="youtube_link" value="{{ $setting->youtube_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">WhatsApp Number</label>
                    <input type="text" name="whatsapp_number" value="{{ $setting->whatsapp_number ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">LinkedIn Link</label>
                    <input type="text" name="linkedin_link" value="{{ $setting->linkedin_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label class="form-label">Twitter (X) Link</label>
                    <input type="text" name="twitter_link" value="{{ $setting->twitter_link ?? '' }}" class="form-control">
                </div>

                <!-- CTA Button -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">CTA Button Text</label>
                    <input type="text" name="cta_text" value="{{ $setting->cta_text ?? '' }}" class="form-control">
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label">CTA Button Link</label>
                    <input type="text" name="cta_link" value="{{ $setting->cta_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-12 mb-3">
                    <label class="form-label">Topbar Heading</label>
                    <input type="text" name="topbar_heding" value="{{ $setting->topbar_heding ?? '' }}" class="form-control">
                </div>

            </div> <!-- row end -->

            <hr>

            <!-- ============================= -->
            <!--        SEO SECTION            -->
            <!-- ============================= -->

            <h5 class="mt-4">SEO Settings</h5>

            <div class="row">

                <!-- Page Title -->
                <div class="col-md-12 mb-3">
                    <label class="form-label">Page Title</label>
                    <input type="text" name="page_title" value="{{ $setting->page_title ?? '' }}" class="form-control">
                </div>

                <!-- Meta Keywords -->
                <div class="col-md-12 mb-3">
                    <label class="form-label">Meta Keywords</label>
                    <input type="text" name="meta_keyword" value="{{ $setting->meta_keyword ?? '' }}" class="form-control" placeholder="keyword1, keyword2, keyword3">
                </div>

                <!-- Meta Description -->
                <div class="col-md-12 mb-3">
                    <label class="form-label">Meta Description</label>
                    <textarea name="meta_description" rows="3" class="form-control">{{ $setting->meta_description ?? '' }}</textarea>
                </div>

            </div>

        </div> <!-- card-body -->

        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Save Settings</button>
        </div>

    </form>
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