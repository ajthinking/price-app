<?php

namespace App\DataStory;

class DataStoryCli {
	public function run($name) {
		$nodeJsPath = __DIR__ . '/data-story.js';

		$ret = exec("node ".$nodeJsPath . ' ' . $name . ' 2>&1', $out, $err);
		
		return json_decode($ret);
	}	
}