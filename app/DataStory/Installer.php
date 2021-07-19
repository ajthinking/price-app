<?php

namespace App\DataStory;

use Illuminate\Support\Facades\Http;

class Installer
{
		const api = 'https://api.github.com/';

	  static function install()
		{
				static::installCli();
				//static::installAssets();
		}

		static function installCli() {
			$response = Http::get(static::api . 'repos/data-story-org/core/releases');

			$releases = collect($response->json())->reject->prerelease;
			
			$assets = $releases->map->assets->flatten(1);
			
			$assets->each(function($asset) {
					static::downloadAsset($asset);
			});
		}

		static function downloadAsset($asset) {
				// Download
				$asset['content'] = Http::get($asset['browser_download_url'])->body();
				file_put_contents(
						__DIR__ . '/cli/' . $asset['name'],
						$asset['content']
				);
		}

		// static function installAssets() {
		// 	return;
		// }		
}