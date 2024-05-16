<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class PasswordResetController extends Controller
{
    function forgetPassword()
    {
        return view('Auth.Password.resetPassword');
    }

    function forgetPasswordPost(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $token = Str::random(64);

        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        Mail::send("Auth.Email.forgetPassword", ['token' => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Reset password');
        });

        return redirect()->route('forget.password')->with('success', 'Reset password link has been sent to your email');
    }

    function resetPassword($token)
    {
        return view('Auth.Password.newPassword', compact('token'));
    }


    function resetPasswordPost(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        $passwordReset = DB::table('password_reset_tokens')->where([
            'email' => $request->email,
            'token' => $request->token
        ])->first();

        if (!$passwordReset) {
            return redirect()->route('reset.password')->with('error', 'Invalid!');
        }

        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_reset_tokens')->where([
            'email' => $request->email
        ])->delete();

        return redirect()->route('/customer')->with('success', 'Password has been changed successfully');
    }
}
