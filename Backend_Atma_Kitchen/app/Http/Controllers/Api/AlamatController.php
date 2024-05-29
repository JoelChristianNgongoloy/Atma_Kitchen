<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Alamat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AlamatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();
        $idUser = Auth::user()->id;

        $validator = Validator::make($storeData, [
            'alamat_customer' => 'required',
            'kode_pos' => 'required',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 400);
        }

        $alamat = Alamat::create([
            'alamat_customer' => $storeData['alamat_customer'],
            'kode_pos' => $storeData['kode_pos'],
            'id_user' => $idUser
        ]);

        return response()->json([
            'message' => 'Berhasil Tambah Alamat',
            'data' => $alamat
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        $alamat = Alamat::where('id_user', $user->id)->get();
        $formatAlamat = $alamat->map(function ($item) {
            return [
                'id' => $item->id,
                'kode_pos' => $item->kode_pos,
                'alamat_customer' => $item->alamat_customer
            ];
        });

        return response([
            'message' => 'Produk ' . $user->name . ' Retrieved',
            'data' => $formatAlamat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
