<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produk;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Detail_Pesanan;
use App\Models\Pesanan;
use App\Models\User;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class Detail_PesananController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $detail_pesanan = Detail_Pesanan::with('produk', 'pesanan')->find($id);

        if (!is_null($detail_pesanan)) {
            $idPesanan = $detail_pesanan->pesanan->id;
            return response([
                'message' => "Detail pesanan found",
                'data' => $detail_pesanan,
                'id_pesanan' => $idPesanan
            ], 200);
        }

        return response([
            'message' => 'Detail pesanan not found',
            'data' => null
        ], 404);
    }

    public function showByCustomer(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $pesanan = $user->pesanan()->with('detailPesanan.produk')->get();

        return response()->json([
            'Message' => "Success",
            'Pesanan' => $pesanan,
        ], 200);
    }

    public function showinputAlamat(string $id)
    {
        $detail_pesanan = Detail_Pesanan::with('produk', 'pesanan')->where('id_pesanan', $id)->get();

        if ($detail_pesanan->isNotEmpty()) {
            $idPesanan = $detail_pesanan->first()->id_pesanan;

            return response([
                'message' => "Detail pesanan found",
                'data' => $detail_pesanan,
                'id_pesanan' => $idPesanan
            ], 200);
        }

        return response([
            'message' => 'Detail pesanan not found',
            'data' => null
        ], 404);
    }

    public function showDetailByKeranjang(string $id)
    {
        $detail_pesanan = Detail_Pesanan::with('produk', 'pesanan')->where('id_pesanan', $id)->get();

        if ($detail_pesanan->isNotEmpty()) {
            $idPesanan = $detail_pesanan->first()->id_pesanan;

            return response([
                'message' => "Detail pesanan found",
                'data' => $detail_pesanan,
                'id_pesanan' => $idPesanan
            ], 200);
        }

        return response([
            'message' => 'Detail pesanan not found',
            'data' => null
        ], 404);
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
