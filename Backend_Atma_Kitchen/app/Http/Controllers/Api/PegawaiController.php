<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::whereNotNull('id_role')
            ->whereIn('id_role', [2, 3, 5])
            ->with(['Role'])
            ->get();

        if ($user->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $user
            ], 200);
        }

        return response([
            'message' => 'Pegawai Empty',
            'data' => null
        ], 400);
    }

    public function indexOwner()
    {
        $pegawai = Pegawai::with(['User'])->get();

        if (count($pegawai) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $pegawai,
            ], 200);
        }

        return response([
            'message' => 'Pegawai Empty',
            'data' => null
        ], 400);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();
        $str = Str::random(100);
        $validator = Validator::make($storeData, [
            'nama' => 'required',
            'username' => 'required',
            'password' => 'required|min:8',
            'tanggal_lahir' => 'required',
            'email' => 'required|email|unique:users,email',
            'id_role' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => $validator->errors()
            ], 400);
        }
        $storeData["password"] = Hash::make($storeData["password"]);
        $storeData["verify_key"] = $str;
        $storeData['active'] = 1;

        $user = User::create($storeData);

        $pegawai = Pegawai::create([
            'jumlah_bolos' => 0,
            'gaji_pegawai' => 0,
            'bonus_gaji' => 0,
            'id_user' => $user->id,
        ]);
        return response([
            'message' => 'Created Pegawai Success',
            'data' => $user
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where('id', $id)->whereIn('id_role', [1, 2, 3, 5])->first();

        if (!is_null($user)) {
            return response([
                'message' => 'Pegawai Found',
                'data' => $user,
            ], 200);
        }

        return response([
            'message' => 'Pegawai Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $pegawai = User::find($id);

        if (is_null($pegawai)) {
            return response([
                'message' => 'Pegawai Not Found',
                'data' => null
            ], 400);
        }

        $validator = Validator::make($updateData, [
            'nama' => 'max:60',
            'username' => 'min:8',
            'tanggal_lahir' => 'date',
            // 'email' => 'email|unique:users,email',
            'id_role' => 'required',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 400);
        }

        $pegawai->update($updateData);

        return response([
            'message' => 'Update Pegawai Success',
            'data' => $pegawai
        ], 200);
    }

    public function updateOwner(Request $request, string $id)
    {
        $updateData = $request->all();
        $pegawai = Pegawai::find($id);

        if (is_null($pegawai)) {
            return response([
                'message' => 'Pegawai Not Found',
                'data' => null
            ], 400);
        }

        // $validator = Validator::make($updateData, [
        //     'gaji_pegawai' => 'numeric',
        // ]);

        // if ($validator->fails()) {
        //     return response(['message' => $validator->errors()], 400);
        // }

        $pegawai->update($updateData);

        return response([
            'message' => 'Update Pegawai Success',
            'data' => $pegawai
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pegawai = User::find($id);

        if (is_null($pegawai)) {
            return response([
                'message' => 'Pegawai Not Found',
                'data' => null
            ], 400);
        }
        if ($pegawai->delete()) {
            return response([
                'message' => 'Delete Pegawai Success',
                'data' => $pegawai
            ], 200);
        }

        return response([
            'message' => 'Delete Pegawai Failed',
            'data' => null,
        ], 400);
    }
}
