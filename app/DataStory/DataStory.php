<?php

namespace App\DataStory;

use Exception;

/**
 * DataStory CLI adapter
 */
class DataStory {
	protected $path = __DIR__ . '/lib/cli/cli.js';

	public static function make() {
		return new static;
	}

	public function boot() {
		// Syntax: node data-story.js boot
		exec("node ". $this->path . ' boot 2>&1', $out, $err);
		$json = implode('', $out);

		$result = (array) json_decode($json);

		if(!$result) throw new Exception('Could boot properly');

		return $result;
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