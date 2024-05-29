<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Presensi;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Validator;


class PresensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $presensi = Presensi::all();

        if (count($presensi) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $presensi
            ], 200);
        }

        return response([
            'message' => 'Presensi Empty',
            'data' => null
        ], 400);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData, [
            'tanggal_presensi' => 'required|date',
            'status_presensi' => 'required|in:Bolos, Masuk',
            'id_user' => 'required'
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $presensi = Presensi::create($storeData);

        if ($presensi->status_presensi == 'Bolos') {
            // Memperbarui jumlah bolos pada pegawai yang sesuai
            $pegawai = Pegawai::where('id_user', $presensi->id_user)->first();
            if (!is_null($pegawai)) {
                $pegawai->jumlah_bolos += 1;
                $pegawai->save();
            }
        }

        return response([
            'message' => 'Create Presensi Success',
            'data' => $presensi
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $presensi = Presensi::find($id);

        if (!is_null($presensi)) {
            return response([
                'message' => 'Presensi Found',
                'data' => $presensi
            ], 200);
        }

        return response([
            'message' => 'Presensi Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $presensi = Presensi::find($id);

        if (is_null($presensi)) {
            return response([
                'message' => 'Presensi not found',
                'data' => null
            ], 400);
        }

        $validate = Validator::make($updateData, [
            'tanggal_presensi' => 'date',
            'status_presensi' => 'in:Bolos,Masuk'
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        if ($presensi->status_presensi != $updateData['status_presensi'] && $updateData['status_presensi'] == 'Bolos') {
            // Memperbarui jumlah bolos pada pegawai yang sesuai
            $pegawai = Pegawai::where('id_user', $presensi->id_user)->first();
            if (!is_null($pegawai)) {
                $pegawai->jumlah_bolos += 1;
                $pegawai->save();
            }
        }

        $presensi->update($updateData);

        return response([
            'message' => 'Update Presensi Success',
            'data' => $presensi
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $presensi = Presensi::find($id);

        if (is_null($presensi)) {
            return response([
                'message' => 'Presensi Not Found',
                'data' => $presensi,
            ], 400);
        }

        if ($presensi->delete()) {
            return response([
                'message' => 'Delete Presensi Success',
                'data' => $presensi
            ], 200);
        }

        return response([
            'message' => 'Delete Presensi Failed',
            'data' => null
        ], 400);
    }
}
