#instruction

	Sprite Generator

	Create a sprite in psd, the script generates the CSS and image

# Installation

    npm install -g psdcss

# Usage
	
	project/www $ psdcss


## Pattern  

		
	Project	
		|
		|.gitignore
		|psd.json
		|package.json
		|README.md

## File config path name: psd.json

	{
		"conf" : [{
			"psd":  "/projects/site/psd/",
			"css" : "/projects/site/styles/sass/scss/components/",
			"style": "scss",
			"img" : "/www/public/img/"
		}]
	
	}


## License

[MIT License] © Jaffar Cardoso