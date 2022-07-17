<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    //Rutas Auth
    Route::get('logout', [AuthController::class, 'logout']);
    //Route::get('tasks', [TaskController::class, 'index']);

    //Rutas de Task
    Route::post('create-task', [TaskController::class, 'create']);
    Route::get('list-task', [TaskController::class, 'listTask']);
    Route::get('list-task-completed', [TaskController::class, 'listTaskCompleted']);

    Route::put('completed/{id}', [TaskController::class, 'completed']);
    Route::put('update-task/{id}', [TaskController::class, 'update']);
    Route::delete('delete-task/{id}', [TaskController::class, 'delete']);

});
