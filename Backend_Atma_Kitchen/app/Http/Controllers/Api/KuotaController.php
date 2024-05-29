<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Produk;
use App\Models\Penitip;
use App\Models\Kuota;
use Illuminate\Mail\Mailables\Content;
use Carbon\Carbon;

class KuotaController extends Controller
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
    public function store(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'tanggal_kuota' => 'required|date',
            'loyang' => 'required|integer'
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $kuota = Kuota::create([
            'id_produk' => $id,
            'tanggal_kuota' => $request->tanggal_kuota,
            'loyang' => $request->loyang
        ]);

        return response([
            'message' => 'Kuota Created Successfully',
            'data' => $kuota
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function showKuota(string $id)
    {
        $kuota = Kuota::with('produk')->where('id_produk', $id)->get();

        if ($kuota->isNotEmpty()) {
            return response([
                'message' => 'Retrieve Kuota Success',
                'data' => $kuota
            ], 200);
        }

        return response([
            'message' => 'Kuota Not Found',
            'data' => null
        ], 404);
    }

    public function showKuotaWithDate(string $id)
    {
        $kuota = Kuota::with('produk')
            ->where('id_produk', $id)->whereDate('tanggal_kuota', '=', now()->setTimezone('Asia/Jakarta')->toDateString())
            ->get();

        if ($kuota->isNotEmpty()) {
            return response([
                'message' => 'Retrieve Kuota Success',
                'data' => $kuota
            ], 200);
        }

        return response([
            'message' => 'Kuota Not Found',
            'data' => null
        ], 404);
    }

    public function showKuotaWithDateThen(string $id)
    {
        $lusa = Carbon::now()->addDays(2)->setTimezone('Asia/Jakarta')->toDateString();

        $kuota = Kuota::with('produk')
            ->where('id_produk', $id)
            ->whereDate('tanggal_kuota', '=', $lusa)
            ->get();

        if ($kuota->isNotEmpty()) {
            return response([
                'message' => 'Retrieve Kuota Success',
                'data' => $kuota
            ], 200);
        }

        return response([
            'message' => 'Kuota Not Found',
            'data' => null
        ], 404);
    }

    public function showKuotaWithDateBesok(string $id)
    {
        $besok = Carbon::now()->addDays(1)->setTimezone('Asia/Jakarta')->toDateString();

        $kuota = Kuota::with('produk')
            ->where('id_produk', $id)
            ->whereDate('tanggal_kuota', '=', $besok)
            ->get();

        if ($kuota->isNotEmpty()) {
            return response([
                'message' => 'Retrieve Kuota Success',
                'data' => $kuota
            ], 200);
        }

        return response([
            'message' => 'Kuota Not Found',
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
