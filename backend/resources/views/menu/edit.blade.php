@extends('layouts.app')

@section('content')
    <div class="container">

        <div class="card card-primary card-outline mb-4 col-md-12 my-5">
            <div class="card-header">
                <div class="card-title">Edit Menu</div>
            </div>
            <div class="card-body">

                <form action="{{ route('menu.update', $menu->id) }}" method="POST">
                    @csrf

                    <div class="card-body">

                        <div class="mb-3">
                            <label class="form-label">Menu Title</label>
                            <input type="text" name="title" class="form-control" value="{{ $menu->title }}" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Slug / URL</label>
                            <input type="text" name="slug" class="form-control" value="{{ $menu->slug }}">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Parent Menu</label>
                            <select name="parent_id" class="form-control">
                                <option value="">-- Main Menu --</option>

                                @foreach($mainMenus as $main)
                                    <option value="{{ $main->id }}" {{ $menu->parent_id == $main->id ? 'selected' : '' }}>
                                        {{ $main->title }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Sort Order</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ $menu->sort_order }}">
                        </div>

                        <div class="mb-3">
                            @php
                                $selectedType = $menu->type ?? 0;
                            @endphp
                            <label class="form-label d-block">Use In Footer</label>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type1" value="1" {{ $selectedType == 1 ? 'checked' : '' }}>
                                <label class="form-check-label" for="type1">
                                    MOST LOVED CATEGORIES
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type2" value="2" {{ $selectedType == 2 ? 'checked' : '' }}>
                                <label class="form-check-label" for="type2">
                                    ABOUT NUTTDRY
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type3" value="3" {{ $selectedType == 3 ? 'checked' : '' }}>
                                <label class="form-check-label" for="type3">
                                    SUPPORT
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="type0" value="0" {{ $selectedType == 4 ? 'checked' : '' }}>
                                <label class="form-check-label" for="type0">
                                    NONE
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Update Menu</button>
                    </div>

                </form>

            </div>

        </div>

    </div>
@endsection