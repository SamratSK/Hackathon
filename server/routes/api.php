<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Constants
const AUTH_PREFIX = 'auth';
const USERS_PREFIX = 'users';
const ORGANIZATIONS_PREFIX = 'organizations';
const EXAMS_PREFIX = 'exams';

// Middleware
const SANCTUM_MIDDLEWARE = 'auth:sanctum';

// Auth
Route::group(['prefix' => AUTH_PREFIX], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/register/admin', [AuthController::class, 'registerAdmin']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => SANCTUM_MIDDLEWARE], function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::group(['middleware' => SANCTUM_MIDDLEWARE], function () {
    Route::group(['prefix' => ORGANIZATIONS_PREFIX], function () {
        Route::get('/{id}', [OrganizationController::class, 'show']);
        Route::get('/', [OrganizationController::class, 'index']);

        Route::group(['middleware' => 'admin'], function () {
            Route::post('/create', [OrganizationController::class, 'store']);
            Route::patch('/update/{id}', [OrganizationController::class, 'update']);
            Route::delete('/delete/{id}', [OrganizationController::class, 'destroy']);
        });
    });

    Route::group(['prefix' => EXAMS_PREFIX], function () {
        Route::get('/{id}', [ExamController::class, 'show']);
        Route::get('/org/{id}', [ExamController::class, 'index']);

        Route::group(['middleware' => 'teacher'], function () {
            Route::post('/create', [ExamController::class, 'store']);
            Route::patch('/update/{id}', [ExamController::class, 'update']);
            Route::delete('/delete/{id}', [ExamController::class, 'destroy']);
        });
    });
});
