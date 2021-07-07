<?php

namespace App\DataStory;

class DataStory {
	protected $path = __DIR__ . '/lib/cli/data-story.js';

	public static function make() {
		return new static;
	}

	public function run($diagram) {
		exec(
			"node " .
			$this->path .
			' run "' .
			addslashes($diagram) .
			'" 2>&1'
			
			, $out, $err
		);

		if($err) {
			dd('There was an error when running the command', $err);
		}

		

		$json = implode('', $out);

		return (array) json_decode($json);
	}

	public function boot() {
		exec("node ". $this->path . ' boot 2>&1', $out, $err);

		$json = implode('', $out);

		return (array) json_decode($json);
	}
}