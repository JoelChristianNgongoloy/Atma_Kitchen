<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Pesanan;

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

    public function uploadBuktiPembayaran(Request $request)
{
    $validate = Validator::make($request->all(), [
        'id_pesanan' => 'required|integer',
        'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($validate->fails()) {
        return response(['message' => $validate->errors()], 400);
    }

    $pesanan = Pesanan::find($request->id_pesanan);
    if (is_null($pesanan)) {
        return response(['message' => 'Order Not Found'], 404);
    }

    if ($request->hasFile('bukti_pembayaran')) {
        $uploadFolder = 'payments';
        $image = $request->file('bukti_pembayaran');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        if (!is_null($pesanan->bukti_pembayaran)) {
            Storage::disk('public')->delete('payments/' . $pesanan->bukti_pembayaran);
        }

        $pesanan->bukti_pembayaran = $uploadedImageResponse;
    }
    $pesanan->status_pesanan = 'Menunggu Konfirmasi Pembayaran';
    $pesanan->save();

    return response([
        'message' => 'Bukti Pembayaran ' . ($request->hasFile('bukti_pembayaran') ? 'Updated' : 'Uploaded') . ' Successfully',
        'data' => $pesanan,
    ], 200);
}
}
