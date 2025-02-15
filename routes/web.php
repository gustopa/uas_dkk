<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
Route::get('/', function () {
    return view('welcome');
});
Route::post('/login-insecure', [UserController::class, 'loginInsecure']);
Route::get('/login-insecure', function () {
    return Inertia::render('LoginInsecure');
});
Route::post('/login-secure', [UserController::class, 'loginSecure']);
Route::get('/login-secure', function () {
    return Inertia::render('LoginUI');
});