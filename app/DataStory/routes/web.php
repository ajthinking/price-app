<?php

namespace App\DataStory\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/datastory/{story?}', Workbench::class);