<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BahanBaku;
use Illuminate\Support\Facades\Validator;
use Symfony\Contracts\Service\Attribute\Required;

class BahanBakuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bahan_baku = BahanBaku::all();

        if (count($bahan_baku) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $bahan_baku,
            ], 200);
        }

        return response([
            'message' => 'Bahan Baku Not Found',
            'data' => null
        ], 400);
    }

    public function indexMuncul()
    {
        $bahan_baku = BahanBaku::all();

        if (count($bahan_baku) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $bahan_baku,
            ], 200);
        }

        return response([
            'message' => 'Bahan Baku Not Found',
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
            'nama_bahan_baku' => 'required|max:60',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 400);
        }

        $bahan_baku = BahanBaku::create($storeData);

        return response([
            'message' => 'Created Bahan Baku Success',
            'data' => $bahan_baku
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bahan_baku = BahanBaku::find($id);

        if (is_null($bahan_baku)) {
            return response([
                'message' => 'Bahan Baku Not Found',
                'data' => null
            ], 400);
        }

        return response([
            'message' => 'Bahan Baku Found',
            'data' => $bahan_baku,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $bahan_baku = BahanBaku::find($id);

        if (is_null($bahan_baku)) {
            return response([
                'message' => 'Bahan Baku Not Found',
                'data' => null
            ], 400);
        }

        // $validator = Validator::make($updateData, [
        //     'nama_bahan_baku' => 'max:60',
        // ]);

        $bahan_baku->update($updateData);

        return response([
            'message' => 'Update Bahan Baku Success',
            'data' => $bahan_baku,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bahan_baku = BahanBaku::find($id);

        if (is_null($bahan_baku)) {
            return response([
                'message' => 'Bahan Baku Not Found',
                'data' => null,
            ], 400);
        }

        if ($bahan_baku->delete()) {
            return response([
                'message' => 'Delete Bahan Baku Success',
                'data' => $bahan_baku,
            ], 200);
        }

        return response([
            'message' => 'Delete Bahan Baku Failed',
            'data' => null
        ], 400);
    }
}
