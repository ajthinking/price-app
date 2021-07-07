<?php

namespace App\DataStory;

class DataStory {
	protected $path = __DIR__ . '/lib/cli/data-story.js';

	public static function make() {
		return new static;
	}

	public function run($name) {
		// return $this->execute('run', [$name]);
		$ret = exec("node ". $this->path . ' ' . $name . ' 2>&1', $out, $err);

		return json_decode($ret);
	}

	public function boot() {
		exec("node ". $this->path . ' boot 2>&1', $out, $err);

		$json = implode('', $out);

		return (array) json_decode($json);

        return [
            'stories'         => [],
            'availableNodes'	=> [],
        ]; 
	}

	// public function execute($type) {
	// 	$ret = exec("node ". $this->path . ' ' . $name . ' 2>&1', $out, $err);
	// 	$value = json_decode($ret);
	// }
}