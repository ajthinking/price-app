<?php

namespace App\DataStory;

/**
 * DataStory CLI adapter
 */
class DataStory {
	protected $path = __DIR__ . '/lib/cli/data-story.js';

	public static function make() {
		return new static;
	}

	public function boot() {
		// Syntax: node data-story.js boot
		exec("node ". $this->path . ' boot 2>&1', $out, $err);
		$json = implode('', $out);
		
		return (array) json_decode($json);
	}	

	public function run($diagram) {
		exec(
			// Syntax: node data-story.js run <DIAGRAM_JSON>
			"node " .
			$this->path .
			' run "' .
			addslashes($diagram) .
			'" 2>&1'
			// Capture output
			, $out, $err
		);

		if($err) dd('There was an error when running the command', $err);

		$json = implode('', $out);
		return (array) json_decode($json);
	}
}