<?php

namespace App\Http\Controllers\Api;

use App\Models\Detail_Pesanan;
use App\Models\Pengeluaran;
use App\Models\Pesanan;
use App\Models\Produk;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Presensi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class laporanController extends Controller
{
    public function laporanPresensiGaji()
    {
        $laporan = [];
        
        $monthNames = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];

        for ($year = 2024; $year <= date('Y'); $year++) {
            for ($month = 1; $month <= 12; $month++) {
                $userPresensi = Presensi::with('user')
                    ->whereMonth('tanggal_presensi', $month)
                    ->whereYear('tanggal_presensi', $year)
                    ->get();

                foreach ($userPresensi as $presensi) {
                    $laporanKey = $presensi->user->id . '-' . $month . '-' . $year;
                    if (!isset($laporan[$laporanKey])) {
                        $laporan[$laporanKey] = [
                            'nama' => $presensi->user->nama,
                            'jumlah_hadir' => 31,
                            'jumlah_bolos' => 0,
                            'honor_harian' => 0,
                            'bonus_rajin' => 0,
                            'total' => 0,
                            'month' => $monthNames[$month],
                            'year' => $year
                        ];
                    }

                    if ($presensi->status_presensi === 'Bolos') {
                        $laporan[$laporanKey]['jumlah_bolos']++;
                        $laporan[$laporanKey]['jumlah_hadir']--;
                        if($laporan[$laporanKey]['jumlah_bolos'] > 4){
                            $laporan[$laporanKey]['bonus_rajin'] = 0;
                        }else{
                            $laporan[$laporanKey]['bonus_rajin'] = 250000 - ($laporan[$laporanKey]['jumlah_bolos'] * 50000);
                        }
                        

                    }

                    $laporan[$laporanKey]['honor_harian'] = $laporan[$laporanKey]['jumlah_hadir'] * $presensi->honor_harian;

                    $laporan[$laporanKey]['total'] = $laporan[$laporanKey]['honor_harian'] + $laporan[$laporanKey]['bonus_rajin'];
                }
            }
        }

        $mergedLaporan = array_values($laporan);

        if (count($mergedLaporan) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $mergedLaporan
            ], 200);
        }

        return response([
            'message' => 'Users Empty',
            'data' => null
        ], 400);
    }

    public function laporanPengeluaranPemasukkan()
    {
        $laporan = [];
        
        $monthNames = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];

        for ($year = 2024; $year <= date('Y'); $year++) {
            for ($month = 1; $month <= 12; $month++) {
                $pemasukkan = Pesanan::where('status_pesanan', 'Selesai')->whereMonth('tanggal_pesan', $month)
                ->whereYear('tanggal_pesan', $year)->get('total_harga');
                $pengeluaran = Pengeluaran::whereMonth('tanggal_pengeluaran', $month)
                ->whereYear('tanggal_pengeluaran', $year)->get();

                foreach ($pemasukkan as $pemasukkans) {
                    $penjualanKey = $pemasukkans->id . '-' . $month . '-' . $year;
                    if (!isset($laporan[$penjualanKey])) {
                        $laporan[$penjualanKey] = [
                            'detail' => 'Penjualan',
                            'Pemasukkan' => $pemasukkans->where('status_pesanan', 'Selesai')->sum('total_harga'),
                            'month' => $monthNames[$month],
                            'year' => $year
                        ];
                    }
                    
                    if ($pemasukkans->where('status_pesanan', 'Selesai')->sum('jumlah_tip') > 0) {
                        if (!isset($laporan[$penjualanKey . '-tip'])) {
                            $laporan[$penjualanKey . '-tip'] = [
                                'detail' => 'Tip',
                                'Pemasukkan' => $pemasukkans->where('status_pesanan', 'Selesai')->sum('jumlah_tip'),
                                'month' => $monthNames[$month],
                                'year' => $year
                            ];
                        }
                    }
                }
                
                foreach ($pengeluaran as $pengeluarans) {
                    $pengeluaranKey = $pengeluarans->id . '-' . $month . '-' . $year;
                    if (!isset($laporan[$pengeluaranKey])) {
                        $laporan[$pengeluaranKey] = [
                            'detail' => $pengeluarans->nama_pengeluaran,
                            'Pengeluaran' => $pengeluarans->total_pengeluaran,
                            'month' => $monthNames[$month],
                            'year' => $year
                        ];
                    }
                }
            }
        }
        

        $mergedLaporan = array_values($laporan);

        if (count($mergedLaporan) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $mergedLaporan
            ], 200);
        }

        return response([
            'message' => 'Users Empty',
            'data' => null
        ], 400);
    }

    public function laporanPenitip()
{
    $laporan = [];
    $monthNames = [
        1 => 'Januari',
        2 => 'Februari',
        3 => 'Maret',
        4 => 'April',
        5 => 'Mei',
        6 => 'Juni',
        7 => 'Juli',
        8 => 'Agustus',
        9 => 'September',
        10 => 'Oktober',
        11 => 'November',
        12 => 'Desember'
    ];

    for ($year = 2024; $year <= date('Y'); $year++) {
        for ($month = 1; $month <= 12; $month++) {
            // Filter pesanan based on month and year directly in the query
            $pesanan = Detail_Pesanan::with('produk.penitip', 'pesanan')
            ->get();
            $bulanPesan = $pesanan->pesanan->where('status_pesanan', 'Selesai')->whereMonth('tanggal_pesan', $month);

            
            foreach ($pesanan as $pesanans) {
                $pesananKey = $pesanans->id;
                if (!isset($laporan[$pesananKey]) && $pesanans->produk->penitip) {
                    $laporan[$pesananKey] = [
                        'id_penitip' => $pesanans->produk->penitip->id,
                        'nama_penitip' => $pesanans->produk->penitip->nama_penitip,
                        'nama_produk' => $pesanans->produk->nama_produk,
                        'jumlah_produk' => $pesanans->jmlh_produk,
                        'harga_produk' => $pesanans->produk->harga_produk,
                        'total' => $pesanans->jmlh_produk * $pesanans->produk->harga_produk,
                        'komisi' => $pesanans->jmlh_produk * $pesanans->produk->harga_produk * 0.2,
                        'terima' => $pesanans->jmlh_produk * $pesanans->produk->harga_produk - $pesanans->jmlh_produk * $pesanans->produk->harga_produk * 0.2,
                        'month' => $monthNames[$bulanPesan],
                        'year' => $year,
                    ];
                }
            }
        }
    }

    $mergedLaporan = array_values($laporan);

    if (count($mergedLaporan) > 0) {
        return response([
            'message' => 'Retrieve All Success',
            'data' => $mergedLaporan
        ], 200);
    }

    return response([
        'message' => 'Users Empty',
        'data' => null
    ], 400);
}


}
