define(['./template'], function(artTemplate){
	
	function TemplateGen(data , tplFile)
	{
		this.templ = require('text!' + tplFile);
	}

	TemplateGen.prototype.generate = function parse(){
		var render = artTemplate.compile(this.templ);
		return render(this.data);		
	}
});
