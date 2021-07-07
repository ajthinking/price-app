<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DataStory</title>
        <link href="vendor/data-story/css/app.css" rel="stylesheet">
    </head>
    <body class="bg-gray-700">
        <script>
			let params = (new URL(window.location)).searchParams

            window.config = {
                appName: 'DataStory',
                appDesc: 'Silent Ridge',
				client: params.get('client') ?? 'APIClient',
				server: "{{ url('/datastory/api') }}",
            }
        </script>
        <div id="app"></div>
        <script type="text/javascript" src="vendor/data-story/js/app.js"></script>
        <script src="https://kit.fontawesome.com/f9f7777401.js" crossorigin="anonymous"></script>
    </body>
</html>