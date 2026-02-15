<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return redirect()->route('dashboard')->with('success', 'Login Successful');
        }

        return back()->with('error', 'Invalid Email or Password');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
    public function dashboard()
    {
        $userDetails = auth()->user(); 
        if (!$userDetails) {
            return redirect()->route('login');
        }
        return view('auth.dashboard', compact('userDetails'));

    }

    public function changePassword(Request $request)
    {
        // dd($request->all());
        if ($request->isMethod('get')) {
            return view('auth.change-password');
        }
        // dd($request->all());
        $request->validate([
            'new_password'     => 'required|min:6|confirmed',
        ]);

        $user = Auth::user();

        // if (!Hash::check($request->current_password, $user->password)) {
        //     return back()->with('error', 'Current password is incorrect');
        // }


        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->new_password_confirmation);
        $user->save();

        return back()->with('success', 'Password updated successfully');
    }

}
