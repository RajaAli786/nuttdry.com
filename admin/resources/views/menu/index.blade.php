@extends('layouts.app')

@section('content')
    <div class="container my-5">
        <div class="d-flex justify-content-between mb-3">
            <h3>Menu List</h3>
            <a href="{{ route('menu.create') }}" class="btn btn-primary btn-sm">Add Menu</a>
        </div>
        <div class="card card-outline">

            <div class="card-body">

                <ul class="list-group">
                    @foreach($menus as $menu)
                        <li class="list-group-item d-flex justify-content-between align-items-center">

                            <div>
                                <strong>{{ $menu->title }}</strong>

                                @if($menu->children->count())
                                    <ul class="mt-2 ms-4">
                                        @foreach($menu->children as $child)
                                            <li class="d-flex justify-content-between w-100">
                                                <span>— {{ $child->title }}</span>

                                                <span>
                                                    <a href="{{ route('menu.edit', $child->id) }}"
                                                        class="btn btn-warning btn-sm">Edit</a>
                                                    <form action="{{ route('menu.delete', $child->id) }}" method="POST"
                                                        class="d-inline">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button onclick="return confirm('Are you sure?')"
                                                            class="btn btn-danger btn-sm">Delete</button>
                                                    </form>
                                                </span>
                                            </li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>

                            <span>
                                <a href="{{ route('menu.edit', $menu->id) }}" class="btn btn-warning btn-sm">Edit</a>
                                <form action="{{ route('menu.delete', $menu->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button onclick="return confirm('Are you sure?')"
                                        class="btn btn-danger btn-sm">Delete</button>
                                </form>
                            </span>

                        </li>
                    @endforeach
                </ul>

            </div>

        </div>

    </div>
@endsection