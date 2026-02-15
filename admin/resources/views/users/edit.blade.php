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
            <div class="card-title">Edit User</div>
        </div>

        <div class="card-body">
            <form action="{{ route('users.update',$user->id) }}" method="POST">
                @csrf

                <input class="form-control mb-2" name="name" value="{{ $user->name }}">
                <input class="form-control mb-2" name="email" value="{{ $user->email }}">
                <input class="form-control mb-2" name="phone" value="{{ $user->phone }}">

                <select name="status" class="form-control mb-2">
                    <option value="1" {{ $user->status ? 'selected':'' }}>Active</option>
                    <option value="0" {{ !$user->status ? 'selected':'' }}>Deactive</option>
                </select>

                <button class="btn btn-primary">Update</button>
            </form>

        </div>
    </div>
</div>

@endsection