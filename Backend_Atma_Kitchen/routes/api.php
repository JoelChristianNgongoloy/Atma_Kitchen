<?php

use App\Http\Controllers\Api\BahanBakuController;
use App\Http\Controllers\Api\ChangePasswordPegawaiController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\HampersController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PegawaiController;
use App\Http\Controllers\Api\PengadaanController;
use App\Http\Controllers\Api\PengeluaranController;
use App\Http\Controllers\Api\PenitipController;
use App\Http\Controllers\Api\PresensiController;
use App\Http\Controllers\Api\ProdukController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\ResepController;
use App\Http\Controllers\Api\ResetPasswordCustomerController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Middleware\Customer;

// use App\Http\Controllers\Api\LoginControllerController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/forgetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'forgetPassword'])->name('forget.password');
Route::post('/forgetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'forgetPasswordPost'])->name('forget.password.post');
Route::get('/resetPassword/{token}', [\App\Http\Controllers\Api\PasswordResetController::class, 'resetPassword'])->name('reset.password');
Route::post('/resetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'resetPasswordPost'])->name('reset.password.post');

Route::post('register', [RegisterController::class, 'register'])->name('register');
Route::get('register/verify/{verify_key}', [RegisterController::class, 'verify'])->name('verify');
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::post('logout', [LoginController::class, 'logout'])->name('logout');
// Route::post('/pegawai', [PegawaiController::class, 'store']);

Route::group(['middleware' => ['auth:api', 'owner']], function () {
    // Update Gaji dan Bonus
    Route::put('/pegawaiOwner/{id}', [PegawaiController::class, 'updateOwner']);
    Route::get('/pegawaiOwner', [PegawaiController::class, 'indexOwner']);
});
Route::group(['middleware' => ['auth:api', 'mo']], function () {
    Route::post('/change-password', [ChangePasswordPegawaiController::class, 'changePasswordPegawai']);

    // Pengeluaran
    Route::get('/pengeluaran', [PengeluaranController::class, 'index']);
    Route::post('/pengeluaran', [PengeluaranController::class, 'store']);
    Route::get('/pengeluaran/{id}', [PengeluaranController::class, 'show']);
    Route::put('/pengeluaran/{id}', [PengeluaranController::class, 'update']);
    Route::delete('/pengeluaran/{id}', [PengeluaranController::class, 'destroy']);

    // Pengadaan/Pembelian
    Route::get('/pembelian', [PengadaanController::class, 'index']);
    Route::post('/pembelian', [PengadaanController::class, 'store']);
    Route::get('/pembelian/{id}', [PengadaanController::class, 'show']);
    Route::put('/pembelian/{id}', [PengadaanController::class, 'update']);
    Route::delete('/pembelian/{id}', [PengadaanController::class, 'destroy']);
    Route::get('/pembelianBahan', [BahanBakuController::class, 'indexMuncul']);

    // Presensi
    Route::get('/presensi', [PresensiController::class, 'index']);
    Route::post('/presensi', [PresensiController::class, 'store']);
    Route::get('/presensi/{id}', [PresensiController::class, 'show']);
    Route::put('/presensi/{id}', [PresensiController::class, 'update']);
    Route::delete('/presensi/{id}', [PresensiController::class, 'destroy']);

    // role
    Route::get('/role', [RoleController::class, 'index']);
    Route::get('/rolePegawai', [RoleController::class, 'indexRolePegawai']);
    Route::post('/role', [RoleController::class, 'store']);
    Route::get('/role/{id}', [RoleController::class, 'show']);
    Route::put('/role/{id}', [RoleController::class, 'update']);
    Route::delete('/role/{id}', [RoleController::class, 'destroy']);


    // Pegawai
    Route::get('/pegawai', [PegawaiController::class, 'index']);
    Route::post('/pegawai', [PegawaiController::class, 'store']);
    Route::get('/pegawai/{id}', [PegawaiController::class, 'show']);
    Route::put('/pegawai/{id}', [PegawaiController::class, 'update']);
    Route::delete('/pegawai/{id}', [PegawaiController::class, 'destroy']);

    // Penitip
    Route::get('/penitip', [PenitipController::class, 'index']);
    Route::post('/penitip', [PenitipController::class, 'store']);
    Route::get('/penitip/{id}', [PenitipController::class, 'show']);
    Route::put('/penitip/{id}', [PenitipController::class, 'update']);
    Route::delete('/penitip/{id}', [PenitipController::class, 'destroy']);
});

Route::group(['middleware' => ['auth:api', 'admin']], function () {
    //produk
    Route::get('/produk', [ProdukController::class, 'index']);
    Route::get('/produkPenitip', [ProdukController::class, 'produkPenitip']);
    Route::post('/produk', [ProdukController::class, 'store']);
    Route::post('/produkPenitip', [ProdukController::class, 'storePenitip']);
    Route::get('/produk/{id}', [ProdukController::class, 'show']);
    Route::put('/produk/{id}', [ProdukController::class, 'update']);
    Route::delete('/produk/{id}', [ProdukController::class, 'destroy']);

    // Resep
    Route::get('/resep', [ResepController::class, 'index']);
    Route::post('/resep', [ResepController::class, 'store']);
    Route::get('/resep/{id}', [ResepController::class, 'show']);
    Route::put('/resep/{id}', [ResepController::class, 'update']);
    Route::delete('resep/{id}', [ResepController::class, 'destroy']);

    Route::get('/penitipByAdmin', [PenitipController::class, 'indexAdmin']);

    // hampers
    Route::get('/hampers', [HampersController::class, 'index']);
    Route::post('/hampers', [HampersController::class, 'store']);
    Route::get('/hampers/{id}', [HampersController::class, 'show']);
    Route::put('/hampers/{id}', [HampersController::class, 'update']);
    Route::delete('/hampers/{id}', [HampersController::class, 'destroy']);

    // Bahan Baku
    Route::get('/bahanBaku', [BahanBakuController::class, 'index']);
    Route::post('/bahanBaku', [BahanBakuController::class, 'store']);
    Route::get('/bahanBaku/{id}', [BahanBakuController::class, 'show']);
    Route::put('/bahanBaku/{id}', [BahanBakuController::class, 'update']);
    Route::delete('/bahanBaku/{id}', [BahanBakuController::class, 'destroy']);

    Route::get('/listCustomer', [CustomerController::class, 'index']);
});


Route::group(['middleware' => ['auth:api', 'customer']], function () {
    Route::get('/customer', [CustomerController::class, 'showProfile']);
    Route::put('/customer', [CustomerController::class, 'update']);

    // Route::post('reset/password/initiate', [ResetPasswordCustomerController::class, 'initiateResetPassword']);

    // Route::post('reset/password/{reset_key}', [ResetPasswordCustomerController::class, 'resetPassword']);
});
