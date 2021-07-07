<?php

namespace App\DataStory\Controllers;

use App\DataStory\DataStory;
use DataStory\Diagram;

class Run
{
    public function __invoke()
    {
		return DataStory::make()->run(
			request()->input('model')			
		);
    }
}