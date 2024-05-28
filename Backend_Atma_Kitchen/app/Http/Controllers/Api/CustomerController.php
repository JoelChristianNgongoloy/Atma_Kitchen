<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Pesanan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('id_role', 4)->get();

        if (count($user) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $user
            ], 200);
        }

        return response([
            'message' => 'Users Empty',
            'data' => null
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->first();
        $updateData = $request->all();

        if ($user) {
            $validate = Validator::make($updateData, [
                'nama' => 'max:60',
                'tanggal_lahir' => 'date'
            ]);

            if ($validate->fails()) {
                return response([
                    'status' => 'fail',
                    'message' => $validate->errors(),
                ], 400);
            }

            $user->update($updateData);
            return response([
                'message' => 'Success Update User',
                'data' => $user
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function showProfile()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'message' => 'Success',
                'data' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'User not Logged in',
            'data' => null
        ], 400);
    }

    public function showPesananById(int $id)
    {
        $pesanan = Pesanan::where('id_pesanan', $id)
                        ->get();

        return response([
            'status' => 'success',
            'data' => $pesanan
        ], 200);
    }

    public function uploadBuktiPembayaran(Request $request)
{
    // Validation rules for storing and updating
    $validate = Validator::make($request->all(), [
        'id_pesanan' => 'required|integer',
        'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($validate->fails()) {
        return response(['message' => $validate->errors()], 400);
    }

    // Retrieve the order
    $pesanan = Pesanan::find($request->id_pesanan);
    if (is_null($pesanan)) {
        return response(['message' => 'Order Not Found'], 404);
    }

    // Handle file upload if file is present
    if ($request->hasFile('bukti_pembayaran')) {
        $uploadFolder = 'payments';
        $image = $request->file('bukti_pembayaran');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        // Delete the old bukti_pembayaran from storage if exists
        if (!is_null($pesanan->bukti_pembayaran)) {
            Storage::disk('public')->delete('payments/' . $pesanan->bukti_pembayaran);
        }

        // Set the new bukti_pembayaran
        $pesanan->bukti_pembayaran = $uploadedImageResponse;
    }

    // Save the changes
    $pesanan->save();

    return response([
        'message' => 'Bukti Pembayaran ' . ($request->hasFile('bukti_pembayaran') ? 'Updated' : 'Uploaded') . ' Successfully',
        'data' => $pesanan,
    ], 200);
}


    public function showPesanan()
    {
        $pesanan = Pesanan::where('id_customer', auth()->user()->id)
                        ->get();

        return response([
            'status' => 'success',
            'data' => $pesanan
        ], 200);
    }

    public function store(Request $request)
    {
        Log::info('Request files:', $request->allFiles());
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }
        $idUser = Auth::user()->id;
        $user = User::find($idUser);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found'
            ],404);
        }
        $uploadFolder = 'pesanan';
        $image = $request->file('bukti_pembayaran');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        $storeData['bukti_pembayaran'] = $uploadedImageResponse;
        $storeData['id_user'] = $user->id;

        $contents = Pesanan::create($storeData);
        return response([
            'message' => 'Content Added Successfully',
            'data' => $contents,
        ],200);
    }

}
