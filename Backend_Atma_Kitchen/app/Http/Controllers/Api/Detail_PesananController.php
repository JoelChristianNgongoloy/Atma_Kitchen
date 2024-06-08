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
use App\Models\BahanBaku;
use App\Models\Detail_Pengadaan;


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

    public function laporanPenggunaanBahanBaku(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        // Ambil data pesanan yang memenuhi kriteria status dan rentang tanggal
        $pesanan = Pesanan::whereIn('status_pesanan', ['Selesai', 'Siap di pick up', 'Sedang dikirim', 'Dikonfirmasi', 'Diproses'])
            ->whereBetween('tanggal_pesan', [$validated['tanggal_mulai'], $validated['tanggal_selesai']])
            ->with('detailPesanan.detailResep.bahanBaku') // Eager loading untuk detail resep dan bahan baku
            ->get();

        if ($pesanan->isEmpty()) {
            return response()->json(['message' => 'Tidak ada pesanan dengan status yang sesuai dan rentang tanggal yang dipilih'], 404);
        }

        $result = [];

        foreach ($pesanan as $p) {
            $detail_penggunaan_bahan = [];

            foreach ($p->detailPesanan as $dp) {
                foreach ($dp->detailResep as $detailResep) {
                    $bahan_baku = BahanBaku::find($detailResep->id_bahan_baku);
                    $satuan = $detailResep->satuan;
                    $jumlah = $detailResep->jumlah;

                    $detail_penggunaan_bahan[] = [
                        'nama_bahan_baku' => $bahan_baku ? $bahan_baku->nama_bahan_baku : null,
                        'satuan' => $satuan,
                        'jumlah' => $jumlah,
                    ];
                }
            }

            $result[] = [
                'id_pesanan' => $p->id,
                'jumlah_produk' => $p->jumlah_produk,
                'total_harga' => $p->total_harga,
                'status_pesanan' => $p->status_pesanan,
                'tanggal_pesan' => $p->tanggal_pesan,
                'tanggal_kirim' => $p->tanggal_kirim,
                'id_customer' => $p->id_customer,
                'bukti_pembayaran' => $p->bukti_pembayaran,
                'id_alamat' => $p->id_alamat,
                'jenis_pengantaran' => $p->jenis_pengantaran,
                'jarak_pengiriman' => $p->jarak_pengiriman,
                'ongkos_kirim' => $p->ongkos_kirim,
                'jumlah_tip' => $p->jumlah_tip,
                'tanggal_diproses' => $p->tanggal_diproses,
                'detail_penggunaan_bahan' => $detail_penggunaan_bahan
            ];
        }

        return response()->json(['message' => 'Daftar Pesanan dengan Bahan Baku yang Digunakan', 'data' => $result], 200);
    }
}
