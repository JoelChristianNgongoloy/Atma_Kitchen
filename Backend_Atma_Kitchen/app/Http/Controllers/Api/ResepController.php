<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resep;
use App\Models\Produk;
use Illuminate\Support\Facades\Validator;

class ResepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resep = Resep::with(['Produk'])->get();
        if (count($resep) > 0) {
            return response([
                'message' => "Retrieved All Success",
                'data' => $resep
            ], 200);
        }
        return response([
            'message' => "Resep Empty",
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
            'nama_resep' => "required|max:60",
            'id_produk' => 'required',
        ]);

        if ($validate->fails())
            return response(['message' => $validate->errors()], 400);

        $produk = Produk::find($storeData['id_produk']);

        if (!$produk) {
            return response(['message' => 'Produk not found'], 404);
        }

        $resep = Resep::create($storeData);

        return response([
            'message' => 'Created Resep Success',
            'data' => $resep
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $resep = Resep::find($id);
        if (!$resep) {
            return response()->json(['message' => 'Resep not found'], 404);
        }
        return response()->json(['data' => $resep]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $resep = Resep::find($id);
        if (!$resep) {
            return response()->json(['message' => 'Resep not found', "data" => null], 404);
        }

        $validate = Validator::make($updateData, [
            'nama_resep' => 'string',
            'id_produk' => 'required',
        ]);

        if ($validate->fails()) {
            return response([
                'message' => $validate->errors(),
            ], 400);
        }

        $produk = Produk::find($updateData['id_produk']);

        if (!$produk) {
            return response(['message' => 'Produk not found'], 404);
        }

        $resep->update($request->all());
        return response([
            'message' => 'Update Resep Success',
            'data' => $resep
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $resep = Resep::find($id);

        if (is_null($resep)) {
            return response([
                'message' => 'Resep Not Found',
                'data' => null,
            ], 400);
        }

        if ($resep->delete()) {
            return response([
                'message' => 'Delete resep Success',
                'data' => $resep,
            ], 200);
        }
    }

    public function search(Request $request)
    {
        $request->validate([
            'search' => 'required|string',
        ]);

        $searchTerm = $request->input('search');

        $resep = Resep::where0('nama_resep', 'LIKE', "%{$searchTerm}%")->get();

        return response()->json(['data' => $resep]);
    }
}
