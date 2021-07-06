<?php

namespace App\Modules\DataStory;

use Illuminate\Support\ServiceProvider;

class DataStoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/config/defaults.php', 'data-story'
        );
    }

    public function boot()
    {
        // $this->loadViewsFrom(__DIR__ . '/resources/views', 'data-story');

        // $this->publishes([
        //     __DIR__ . '/../../dist' => public_path('vendor/data-story'),
        // ], 'public');

        // $this->publishes([
        //     __DIR__ . '/config/defaults.php' => config_path('data-story.php'),
        // ], 'config');

        require __DIR__ . '/routes/web.php';
        require __DIR__ . '/routes/api.php';
    }
}
