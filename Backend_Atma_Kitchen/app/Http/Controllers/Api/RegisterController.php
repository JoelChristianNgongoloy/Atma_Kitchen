<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\MailSend;
use App\Models\Customer;
use App\Models\Promo_Poin;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            $str = Str::random(100);

            $registerData = $request->all();

            $validator = Validator::make($registerData, [
                'nama' => 'required|max:60',
                'username' => 'required|unique:users',
                'password' => 'required|min:8',
                'tanggal_lahir' => 'required|date',
                'email' => 'required|email|unique:users,email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "status" => "fail",
                    "message" => $validator->errors()->first(),
                ], 400);
            }

            $registerData["password"] = Hash::make($registerData["password"]);
            $registerData["verify_key"] = $str;
            $registerData["id_role"] = 4;

            $user = User::create($registerData);

            $user['id_role'] = 4;

            $customer = Customer::create([
                'saldo' => 0,
                'poin' => 0,
                'id_user' => $user->id,
            ]);

            Promo_Poin::create([
                'jumlah_promo' => 0,
                'deskripsi_promo' => 'Pakaikan Promo Poin Anda',
                'id_customer' => $user->id,
            ]);

            $details = [
                "nama_customer" => $registerData["nama"],
                "username" => $registerData["username"],
                "website" => "Atma Kitchen",
                "tanggal_register" => date("Y-m-d H:i:s"),
                "url" => 'http://127.0.0.1:8000/api/register/verify/' . $str
            ];

            Mail::to($registerData['email'])->send(new MailSend($details));

            return response()->json([
                'status' => 'success',
                'message' => 'Register Success',
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'Register Error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function verify($verify_key)
    {
        $keyCheck = User::select('verify_key')->where('verify_key', $verify_key)->exists();

        if ($keyCheck) {
            $user = User::where('verify_key', $verify_key)
                ->update([
                    'active' => 1,
                    'email_verified_at' => date('Y-m-d H:i:s'),
                ]);

            return "verifikasi Berhasil. Akun anda sudah aktif";
        } else {
            return "keys tidak Valid.";
        }
    }
}