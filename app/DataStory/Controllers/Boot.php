<?php

namespace App\DataStory\Controllers;

use App\DataStory\DataStory;

class Boot
{
    public function __invoke()
    {
		return DataStory::make()->boot();
    }

    // protected function getSerializedModel()
    // {
    //     $requestedStory = request()->input('story');

    //     if(!$requestedStory) return;

    //     return Story::where(
    //         'path',
    //         'like',
    //         "%$requestedStory.story.json"
    //     )->first()->content;
    // }
}