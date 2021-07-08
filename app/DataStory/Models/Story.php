<?php

namespace App\DataStory\Models;

use App\DataStory\DataStory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
	protected $guarded = [];

	public function run() {
		$cli = new DataStory;
		return $cli->run($this->model);
	}
}