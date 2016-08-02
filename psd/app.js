/*jslint indent: 2, maxlen: 120, maxerr: 10, white: true, browser: true, devel: true, nomen: true, sloppy: true, unparam:true */
/*global */

var PSD = require('psd'),
		path = require('path'),
		fs = require('fs'),
		docNome,
		psd, 
		i=0,
		dir= path.join(path.dirname(fs.realpathSync(__filename)))+'/';
		//console.log(path.join(path.dirname(fs.realpathSync(process.env.OLDPWD))))
		//console.log()

fs.readdir(process.env.OLDPWD+'/psd/',function (err,files) {

  files.forEach(function (file) {
		
    	
		psd = PSD.fromFile(process.env.OLDPWD+'/psd/'+files[i]);
		psd.parse();

		var Item = psd.tree().export().children,
				css='', css1='';
				docNome = file.replace(/(.psd)/g, "");
		for (var a = 0; a < Item.length; ++a) {
		  var nome = Item[a].name, 
					type = Item[a].type,
					width = Item[a].width, 
					height = Item[a].height, 
					top = Item[a].top, 
					visible = Item[a].visible,
					left = Item[a].left; 

			if(type === 'layer' && visible === true ) {
			
				if (a<=0) {

					css += '.' + docNome + ' {' + "\n";
					css += "\t" + 'background: url(../img/' + docNome + '.png);' + "\n";
					css += "\t" + 'background-repeat: no-repeat;' + "\n";
					css += "\t" + 'display:block;' + "\n";
					css += '}' + "\n";
				};		

				if(width != 0 && height != 0) {
					css += '.'+docNome+ '.' + nome + ' {' + "\n";
					css += "\t" + 'background-position: -' + left + 'px -' +  top  + 'px;' + "\n";
					css += "\t" + 'height: ' + height + 'px;' + "\n";
					css += "\t" + 'width: ' + width + 'px;' + "\n";
					css += '}' + "\n";
					if(nome.indexOf(':hover') <= -1) {
						css1 += '.'+docNome+ '.' + nome + ' {' + "\n";
						css1 += '}' + "\n";
					}							
				}
			}
		};


		createFileCss('0.sprite-'+docNome, css);
		createFileCss('1.'+docNome, css1);
  	
  	psd.image.saveAsPng(path.join(path.dirname(process.env.OLDPWD)).replace('projects', '')+'/www/public/img/'+files[i].replace(/(.psd)/g, ".png"));
			       
    i++;
  		
    
  });
});


function createFileCss (name, cs) {
	var stream, 
		nome = path.join(path.dirname(fs.realpathSync(process.env.OLDPWD)))+'/site/styles/sass/scss/components/'+name+'.scss';

	fs.exists(nome, function (exists) { 
  		
  		if (!exists || /(0.sprite\-)/i.test(nome) ===  true) {
  			stream = fs.createWriteStream(nome);
				stream.once('open', function (fd) {
				stream.write(cs);
				stream.end();
			}); 
   		} 
	});
};