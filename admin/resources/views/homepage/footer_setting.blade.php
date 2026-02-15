@extends('layouts.app')

@section('content')
<div class="container">
<div class="card card-primary card-outline mb-4 col-md-12 my-5">
    <div class="card-header">
        <div class="card-title"><strong>Footer Settings</strong></div>
    </div>

    <form action="{{ route('footer-setting.save') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="card-body">

            {{-- Footer Logo --}}
            <div class="mb-3">
                <label class="form-label">Footer Logo</label>
                <input type="file" name="footer_logo" class="form-control">
                @if(!empty($setting->footer_logo))
                    <img src="{{ config('uploads.url') . '/' . $setting->footer_logo }}" width="120" class="mt-2">
                @endif
            </div>

            {{-- About Text --}}
            <div class="mb-3">
                <label class="form-label">About Text</label>
                <textarea name="about_text" rows="3" class="form-control">{{ $setting->about_text ?? '' }}</textarea>
            </div>

            {{-- Contact --}}
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label>Contact Number</label>
                    <input type="text" name="contact_number" value="{{ $setting->contact_number ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Email</label>
                    <input type="email" name="email" value="{{ $setting->email ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Address</label>
                    <input type="text" name="address" value="{{ $setting->address ?? '' }}" class="form-control">
                </div>
            </div>

            

            {{-- Social Links --}}
            <h5 class="mt-4">Social Links</h5>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label>Facebook</label>
                    <input type="text" name="facebook_link" value="{{ $setting->facebook_link ?? '' }}" class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                    <label>Instagram</label>
                    <input type="text" name="instagram_link" value="{{ $setting->instagram_link ?? '' }}" class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                    <label>YouTube</label>
                    <input type="text" name="youtube_link" value="{{ $setting->youtube_link ?? '' }}" class="form-control">
                </div>

                <div class="col-md-4 mb-3">
                    <label>Twitter</label>
                    <input type="text" name="twitter_link" value="{{ $setting->twitter_link ?? '' }}" class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                    <label>LinkedIn</label>
                    <input type="text" name="linkedin_link" value="{{ $setting->linkedin_link ?? '' }}" class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                    <label>WhatsApp</label>
                    <input type="text" name="whatsapp_number" value="{{ $setting->whatsapp_number ?? '' }}" class="form-control">
                </div>
                <div class="col-md-4 mb-3">
                    <label>Timings</label>
                    <input type="text" name="timings" value="{{ $setting->timings ?? '' }}" class="form-control">
                </div>
            </div>

            {{-- Footer Columns --}}
            <h5 class="mt-4">Footer Columns</h5>

            <div class="mb-3">
                <label>Column 1 Title</label>
                <input type="text" name="column1_title" value="{{ $setting->column1_title ?? '' }}" class="form-control">
            </div>
            <div class="mb-3">
                <label>Column 1 Links (comma separated)</label>
                <textarea name="column1_links" rows="2" class="form-control">{{ $setting->column1_links ?? '' }}</textarea>
            </div>

            <div class="mb-3">
                <label>Column 2 Title</label>
                <input type="text" name="column2_title" value="{{ $setting->column2_title ?? '' }}" class="form-control">
            </div>
            <div class="mb-3">
                <label>Column 2 Links</label>
                <textarea name="column2_links" rows="2" class="form-control">{{ $setting->column2_links ?? '' }}</textarea>
            </div>

            <div class="mb-3">
                <label>Column 3 Title</label>
                <input type="text" name="column3_title" value="{{ $setting->column3_title ?? '' }}" class="form-control">
            </div>
            <div class="mb-3">
                <label>Column 3 Links</label>
                <textarea name="column3_links" rows="2" class="form-control">{{ $setting->column3_links ?? '' }}</textarea>
            </div>

            <div class="mb-3">
                <label>Google Map Link</label>
                <input type="text" name="map_link" value="{{ $setting->map_link ?? '' }}" class="form-control" placeholder="https://www.google.com/maps/...">
            </div>

            {{-- Copyright --}}
            <div class="mb-3">
                <label>Copyright Text</label>
                <input type="text" name="copyright_text"
                    value="{{ $setting->copyright_text ?? '' }}"
                    class="form-control">
            </div>

        </div>

        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Save Settings</button>
        </div>

    </form>
</div>

</div>
@endsection

