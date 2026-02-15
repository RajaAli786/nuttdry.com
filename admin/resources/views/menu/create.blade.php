@extends('layouts.app')

@section('content')
    <div class="container">

        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Create Menu</div>
            </div>
            <div class="card-body">
                <form action="{{ route('menu.store') }}" method="POST">
                    @csrf

                    <div class="card-body">

                        <div class="mb-3">
                            <label class="form-label">Menu Title</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Slug / URL</label>
                            <input type="text" name="slug" class="form-control" placeholder="e.g. /about-us or route name">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Parent Menu</label>
                            <select name="parent_id" class="form-control">
                                <option value="">-- Main Menu --</option>
                                @foreach($mainMenus as $menu)
                                    <option value="{{ $menu->id }}">{{ $menu->title }}</option>
                                @endforeach
                            </select>
                            <small class="text-muted">Leave blank if this is a main menu</small>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Sort Order</label>
                            <input type="number" name="sort_order" class="form-control" value="0">
                        </div>

                        <div class="mb-3">
                            <label class="form-label d-block">Use In Footer</label>

                            <!-- <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="type1" value="1">
                                    <label class="form-check-label" for="type1">
                                        MOST LOVED CATEGORIES
                                    </label>
                                </div> -->

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type2" value="1">
                                <label class="form-check-label" for="type2">
                                    ABOUT NUTTDRY
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type3" value="2">
                                <label class="form-check-label" for="type3">
                                    SUPPORT
                                </label>
                            </div>

                            <!-- <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="type0" value="0" checked>
                                    <label class="form-check-label" for="type0">
                                        NONE
                                    </label>
                                </div> -->

                        </div>

                        <div class="mb-3">
                            <label class="form-label d-block">Page Type</label>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="page_type" id="type1" value="1" >
                                <label class="form-check-label" for="page_type1">
                                    Product Page
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="page_type" id="page_type2" value="2">
                                <label class="form-check-label" for="type3">
                                    Static Page
                                </label>
                            </div>
                        </div>


                        <h5 class="mt-4">SEO Settings</h5>

                            <div class="row">

                                <!-- Page Title -->
                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Page Title</label>
                                    <input type="text" name="page_title" value=""
                                        class="form-control">
                                </div>

                                <!-- Meta Keywords -->
                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Meta Keywords</label>
                                    <input type="text" name="meta_keyword" value=""
                                        class="form-control" placeholder="keyword1, keyword2, keyword3">
                                </div>

                                <!-- Meta Description -->
                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Meta Description</label>
                                    <textarea name="meta_description" rows="3"
                                        class="form-control"></textarea>
                                </div>

                            </div>

                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Save Menu</button>
                    </div>

                </form>
            </div>

        </div>

    </div>
@endsection