<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Transaksi;

class TransaksiController extends Controller
{
    public function show($id)
    {
        $transaksi = Transaksi::with('pesanan.customer', 'pengembalian', 'produk')->where('id_pesanan', $id)->get();

        if ($transaksi->isNotEmpty()) {
            $idPesanan = $transaksi->first()->id_pesanan;

            return response([
                'message' => "Transaksi found",
                'data' => $transaksi,
                'id_pesanan' => $idPesanan
            ], 200);
        }

        return response([
            'message' => 'Transaksi not found',
            'data' => null
        ], 404);
    }
}
