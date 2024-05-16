<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Lcobucci\JWT\Validation\ValidAt;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = Role::all();

        if (count($role) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $role
            ], 200);
        }

        return response([
            'messaege' => 'Role Empty',
            'data' => null
        ], 400);
    }

    public function indexRolePegawai()
    {
        $role = Role::whereIn('id', [2, 3, 5])->get();

        if (count($role) > 0) {
            return response([
                'message' => 'Retrieve All Success',
                'data' => $role
            ], 200);
        }

        return response([
            'messaege' => 'Role Empty',
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
            'jenis_role' => 'required|max:60'
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()], 400);
        }

        $role = Role::create($storeData);
        return response([
            'message' => 'Created Role Success',
            'data' => $role
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::find($id);

        if (!is_null($role)) {
            return response([
                'message' => 'Role Found',
                'data' => $role
            ], 200);
        }

        return response([
            'message' => 'Role Not Found',
            'data' => null
        ], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->all();
        $role = Role::find($id);

        if (is_null($role)) {
            return response([
                'message' => 'Role Not Found',
                'data' => null
            ], 400);
        }

        $validate = Validator::make($updateData, [
            'jenis_role' => 'max:60'
        ]);

        if ($validate->fails()) {
            return response([
                'message' => $validate->errors()
            ], 400);
        }

        $role->update($updateData);

        return response([
            'message' => 'Update Role Success',
            'data' => $role
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (is_null($role)) {
            return response([
                'message' => 'Role Not Found',
                'data' => null
            ], 400);
        }

        if ($role->delete()) {
            return response([
                'message' => 'Delete Role Success',
                'data' => $role,
            ], 200);
        }

        return response([
            'message' => 'Delete Role Success',
            'data' => null
        ], 400);
    }
}
