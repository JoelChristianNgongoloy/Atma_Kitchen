<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pesanan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class PesananController extends Controller
{
    public function indexKonfirm()
    {
        $orders = Pesanan::where('status_pesanan', 'Lunas')
                         ->whereNotNull('bukti_pembayaran')
                         ->get();

        return response()->json([
            'message' => 'List of orders to be confirmed fetched successfully',
            'data' => $orders
        ], 200);
    }

    public function updateStatus(Request $request)
{
    Log::info('Request files:', $request->allFiles());

    // Validate the incoming request
    $validatedData = $request->validate([
        'id_pesanan' => 'required|exists:pesanan,id_pesanan', // Ensure id_pesanan exists in the pesanan table
    ]);

    // Find the order by id_pesanan
    $order = Pesanan::find($validatedData['id_pesanan']);

    if ($order) {
        // Update the status_pesanan to 'Lunas'
        $order->status_pesanan = 'Lunas';
        $order->save();

        // Return a success response
        return response()->json([
            'message' => 'Order status updated successfully',
            'data' => $order
        ], 200);
    }

    // Return a not found response if order is not found
    return response()->json([
        'message' => 'Order not found',
        'data' => null
    ], 404);
}


}
