<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ChangePasswordPegawaiController extends Controller
{
    public function changePasswordPegawai(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail',
                'message' => $validator->errors()->first(),
            ], 405);
        }

        // Mendapatkan user yang sedang login
        $user = User::where('id', auth()->user()->id)->first();

        // Memeriksa kebenaran password lama
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Current password is incorrect.',
            ], 400);
        }

        // Mengubah password baru
        $user->password = Hash::make($request->new_password);

        $user->save(); // Simpan perubahan password baru

        return response()->json([
            'status' => 'success',
            'message' => 'Password has been changed successfully.',
        ], 200);
    }
}
