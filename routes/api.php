<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;
use App\Http\Middleware\cors;

Route::get('/locations',[LocationController::class,'index']);
Route::get('/locations/{location}',[LocationController::class,'show']);
Route::post('/locations',[LocationController::class, 'store']);
Route::delete('/locations/{id}',[LocationController::class, 'delete']);
