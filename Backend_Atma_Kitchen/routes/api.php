<?php

use App\Http\Controllers\Api\AlamatController;
use App\Http\Controllers\Api\BahanBakuController;
use App\Http\Controllers\Api\ChangePasswordPegawaiController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\Detail_PesananController;
use App\Http\Controllers\Api\HampersController;
use App\Http\Controllers\Api\KeranjangController;
use App\Http\Controllers\Api\KuotaController;
use App\Http\Controllers\Api\laporanController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PegawaiController;
use App\Http\Controllers\Api\PengadaanController;
use App\Http\Controllers\Api\PengeluaranController;
use App\Http\Controllers\Api\PenitipController;
use App\Http\Controllers\Api\PesananController;
use App\Http\Controllers\Api\PresensiController;
use App\Http\Controllers\Api\ProdukController;
use App\Http\Controllers\Api\SaldoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\ResepController;
use App\Http\Controllers\Api\ResetPasswordCustomerController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\TransaksiController;
use App\Http\Controllers\PencatatanBahanBakuController;
use App\Http\Middleware\Customer;

use App\Models\Detail_Pesanan;

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

Route::get("/produkCake", [ProdukController::class, 'produkCake']);
Route::get("/produkindex", [ProdukController::class, 'indexMobile']);
Route::get("/produkRoti", [ProdukController::class, 'produkRoti']);
Route::get("/produkMinuman", [ProdukController::class, 'produkMinuman']);
Route::get('/informationprodukdate/{id}/{tanggalKuota}', [KuotaController::class, 'showKuotaWithDate']);
Route::get('/informationprodukdatethen/{id}', [KuotaController::class, 'showKuotaWithDateThen']);
Route::get('/kuotaTanggal/{id}', [KuotaController::class, 'showKuotaTanggal']);
Route::get('/informationprodukdatebesok/{id}', [KuotaController::class, 'showKuotaWithDatebesok']);
Route::get('/informationproduk/{id}', [ProdukController::class, 'show']);



Route::group(['middleware' => ['auth:api', 'owner']], function () {
    // Update Gaji dan Bonus
    Route::put('/pegawaiOwner/{id}', [PegawaiController::class, 'updateOwner']);
    Route::get('/pegawaiOwner', [PegawaiController::class, 'indexOwner']);
    Route::get("/laporanBahanOwner", [PencatatanBahanBakuController::class, 'index']);
    Route::post('/cetakPesananOwner', [Detail_PesananController::class, 'getDetailPesananByBulanTahun']);
});
Route::group(['middleware' => ['auth:api', 'mo']], function () {
    Route::post('/change-password', [ChangePasswordPegawaiController::class, 'changePasswordPegawai']);
    Route::post('/cetakPesanan', [Detail_PesananController::class, 'getDetailPesananByBulanTahun']);
    Route::get("/pencatatanBahanBaku", [PencatatanBahanBakuController::class, 'index']);

    // Pengeluaran
    Route::get('/pengeluaran', [PengeluaranController::class, 'index']);
    Route::post('/pengeluaran', [PengeluaranController::class, 'store']);
    Route::get('/pengeluaran/{id}', [PengeluaranController::class, 'show']);
    Route::put('/pengeluaran/{id}', [PengeluaranController::class, 'update']);
    Route::delete('/pengeluaran/{id}', [PengeluaranController::class, 'destroy']);

    // Pengadaan/Pembelian
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
    Route::get('/pembelian', [PengadaanController::class, 'index']);
    Route::put('/role/{id}', [RoleController::class, 'update']);
    Route::delete('/role/{id}', [RoleController::class, 'destroy']);


    // Pegawai
    Route::get('/pegawai', [PegawaiController::class, 'index']);
    Route::post('/pegawai', [PegawaiController::class, 'store']);
    Route::get('/pegawai/{id}', [PegawaiController::class, 'show']);
    Route::put('/pegawai/{id}', [PegawaiController::class, 'update']);
    Route::delete('/pegawai/{id}', [PegawaiController::class, 'destroy']);


    Route::post('/pengadaan', [PengadaanController::class, 'store']);
    Route::get('/pembelian', [PengadaanController::class, 'index']);
    Route::get('/bahanBakuMo', [BahanBakuController::class, 'indexForMo']);
    Route::put('/pengadaan/{id}', [PengadaanController::class, 'update']);


    // Penitip
    Route::get('/penitip', [PenitipController::class, 'index']);
    Route::post('/penitip', [PenitipController::class, 'store']);
    Route::get('/penitip/{id}', [PenitipController::class, 'show']);
    Route::put('/penitip/{id}', [PenitipController::class, 'update']);
    Route::delete('/penitip/{id}', [PenitipController::class, 'destroy']);

    // Pesanan
    Route::get('/pesanan/konfirmasi', [PesananController::class, 'indexKonfirm']);
    Route::put('/pesanan/konfirmasi/{id}', [PesananController::class, 'updateStatus']);

    Route::get('/daftarPesanan', [Detail_PesananController::class, 'showDaftarPesanan']);
    Route::put('/daftarPesanan/{id}', [Detail_PesananController::class, 'update']);

    //Laporan
    Route::get('/laporan/presensi-gaji', [laporanController::class, 'laporanPresensiGaji']);
    Route::get('/laporan/pengeluaran-pemasukkan', [laporanController::class, 'laporanPengeluaranPemasukkan']);
    Route::get('/laporan/transaksi-penitip',[laporanController::class, 'laporanPenitip']);
});

Route::group(['middleware' => ['auth:api', 'admin']], function () {
    //produk
    Route::get('/produk', [ProdukController::class, 'index']);
    Route::get('/produkPenitip', [ProdukController::class, 'produkPenitip']);
    Route::post('/produk', [ProdukController::class, 'store']);
    Route::post('/produkPenitip', [ProdukController::class, 'storePenitip']);
    Route::put('/produk/{id}', [ProdukController::class, 'update']);
    Route::delete('/produk/{id}', [ProdukController::class, 'destroy']);

    Route::get('/kuotaproduk/{id}', [KuotaController::class, 'showKuota']);
    Route::post('/kuotaproduk/{id}', [KuotaController::class, 'store']);

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

    // Input Jarak
    Route::post('/pesanan/{id}/updateJarak', [PesananController::class, 'updateInputJarak']);
    Route::get('/pesanan/inputJarak', [PesananController::class, 'TampilInputJarak']);
    // Konfirmasi Pesanan
    Route::get('/pesanan/menungguKonfirmasi', [PesananController::class, 'pesananMenungguKonfirmasi']);
    Route::post('/pesanan/{id}/konfirmasiPembayaran', [PesananController::class, 'konfirmasiPembayaran']);
    // Konfirmasi penarikan
    Route::put('/saldo/{id}', [SaldoController::class, 'updateAdmin']);
    Route::get('/saldo', [SaldoController::class, 'index']);
});
Route::put('/saldo/{id}', [SaldoController::class, 'updateAdmin']);


Route::group(['middleware' => ['auth:api', 'customer']], function () {
    Route::get('/customer', [CustomerController::class, 'showProfile']);
    Route::put('/customer', [CustomerController::class, 'update']);

    Route::post('/pesanan', [PesananController::class, 'store']);
    Route::post('/pesananKeranjang', [PesananController::class, 'storeByKeranjang']);
    Route::get('/detail_pesan/{id}', [Detail_PesananController::class, 'show']);
    Route::get('/showInputAlamat/{id}', [Detail_PesananController::class, 'showinputAlamat']);
    Route::put('/simpan/{id}', [PesananController::class, 'update']);
    Route::put('/alamatInput/{id}', [PesananController::class, 'inputAlamat']);

    Route::get('/keranjang/{id}', [KeranjangController::class, 'show']);
    Route::post('/keranjang', [KeranjangController::class, 'store']);

    Route::post('/alamat', [AlamatController::class, 'store']);
    Route::get('/alamat/{id}', [AlamatController::class, 'show']);

    Route::get('/detail_pesanAll/{id}', [Detail_PesananController::class, 'showDetailByKeranjang']);

    Route::get('/transaksiCetak/{id}', [TransaksiController::class, 'show']);

    Route::get('/yourPesanan/{id}', [Detail_PesananController::class, 'showByCustomer']);
    Route::post('/pesanan/bukti/{id}', [CustomerController::class, 'uploadBuktiPembayaran']);

    Route::get('/saldo/{id}', [SaldoController::class, 'show']);
    Route::post('/saldo/penarikan', [SaldoController::class, 'store']);
    Route::get('/saldo/history/{id}', [SaldoController::class, 'showHistory']);

    // Route::post('reset/password/initiate', [ResetPasswordCustomerController::class, 'initiateResetPassword']);

    // Route::post('reset/password/{reset_key}', [ResetPasswordCustomerController::class, 'resetPassword']);
});
