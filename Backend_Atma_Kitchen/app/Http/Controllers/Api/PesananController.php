<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alamat;
use App\Models\Detail_Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Auth;
use App\Models\Pesanan;
use App\Models\Produk;
use App\Models\Kuota;
use App\Models\Keranjang;
use App\Models\Transaksi;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use App\Models\Promo_Poin;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $storeData = $request->all();
        $idUser = Auth::user()->id;
        $user = User::find($idUser);

        $validator = Validator::make($storeData, [
            'jumlah_produk' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 400);
        }

        $produk = Produk::find($storeData["id_produk"]);
        if ($produk['stok_produk'] === 0) {
            return response()->json(['message' => 'Maaf, stok produk ' . $produk->nama_produk . ' sudah habis'], 400);
        }
        $total_harga = $produk->harga_produk * $storeData["jumlah_produk"];

        $pesanan = Pesanan::create([
            'jumlah_produk' => $storeData["jumlah_produk"],
            'total_harga' => $total_harga,
            'status_pesanan' => "Pending",
            'tanggal_pesan' =>  now()->setTimezone('Asia/Jakarta')->format('Y-m-d'),
            'tanggal_kirim' => null,
            'id_customer' => $idUser,
            'bukti_pembayaran' => "",
            'id_alamat' => $storeData["id_alamat"] ?? null,
            'jenis_pengantaran' => ""
        ]);

        $detail_pesan = Detail_Pesanan::create([
            'id_produk' => $produk['id'],
            'id_pesanan' => $pesanan->id,
            'jmlh_produk' => $storeData["jumlah_produk"]
        ]);

        return response()->json([
            'message' => 'Silahkan masuk ke detail pemesanan',
            'data' => $detail_pesan->id_pesanan
        ], 200);
    }

    public function inputAlamat(Request $request, string $id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $storeData = $request->all();

        // Lakukan validasi
        $validator = Validator::make($storeData, [
            'jenis_pengantaran' => "required|in:Di antar,Ambil Sendiri",
            'id_alamat' => ($storeData['jenis_pengantaran'] == 'Di antar') ? 'required' : '',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        if ($storeData['jenis_pengantaran'] == 'Di antar') {
            $pesanan->id_alamat = $storeData['id_alamat'];
        } else {
            $pesanan->id_alamat = null;
        }

        $pesanan->jenis_pengantaran = $storeData['jenis_pengantaran'];
        $pesanan->jarak_pengiriman = -1;
        $pesanan->save();

        return response()->json([
            'message' => 'Alamat pengantaran berhasil disimpan',
            'data' => $pesanan,
        ], 200);
    }



    public function storeByKeranjang(Request $request)
    {
        $request->validate([
            'produk_ids' => 'required|array',
            'produk_ids.*' => 'exists:produk,id',
        ]);

        DB::beginTransaction();

        try {
            $user = Auth::user();
            $tanggalPesan = now();
            $statusPesanan = 'Pending';

            $produkIds = $request->input('produk_ids');
            $jumlahProduk = 0;
            $totalHarga = 0;

            foreach ($produkIds as $id) {
                $keranjangItem = Keranjang::where('id_user', $user->id)->where('id_produk', $id)->first();
                $produk = Produk::find($id);

                $jumlahProduk += $keranjangItem->jumlah_produks;
                $totalHarga += $keranjangItem->jumlah_produks * $produk->harga_produk;
            }

            $pesanan = Pesanan::create([
                'jumlah_produk' => $jumlahProduk,
                'total_harga' => $totalHarga,
                'status_pesanan' => $statusPesanan,
                'tanggal_pesan' => $tanggalPesan,
                'id_customer' => $user->id,
                'bukti_pembayaran' => "",
                'jenis_pengantaran' => ""
            ]);

            foreach ($produkIds as $id) {
                $detail_pesan = Detail_Pesanan::create([
                    'id_produk' => $id,
                    'id_pesanan' => $pesanan->id,
                    'jmlh_produk' => $keranjangItem->jumlah_produks,
                ]);

                Keranjang::where('id_user', $user->id)->where('id_produk', $id)->delete();
            }

            DB::commit();

            return response()->json(['message' => 'Pesanan berhasil dibuat', 'data' => $pesanan->id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    public function toPesan(Request $request, string $id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $customerId = $pesanan->id_customer;

        $updateData = $request->all();

        $validator = Validator::make($updateData, []);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $customerId = $pesanan->id_customer;
        $promoPoin = Promo_Poin::where('id_customer', $customerId)->first();

        $jumlahPromo = $request->input('jumlah_promo');
        if (!$promoPoin || $promoPoin->jumlah_promo < $jumlahPromo) {
            return response()->json(['message' => 'Poin promo tidak mencukupi'], 400);
        }

        $totalHarga = $pesanan->total_harga;
        $diskon = $jumlahPromo * 100;
        $totalHargaSetelahDiskon = $totalHarga - $diskon;
        $promoPoin->jumlah_promo -= $jumlahPromo;
        $promoPoin->save();

        $pesanan->total_harga = $totalHargaSetelahDiskon;
        $pesanan->status_pesanan = "Sudah Dikonfirmasi";
        $pesanan->save();

        $detailPesanan = Detail_Pesanan::where('id_pesanan', $pesanan->id)->get();
        foreach ($detailPesanan as $detail) {
            $produk = Produk::findOrFail($detail->id_produk);
            $jumlahProdukDipesan = $detail->jmlh_produk;
            if ($produk->status_produk === 'Ready Stock') {
                $produk->stok_produk -= $jumlahProdukDipesan;
                $produk->save();
            } elseif ($produk->status_produk === 'Pre Order') {
                $kuota = Kuota::where('id_produk', $produk->id)->first();
                if ($kuota) {
                    $kuota->loyang -= $jumlahProdukDipesan;
                    $kuota->save();
                }
            }
        }

        foreach ($detailPesanan as $details) {
            $produk = Produk::findOrFail($details->id_produk);
            // $jumlahProdukDipesan = $detail->jmlh_produk; 
            if ($produk->status_produk === 'Ready Stock') {

                $waktu_sekarang = Carbon::now('Asia/Jakarta');
                $tanggal_format = $waktu_sekarang->format('d/m/Y H:i');
                $poinBaru = $this->calculatePoin($totalHargaSetelahDiskon, $customerId);
                $promoPoin->jumlah_promo += $poinBaru;
                $no_nota = $waktu_sekarang->format('y.m.') . $pesanan->id;

                Transaksi::create([
                    'id_pesanan' => $pesanan->id,
                    'tanggal_transaksi' => $tanggal_format,
                    'jumlah_transaksi' => $pesanan->jumlah_produk,
                    'poin_didapatkan' => $poinBaru,
                    'status_transaksi' => 'berhasil',
                    'id_produk' => $produk->id,
                    'poin_now' => $promoPoin->jumlah_promo,
                    'no_nota' => $no_nota,
                ]);
            } elseif ($produk->status_produk === 'Pre Order') {
                $kuota = Kuota::where('id_produk', $produk->id)->first();
                if ($kuota) {
                    $waktu_sekarang = Carbon::now('Asia/Jakarta');
                    $tanggal_format = $waktu_sekarang->format('d/m/Y H:i');
                    $poinBaru = $this->calculatePoin($totalHargaSetelahDiskon, $customerId);
                    $promoPoin->jumlah_promo += $poinBaru;
                    $no_nota = $waktu_sekarang->format('d.m.y') . $pesanan->id;

                    Transaksi::create([
                        'id_pesanan' => $pesanan->id,
                        'tanggal_transaksi' => $tanggal_format,
                        'jumlah_transaksi' => $pesanan->jumlah_produk,
                        'poin_didapatkan' => $poinBaru,
                        'status_transaksi' => 'berhasil',
                        'id_produk' => $produk->id,
                        'poin_now' => $promoPoin->jumlah_promo,
                        'no_nota' => $no_nota,

                    ]);
                }
            }
        }

        $poinBaru = $this->calculatePoin($totalHargaSetelahDiskon, $customerId);
        $promoPoin->jumlah_promo += $poinBaru;
        $promoPoin->save();

        return response()->json(['message' => 'Pesanan berhasil diperbarui', 'pesanan' => $pesanan], 200);
    }

    private function calculatePoin($totalHarga, $customerId)
    {
        $poin = 0;
        if ($totalHarga >= 1000000) {
            $poin = 200;
        } elseif ($totalHarga >= 500000) {
            $poin = 75;
        } elseif ($totalHarga >= 100000) {
            $poin = 15;
        } elseif ($totalHarga >= 10000) {
            $poin = 1;
        }

        $customer = User::findOrFail($customerId);
        $today = Carbon::now();
        $birthday = Carbon::parse($customer->tanggal_lahir);
        if ($today->between($birthday->copy()->subDays(3), $birthday->copy()->addDays(3))) {
            $poin *= 2;
        }

        return $poin;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
