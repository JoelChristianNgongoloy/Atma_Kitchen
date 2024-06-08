<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produk;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Detail_Pesanan;
use App\Models\Detail_Resep;
use App\Models\Pencatatan_Bahan_Baku;
use App\Models\Pesanan;
use App\Models\User;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


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

    public function showDaftarPesanan()
    {
        $pesanan = Pesanan::where('status_pesanan', 'DiKonfirmasi')->get();

        if ($pesanan->isEmpty()) {
            return response([
                'message' => 'Tidak ada pesanan dengan status DiKonfirmasi',
                'data' => null
            ], 400);
        }

        $result = [];

        foreach ($pesanan as $p) {
            $detail_pesanan = Detail_Pesanan::where('id_pesanan', $p->id)->get();

            $detail_resep = [];

            foreach ($detail_pesanan as $dp) {
                $resep = Detail_Resep::whereHas('resep', function ($query) use ($dp) {
                    $query->where('id_produk', $dp->id_produk);
                })->get();

                $detail_resep_with_bahan_baku = [];

                foreach ($resep as $r) {
                    $detail_pengadaan = $r->detailPengadaan;
                    $bahan_baku = $detail_pengadaan->bahanBaku;
                    $pengadaan = $detail_pengadaan->pengadaan;

                    $jumlah_bahan_baku_dibutuhkan = $r->jumlah;
                    $stok_bahan_baku = $detail_pengadaan->jumlah_bahan_baku;
                    $warning = $stok_bahan_baku < $jumlah_bahan_baku_dibutuhkan ? "(WARNING: STOK $stok_bahan_baku)" : "";

                    $detail_resep_with_bahan_baku[] = [
                        'id' => $r->id,
                        'id_detail_pengadaan' => $r->id_detail_pengadaan,
                        'id_resep' => $r->id_resep,
                        'jumlah' => $jumlah_bahan_baku_dibutuhkan,
                        'jumlah_bahan_baku' => $stok_bahan_baku,
                        'satuan' => $r->satuan,
                        'bahan_baku' => $bahan_baku ? $bahan_baku->nama_bahan_baku : null,
                        'warning' => $warning,
                        'harga_pengadaan' => $pengadaan ? $pengadaan->harga_pengadaan : null,
                        'tanggal_pengadaan' => $pengadaan ? $pengadaan->tanggal_pengadaan : null,
                    ];
                }

                // Ambil nama produk
                $produk = Produk::find($dp->id_produk);
                $nama_produk = $produk ? $produk->nama_produk : null;

                $detail_resep[] = [
                    'id_detail_pesanan' => $dp->id,
                    'id_produk' => $dp->id_produk,
                    'nama_produk' => $nama_produk,
                    'jmlh_produk' => $dp->jmlh_produk,
                    'resep' => $detail_resep_with_bahan_baku
                ];
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
                'detail_pesanan' => $detail_resep
            ];
        }

        return response([
            'message' => 'Daftar Pesanan dengan Status DiKonfirmasi',
            'data' => $result
        ], 200);
    }



    // public function showDaftarPesanan()
    // {
    //     $pesanan = Pesanan::where('status_pesanan', 'DiKonfirmasi')->get();

    //     if ($pesanan->isEmpty()) {
    //         return response([
    //             'message' => 'Tidak ada pesanan dengan status DiKonfirmasi',
    //             'data' => null
    //         ], 400);
    //     }

    //     $result = [];

    //     foreach ($pesanan as $p) {
    //         $detail_pesanan = Detail_Pesanan::where('id_pesanan', $p->id)->get();

    //         $detail_resep = [];

    //         foreach ($detail_pesanan as $dp) {

    //             $resep = Detail_Resep::whereHas('resep', function ($query) use ($dp) {
    //                 $query->where('id_produk', $dp->id_produk);
    //             })->get();

    //             $detail_resep_with_bahan_baku = [];

    //             foreach ($resep as $r) {
    //                 $detail_pengadaan = $r->detailPengadaan;
    //                 $bahan_baku = $detail_pengadaan->bahanBaku;
    //                 $pengadaan = $detail_pengadaan->pengadaan;

    //                 $detail_resep_with_bahan_baku[] = [
    //                     'id' => $r->id,
    //                     'id_detail_pengadaan' => $r->id_detail_pengadaan,
    //                     'id_resep' => $r->id_resep,
    //                     'jumlah' => $r->jumlah,
    //                     'jumlah_bahan_baku' => $detail_pengadaan->jumlah_bahan_baku,
    //                     'satuan' => $r->satuan,
    //                     'bahan_baku' => $bahan_baku ? $bahan_baku->nama_bahan_baku : null,
    //                     'harga_pengadaan' => $pengadaan ? $pengadaan->harga_pengadaan : null,
    //                     'tanggal_pengadaan' => $pengadaan ? $pengadaan->tanggal_pengadaan : null,
    //                 ];
    //             }

    //             // Ambil nama produk
    //             $produk = Produk::find($dp->id_produk);
    //             $nama_produk = $produk ? $produk->nama_produk : null;

    //             $detail_resep[] = [
    //                 'id_detail_pesanan' => $dp->id,
    //                 'id_produk' => $dp->id_produk,
    //                 'nama_produk' => $nama_produk, 
    //                 'jmlh_produk' => $dp->jmlh_produk,
    //                 'resep' => $detail_resep_with_bahan_baku
    //             ];
    //         }

    //         $result[] = [
    //             'id_pesanan' => $p->id,
    //             'jumlah_produk' => $p->jumlah_produk,
    //             'total_harga' => $p->total_harga,
    //             'status_pesanan' => $p->status_pesanan,
    //             'tanggal_pesan' => $p->tanggal_pesan,
    //             'tanggal_kirim' => $p->tanggal_kirim,
    //             'id_customer' => $p->id_customer,
    //             'bukti_pembayaran' => $p->bukti_pembayaran,
    //             'id_alamat' => $p->id_alamat,
    //             'jenis_pengantaran' => $p->jenis_pengantaran,
    //             'jarak_pengiriman' => $p->jarak_pengiriman,
    //             'ongkos_kirim' => $p->ongkos_kirim,
    //             'jumlah_tip' => $p->jumlah_tip,
    //             'tanggal_diproses' => $p->tanggal_diproses,
    //             'detail_pesanan' => $detail_resep
    //         ];
    //     }

    //     return response([
    //         'message' => 'Daftar Pesanan dengan Status DiKonfirmasi',
    //         'data' => $result
    //     ], 200);
    // }


    /**
     * Update the specified resource in storage.
     */
    public function update(string $id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $detail_pesanan = Detail_Pesanan::where('id_pesanan', $pesanan->id)->get();
        $today = Carbon::now('Asia/Jakarta')->toDateString();

        foreach ($detail_pesanan as $dp) {
            $resep = Detail_Resep::whereHas('resep', function ($query) use ($dp) {
                $query->where('id_produk', $dp->id_produk);
            })->get();

            foreach ($resep as $r) {
                $detail_pengadaan = $r->detailPengadaan;

                if ($detail_pengadaan->jumlah_bahan_baku < $r->jumlah) {
                    return response([
                        'message' => 'Bahan baku kurang',
                        'data' => null
                    ], 400);
                }
            }
        }

        foreach ($detail_pesanan as $dp) {
            $resep = Detail_Resep::whereHas('resep', function ($query) use ($dp) {
                $query->where('id_produk', $dp->id_produk);
            })->get();

            foreach ($resep as $r) {
                $detail_pengadaan = $r->detailPengadaan;

                $detail_pengadaan->jumlah_bahan_baku -= $r->jumlah;
                $detail_pengadaan->save();

                $pencatatan = Pencatatan_Bahan_Baku::where('id_bahan_baku', $detail_pengadaan->id_bahan_baku)
                    ->where('tanggal_cetak', $today)
                    ->first();

                if ($pencatatan) {
                    $pencatatan->jumlah += $r->jumlah;
                    $pencatatan->save();
                } else {
                    Pencatatan_Bahan_Baku::create([
                        'id_bahan_baku' => $detail_pengadaan->id_bahan_baku,
                        'jumlah' => $r->jumlah,
                        'satuan' => $r->satuan,
                        'tanggal_cetak' => $today
                    ]);
                }
            }
        }

        $pesanan->status_pesanan = 'Di Proses';
        $pesanan->save();

        return response([
            'message' => 'Pesanan berhasil diproses',
            'data' => $pesanan
        ], 200);
    }

    public function getDetailPesananByBulanTahun(Request $request)
    {
        $bulan = $request->input('bulan'); // Get the month name as a string
        $tahun = $request->input('tahun'); // Get the year as a number

        // Convert month name to numeric value
        $bulanNumerik = $this->convertBulanNamaToNumerik($bulan);

        // Construct the month-year string
        $monthYear = $tahun . '-' . $bulanNumerik;

        // Start with an empty array to store detail_pesanan data
        $detailPesananData = [];

        // Query to get existing detail_pesanan records
        $existingDetailPesanan = Detail_Pesanan::join('pesanan', 'pesanan.id', '=', 'detail_pesanan.id_pesanan')
            ->join('produk', 'produk.id', '=', 'detail_pesanan.id_produk')
            ->where('pesanan.tanggal_pesan', 'like', '%' . $monthYear . '%')
            ->where('pesanan.status_pesanan', 'Selesai')
            ->select('detail_pesanan.*', 'produk.nama_produk')
            ->get();

        foreach ($existingDetailPesanan as $pesanan) {
            $existingProductIndex = array_search($pesanan->id_produk, array_column($detailPesananData, 'id_produk'));

            if ($existingProductIndex !== false) {
                $detailPesananData[$existingProductIndex]['jmlh_produk'] += $pesanan->jmlh_produk;
            } else {
                $detailPesananData[] = [
                    'id_produk' => $pesanan->id_produk,
                    'nama_produk' => $pesanan->nama_produk,
                    'harga_produk' => $pesanan->harganya, // Ambil harga dari kolom harganya di tabel detail_pesanan
                    'jmlh_produk' => $pesanan->jmlh_produk,
                ];
            }
        }

        if (empty($detailPesananData)) {
            return response()->json([
                'message' => 'Tidak ada pesanan ditemukan untuk bulan ' . $bulan . ' tahun ' . $tahun,
                'bulan' => $bulan,
                'tahun' => $tahun,
            ], 404);
        }

        // Return the processed detail_pesanan data
        return response()->json([
            'message' => 'Detail Pesanan',
            'data' => $detailPesananData,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ], 200);
    }



    private function convertBulanNamaToNumerik($bulanNama)
    {
        // Create an associative array mapping month names to numeric values
        $bulanMap = [
            'Januari' => '01',
            'Februari' => '02',
            'Maret' => '03',
            'April' => '04',
            'Mei' => '05',
            'Juni' => '06',
            'Juli' => '07',
            'Agustus' => '08',
            'September' => '09',
            'Oktober' => '10',
            'November' => '11',
            'Desemeber' => '12',
        ];

        // Return the numeric value for the given month name
        return isset($bulanMap[$bulanNama]) ? $bulanMap[$bulanNama] : null;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
