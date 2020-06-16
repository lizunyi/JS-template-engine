$(function(){
	function renderValue(content,rowBind){
		content = content.trim();
		for(let item in rowBind){
			let itemVal;
			let itemExp = rowBind[item];
			if(typeof itemExp == "function"){
				itemVal = itemExp.call(rowBind,item,rowBind);
			}else{
				itemVal = itemExp;
			}
			let regex = new RegExp("{"+item+"}","g");
			content = content.replace(regex,itemVal);
			
		}
		return content;
	}

	$.renderTemplateEngine = function(id,rowBind){
		let template = $("#"+id).html().trim();
		if(!rowBind){
			return template;
		}
		let regex = /{for[\s]*([\S]*)[\s]*(.*{\w+}*[\s\S]*)}/;
		let array = [];
		do{
			array = regex.exec(template);
			if(array && array.length){
				let var_v = array[1];
				let var_c = array[2].trim();
				let data = rowBind[var_v];
				let result = [];
				for(let i in data){
					result.push(renderValue(var_c,data[i]));
				}
				template = template.replace(regex,result.join(""));
			}
		}while(array && array.length);
		
		template = renderValue(template,rowBind);
		return template;
	}
});