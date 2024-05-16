<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hampers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Detail_Hampers;

class HampersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hampers = Hampers::all();
        if (count($hampers) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $hampers,
            ], 200);
        }

        return response([
            'message' => 'Hampers Empty',
            'data' => null,
        ], 400);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData, [
            'nama_hampers' => 'required|max:60',
            'deskripsi_hampers' => 'required|max:255',
            'harga_hampers' => 'required',
            // 'gambar_hampers' => 'required|image:jpeg,png,jpg,gif,svg|max:2048',
            'stok_hampers' => 'required',
            'detail_hampers' => 'required|array',
            'detail_hampers.*.id_produk' => 'required|exists:produk,id'
        ]);

        if ($validate->fails())
            return response(['message' => $validate->errors()], 400);

        // $uploadFolder = 'gambar_hampers';
        // $image = $request->file('gambar_hampers');
        // $image_uploaded_path = $image->store($uploadFolder, 'public');
        // $uploadedImageResponse = basename($image_uploaded_path);

        // $storeData['gambar_hampers'] = $uploadedImageResponse;

        $hampers = Hampers::create($storeData);
        foreach ($storeData['detail_hampers'] as $detail) {
            Detail_Hampers::create([
                'id_hampers' => $hampers->id,
                'id_produk' => $detail['id_produk'],
            ]);
        }

        return response([
            'message' => 'Created Hampers Success',
            'data' => $hampers->load('detailHampers'),
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hampers = Hampers::find($id);

        if (!is_null($hampers)) {
            return response([
                'message' => 'Hampers Found',
                'data' => $hampers,
            ], 200);
        }

        return response([
            'message' => 'Hampers not found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $hampers = Hampers::find($id);

        if (is_null($hampers)) {
            return response([
                'message' => 'Hampers Not Found',
                'data' => null,
            ], 400);
        }

        // $validate = Validator::make($updateData, [
        //     'stok_hampers' => 'required',
        // ]);

        // if ($validate->fails()) {
        //     return response([
        //         'message' => $validate->errors(),
        //     ]);
        // }

        // if($request->hasFile('gambar_hampers')){
        //     $uploadFolder = 'gambar_hampers';
        //     $image = $request->file('gambar_hampers');
        //     $image_uploaded_path = $image->store($uploadFolder, 'public');
        //     $uploadedImageResponse = basename($image_uploaded_path);
        //     Storage::disk('public')->delete('gambar_hampers/' . $hampers->gambar_hampers);
        //     $updateData['gambar_produk'] = $uploadedImageResponse;
        // }

        $hampers->update($updateData);
        return response([
            'message' => 'Update Hampers Success',
            'data' => $hampers,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hampers = Hampers::find($id);

        if (is_null($hampers)) {
            return response([
                'message' => 'Hampers Not Found',
                'data' => null,
            ], 400);
        }

        if ($hampers->delete()) {
            return response([
                'message' => 'Delete Hampers Success',
                'data' => $hampers,
            ], 200);
        }
    }
}
