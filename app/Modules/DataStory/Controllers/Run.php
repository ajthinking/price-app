<?php

namespace App\Modules\DataStory\Controllers;

use DataStory\Diagram;

class Run
{
    public function __invoke()
    {
        $diagram = Diagram::hydrate(
            request()->input('model')
        );
        
        $diagram->registerGlobal()->run();

        return [
            'diagram' => $diagram
        ];      
    }
}