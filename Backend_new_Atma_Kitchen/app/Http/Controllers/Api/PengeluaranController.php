<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Pengeluaran;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengeluaran = Pengeluaran::all();

        if (count($pengeluaran) > 0) {
            return response([
                'message' => 'Retrieved All Success',
                'data'  => $pengeluaran,
            ], 200);
        }

        return response([
            'message' => 'Pengeluaran Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();

        $validator = Validator::make($storeData, [
            'nama_pengeluaran' => 'required|max:60',
            'tanggal_pengeluaran' => 'required',
            'total_pengeluaran' => 'required',
            'qty_pengeluaran' => 'required',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 400);
        }

        $pengeluaran = Pengeluaran::create($storeData);

        return response([
            'message' => 'Created Pengeluaran Success',
            'data' => $pengeluaran,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pengeluaran = Pengeluaran::find($id);

        if (!is_null($pengeluaran)) {
            return response([
                'message' => 'Pengeluaran Found',
                'data' => $pengeluaran
            ], 200);
        }

        return response([
            'message' => 'Pengeluaran Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();

        $pengeluaran = Pengeluaran::find($id);

        if(is_null($pengeluaran)){
            return response([
                'message' => 'Pengeluaran Not Found',
                'data' => null
            ], 400);
        }

        $pengeluaran->update($updateData);

        return response([
            'message' => 'Update Pengeluaran Success',
            'data' => $pengeluaran,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pengeluaran = Pengeluaran::find($id);

        if(is_null($pengeluaran)) {
            return response([
                'message' => 'Pengeluaran Not Found',
                'data' => $pengeluaran,
            ], 400);
        }

        if($pengeluaran->delete()){
            return response([
                'message' => 'Delete Pengeluaran Success',
                'data' => $pengeluaran
            ], 200);
        }
    }
}
