<?php

namespace App\DataStory\Controllers;

use App\DataStory\Models\Story;

class Save
{
    public function __invoke()
    {
        $name = request()->input('name');
        $model = request()->input('model');

		Story::updateOrCreate(
			['name' => $name],
			['model' => $model]
		);
    }
}