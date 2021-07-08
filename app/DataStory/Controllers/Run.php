<?php

namespace App\DataStory\Controllers;

use App\DataStory\DataStory;

class Run
{
    public function __invoke()
    {
		return DataStory::make()->run(
			request()->input('model')			
		);
    }
}