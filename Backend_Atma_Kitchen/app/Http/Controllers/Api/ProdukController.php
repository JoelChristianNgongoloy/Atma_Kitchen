<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Produk;
use App\Models\Penitip;
use App\Models\Kuota;
use Illuminate\Support\Facades\Storage;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produk = Produk::whereDoesntHave('Penitip')->get();

        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
            'data' => null
        ], 400);
    }

    public function indexMobile()
    {
        $produk = Produk::whereDoesntHave('Penitip')->get();

        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
            'data' => null
        ], 400);
    }

    public function produkPenitip()
    {
        $produk = Produk::whereNotNull('id_penitip')->where('stok_produk', '>', 0)->with(['Penitip'])->get();

        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
            'data' => null
        ], 400);
    }

    public function produkCake()
    {
        $produk = Produk::where('type', "Cake")
            ->where('stok_produk', '>', 0) // Menambahkan pengecekan stok produk
            ->whereDoesntHave('Penitip')
            ->get();
        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
            'data' => null
        ], 400);
    }

    public function produkRoti()
    {
        $produk = Produk::where('type', "Roti")->where('stok_produk', '>', 0)->whereDoesntHave('Penitip')->get();

        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
            'data' => null
        ], 400);
    }

    public function produkMinuman()
    {
        $produk = Produk::where('type', "Minuman")->where('stok_produk', '>', 0)->whereDoesntHave('Penitip')->get();

        if ($produk->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $produk
            ], 200);
        }

        return response([
            'message' => 'Produk Empty',
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
            'nama_produk' => 'required|max:60',
            'stok_produk' => 'required',
            'deskripsi_produk' => 'required',
            'harga_produk' => 'required',
            'foto_produk' => 'required|image:jpeg,png,jpg,gif,svg|max:2048',
            'status_produk' => 'required|in:Pre Order,Ready Stock',
            'type' => 'required|in:Cake,Roti,Minuman',
            'loyang' => "in:1 Loyang,1/2 Loyang"
        ]);

        if ($validate->fails())
            return response(['message' => $validate->errors()], 400);

        $uploadFolder = 'produks';
        $image = $request->file('foto_produk');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        $storeData['foto_produk'] = $uploadedImageResponse;
        $produk = Produk::create($storeData);

        if ($storeData["status_produk"] === "Pre Order") {
            $kuota = Kuota::create([
                'id_produk' => $produk->id,
                'tanggal_kuota' => now()->setTimezone('Asia/Jakarta'),
                'loyang' => 10
            ]);
        }

        return response([
            'message' => 'Created Produk Success',
            'data' => $produk,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produk = Produk::find($id);

        if (!is_null($produk)) {
            return response([
                'message' => 'Produk Found',
                'data' => $produk,
            ], 200);
        }

        return response([
            'message' => 'Produk Not Found',
            'data' => null,
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $produk = Produk::find($id);

        if (is_null($produk)) {
            return response([
                'message' => 'Produk Not Found',
                'data' => null,
            ], 400);
        }

        $validate = Validator::make($updateData, [
            'nama_produk' => 'required|max:60',
            'deskripsi_produk' => 'required',
        ]);

        if ($validate->fails()) {
            return response([
                'message' => $validate->errors()
            ], 400);
        }

        // if ($request->hasFile('foto_produk')) {
        //     $uploadFolder = 'foto_produk';
        //     $image = $request->file('foto_produk');
        //     $image_uploaded_path = $image->store($uploadFolder, 'public');
        //     $uploadedImageResponse = basename($image_uploaded_path);
        //     Storage::disk('public')->delete('foto_produk/' . $produk->foto_produk);
        //     $updateData['foto_produk'] = $uploadedImageResponse;
        // }

        $produk->update($updateData);
        return response([
            'message' => 'Update Produk Success',
            'data' => $produk
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produk = Produk::find($id);

        if (is_null($produk)) {
            return response([
                'message' => 'Produk Not Found',
                'data' => null,
            ], 404);
        }

        if ($produk->delete()) {
            return response([
                'message' => 'Delete Produk Success',
                'data' => $produk,
            ], 200);
        }

        return response([
            'message' => 'Delete Produk Failed',
            'data' => null,
        ], 400);
    }

    /**
     * Search for products based on the given keyword.
     */
    public function search(Request $request)
    {
        $keyword = $request->input('keyword');

        // Validate keyword
        $validator = Validator::make(['keyword' => $keyword], [
            'keyword' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid keyword',
                'errors' => $validator->errors()
            ], 400);
        }

        $products = Produk::where('nama_produk', 'like', "%$keyword%")->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'No products found with the given keyword',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Products found with the given keyword',
            'data' => $products
        ], 200);
    }

    public function storePenitip(Request $request)
    {
        $storeDataPenitip = $request->all();
        $validate = Validator::make($storeDataPenitip, [
            'nama_produk' => 'required|max:60',
            'stok_produk' => 'required',
            'deskripsi_produk' => 'required',
            'harga_produk' => 'required',
            'foto_produk' => 'required|image:jpeg,png,jpg,gif,svg|max:2048',
            'status_produk' => 'required|in:Ready Stock',
            'id_penitip' => 'required',
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $uploadFolder = 'produks';
        $image = $request->file('foto_produk');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        $storeDataPenitip['foto_produk'] = $uploadedImageResponse;

        $penitip = Penitip::find($storeDataPenitip['id_penitip']);
        if (!$penitip) {
            return response(['message' => 'Penitip not found'], 404);
        }

        $storeDataPenitip['tanggal_menitip'] = $penitip->tanggal_menitip;

        $produkPenitip = Produk::create($storeDataPenitip);

        return response([
            'message' => 'Created Produk Penitip Success',
            'data' => $produkPenitip,
        ], 200);
    }
}
