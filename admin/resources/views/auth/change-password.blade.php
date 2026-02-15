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
                <div class="card-title">Admin Profile</div>
            </div>

            <div class="card-body">
                <form method="POST" action="{{ route('profile') }}">
                    @csrf

                    <div class="row">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" name="name" value="{{ $userDetails->name }}" class="form-control" required>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="mb-3">
                            <label>Emal</label>
                            <input type="email" name="email" value="{{ $userDetails->email }}" class="form-control" required>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="mb-3">
                            <label>Phone</label>
                            <input type="tel" name="phone" value="{{ $userDetails->phone }}" class="form-control" required>
                        </div>
                    </div>

                    

                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>New Password</label>
                            <input type="password" name="new_password" class="form-control" required>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>Confirm New Password</label>
                            <input type="password" name="new_password_confirmation" class="form-control" required>
                        </div>
                    </div>
                    </div>

                    <div class="col-md-3 mx-auto">
                    <button class="btn btn-success w-100">Update Password</button>
                    </div>
                </form>

            </div>
        </div>
    </div>

@endsection