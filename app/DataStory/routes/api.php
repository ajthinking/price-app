<?php

namespace App\DataStory\Controllers;

use Illuminate\Support\Facades\Route;

Route::post('datastory/api/boot', Boot::class);
Route::post('datastory/api/run', Run::class);
Route::post('datastory/api/save', Save::class);

Route::get('datastory/api/test', function() {
    return 'im alright!';
});