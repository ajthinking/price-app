<?php

namespace App\DataStory\Controllers;

use App\DataStory\DataStory;

class Boot
{
    public function __invoke()
    {
		return DataStory::make()->boot();
    }
}