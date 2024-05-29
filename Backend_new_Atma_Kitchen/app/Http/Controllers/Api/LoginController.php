<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    //
    public function login(Request $request)
    {
        try {

            $loginData = $request->all();

            $validate = Validator::make($loginData, [
                'email' => 'required|email:rfc,dns|email',
                'password' => 'required|min:8',
            ]);

            if ($validate->fails()) {
                return response(['message' => $validate->errors()->first()], 400);
            }

            if (Auth::attempt($loginData)) {
                $user = Auth::user();

                if ($user->active) {
                    $token = $user->createToken("Authentication Token")->accessToken;

                    $userDataResponse = [
                        'id' => $user->id,
                        'nama' => $user->nama,
                        'tanggal_lahir' => $user->tanggal_lahir,
                        'email' => $user->email,
                        'verify_key' => $user->verify_key,
                        'active' => $user->active,
                        'email_verified_at' => $user->email_verified_at,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                        'id_role' => $user->id_role
                    ];

                    return response()->json([
                        "status" => "success",
                        "message" => "Authenticated",
                        "token" => $token,
                        "token_type" => 'Bearer',
                        "data" => $userDataResponse,
                        'user' => $user
                    ], 200);
                } else {
                    Auth::logout();
                    return response()->json([
                        "status" => "fail",
                        "message" => "Akun anda belum diverifikasi. Tolong cek email anda.",
                    ], 400);
                }
            } else {
                return response()->json([
                    "status" => "fail",
                    "message" => "Email atau Password anda salah",
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => "Error",
                "message" => $e->getMessage()
            ], 400);
        }
    }

    public function logout()
    {
        Auth::logout();

        // Setelah logout, kita perlu memeriksa apakah pengguna telah benar-benar logout
        if (!Auth::check()) {
            return response()->json([
                "status" => "success",
                "message" => "Berhasil Logout"
            ], 200);
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Gagal Logout"
            ], 500);
        }
    }
}
