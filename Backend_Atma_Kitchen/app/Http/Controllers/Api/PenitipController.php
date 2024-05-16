<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penitip;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

// use function PHPUnit\Framework\isNull;

class PenitipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penitip = Penitip::all();

        if (count($penitip) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $penitip,
            ], 200);
        }

        return response([
            'message' => 'Penitip Empty',
            'data' => null
        ], 400);
    }

    public function indexAdmin()
    {
        $penitip = Penitip::all();

        if (count($penitip) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $penitip,
            ], 200);
        }

        return response([
            'message' => 'Penitip Empty',
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
            'nama_penitip' => 'required|max:60',
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $penitip = Penitip::create($storeData);
        return response([
            'message' => 'Created Penitip Success',
            'data' => $penitip,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penitip = Penitip::find($id);

        if (!is_null($penitip)) {
            return response([
                'message' => 'Penitip Found',
                'data' => $penitip,
            ], 200);
        }

        return response([
            'message' => 'Penitip Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $penitip = Penitip::find($id);

        if (is_null($penitip)) {
            return response([
                'message' => 'Penitip Not Found',
                'data' => null
            ], 400);
        }

        $validate = Validator::make($updateData, [
            'nama_penitip' => 'max:60',
        ]);

        $penitip->update($updateData);

        return response([
            'message' => 'Update Penitip Success',
            'data' => $penitip,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penitip = Penitip::find($id);

        if (is_null($penitip)) {
            return response([
                'message' => 'Penitip Not Found',
                'data' => null
            ]);
        }

        if ($penitip->delete()) {
            return response([
                'message' => 'Delete Penitip Success',
                'data' => $penitip,
            ], 200);
        }

        return response([
            'message' => 'Delete Produk Failed',
            'data' => null
        ], 400);
    }
}
