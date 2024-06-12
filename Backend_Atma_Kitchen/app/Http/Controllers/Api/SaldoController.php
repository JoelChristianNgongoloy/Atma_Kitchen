<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Saldo;
use Illuminate\Support\Facades\DB;

class SaldoController extends Controller
{
    public function index()
    {
        $saldo = Saldo::with('user')->get();

        if ($saldo->isNotEmpty()) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $saldo
            ], 200);
        }

        return response([
            'message' => 'Saldo Empty',
            'data' => null
        ], 404);
    }

    public function show($id)
    {
        $saldo = Customer::with('user')->where('id_user', $id)->get();

        if ($saldo->isNotEmpty()) {
            $idCustomer = $saldo->first()->id;

            return response([
                'message' => "Saldo found",
                'data' => $saldo,
                'id_customer' => $idCustomer
            ], 200);
        }

        return response([
            'message' => 'Saldo not found',
            'data' => null
        ], 404);
    }

    public function showHistory($id){
        $saldo = Saldo::where('id_customer', $id)->get();

        if ($saldo->isNotEmpty()) {
            return response([
                'message' => 'Retrieve History Success',
                'data' => $saldo
            ], 200);
        }

        return response([
            'message' => 'History Empty',
            'data' => null
        ], 404);
    }

    public function store(Request $request)
    {   
        $saldo = $request->all();
        $idUser = Auth::user()->id;
        $saldo = Customer::with('user')->where('id_user', $idUser)->get();

        if ($saldo->isNotEmpty()) {

            $saldo = Saldo::create([
                'id_customer' => $idUser,
                'tanggal_penarikan' => $request->tanggal_penarikan,
                'total_penarikan' => $request->total_penarikan,
                'status_penarikan' => 'Menunggu Konfirmasi'
            ]);

            return response([
                'message' => 'Saldo penarikan created',
                'data' => $saldo
            ], 201);
        }

        return response([
            'message' => 'Saldo not found',
            'data' => null
        ], 404);
    }

    public function updateAdmin($id)
    {
        $saldo = Saldo::find($id);

        if (is_null($saldo)) {
            return response([
                'message' => 'Saldo not found',
                'data' => null
            ], 404);
        }

        // Update status_penarikan
        $saldo->status_penarikan = 'Berhasil';
        $saldo->save();

        // Update saldo amount in the Customer table
        $customer = Customer::with('user')->where('id_user', $saldo->id_customer)->firstOrFail();
        $customer->saldo -= $saldo->total_penarikan;
        $customer->save();


        return response([
            'message' => 'Saldo updated',
            'data' => $saldo
        ], 200);
    }
}