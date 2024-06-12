<?php

namespace App\Http\Controllers;

use App\Models\Detail_Pengadaan;
use Illuminate\Http\Request;
use App\Models\Pencatatan_Bahan_Baku;
use Carbon\Carbon;

class PencatatanBahanBakuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $today = Carbon::now('Asia/Jakarta')->toDateString();
        $detailPengadaan = Detail_Pengadaan::with(['bahanBaku'])->get();
        if (count($detailPengadaan) > 0) {
            return response([
                'message' => "Laporan Bahan Baku",
                'tanggal' => $today,
                'data' => $detailPengadaan
            ], 200);
        }
        return response([
            'message' => "Belum Ada Pencatatan Bahan Baku untuk hari ini",
            'data' => null
        ], 400);
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
        //
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
