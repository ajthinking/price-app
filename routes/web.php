<?php

use App\DataStory\DataStory;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pricelist', function () {
	$result = DataStory::run('my_first_story');

	Story::where('name', 'my_first_story')->cli()->run();
});
