<?php

namespace App\Modules\DataStory\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/datastory/{story?}', Workbench::class);