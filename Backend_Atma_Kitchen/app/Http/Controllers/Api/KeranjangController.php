<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Exception;
use App\Models\Keranjang;
use App\Models\Kuota;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $keranjang = Keranjang::inRandomOrder()->get();
        return response([
            'message' => 'Ini Keranjang mu',
            'data' => $keranjang
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $storeData = $request->all();
            $idUser = Auth::user()->id;
            $user = User::find($idUser);

            if (is_null($user)) {
                return response(['message' => "user Not Found"], 400);
            }

            $validator = Validator::make($storeData, [
                'jumlah_produks' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                return response(['message' => $validator->errors()], 400);
            }

            $existingProduk = Keranjang::where(['id_user' => $user->id, 'id_produk' => $storeData['id_produk']])->exists();

            if ($existingProduk) {
                return response()->json([
                    "message" => "Sudah ada di keranjang"
                ], 400);
            }

            $produk = Produk::find($storeData['id_produk']);

            $storeData['id_user'] = $idUser;
            $storeData['id_produk'] = $produk["id"];

            $keranjang = Keranjang::create($storeData);

            return response([
                'message' => 'Masuk Ke dalam Keranjang'
            ], 200);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        $keranjang = Keranjang::with('produk')->where('id_user', $user->id)->get();
        $formatKeranjang = $keranjang->map(function ($item) {
            return [
                'id' => $item->id,
                'produk' => $item->produk,
                'jumlah_produks' => $item->jumlah_produks
            ];
        });
        return response([
            'message' => 'Produk ' . $user->name . ' Retrieved',
            'data' => $formatKeranjang
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
