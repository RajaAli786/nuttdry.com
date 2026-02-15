@extends('layouts.app')

@section('content')
<div class="container my-5">

    <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>User List</h2>
        </div>

    <div class="card">
        <div class="card-body table-responsive">

            <table class="table table-bordered table-hover align-middle dataTable">
                <thead class="table-dark">
                    <tr>
                        <th>Sr.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Registered On</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($users as $key => $user)
                        <tr>
                            <td>{{ $users->firstItem() + $key }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->phone }}</td>
                            <td>{{ $user->created_at->format('d M Y') }}</td>
                            <td>
                                @if($user->status)
                                    <a href="{{ route('users.status',$user->id) }}"
                                    class="badge bg-success">Active</a>
                                @else
                                    <a href="{{ route('users.status',$user->id) }}"
                                    class="badge bg-danger">Deactive</a>
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('users.edit',$user->id) }}"
                                class="btn btn-sm btn-warning">Edit</a>

                                <form action="{{ route('users.delete',$user->id) }}"
                                    method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-sm btn-danger"
                                        onclick="return confirm('Delete this user?')">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center">No Users Found</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>

            <!-- {{ $users->links() }} -->

        </div>
    </div>
</div>
@endsection
