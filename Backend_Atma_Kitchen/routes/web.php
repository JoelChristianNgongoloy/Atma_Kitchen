<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/forgetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'forgetPassword'])->name('forget.password');
Route::post('/forgetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'forgetPasswordPost'])->name('forget.password.post');
Route::get('/resetPassword/{token}', [\App\Http\Controllers\Api\PasswordResetController::class, 'resetPassword'])->name('reset.password');
Route::post('/resetPassword', [\App\Http\Controllers\Api\PasswordResetController::class, 'resetPasswordPost'])->name('reset.password.post');