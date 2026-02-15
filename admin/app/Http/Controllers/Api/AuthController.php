<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        
        $request->validate([
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'phone' => 'required|digits_between:10,15|unique:users,phone',
            'password' => 'required|min:6'
        ]);
        
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
        ]);
        // dd($request->all());

        return response()->json([
            'status'  => true,
            'message' => 'User registered successfully',
            'user'    => $user
        ], 201);
    }

    public function login(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid username or password'],
            ]);
        }

        $token = $user->createToken("reactToken")->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => "Login successful",
            'token' => $token,
            'user'  => $user
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => "Logged out successfully"
        ]);
    }
}

?>