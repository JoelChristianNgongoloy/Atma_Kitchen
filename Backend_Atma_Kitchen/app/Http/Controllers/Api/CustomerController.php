<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
}
