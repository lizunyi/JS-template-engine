$(function(){
	function renderValue(content,rowBind,rowFormat){
		content = content.trim();
		for(let item in rowBind){
			let itemVal;
			let itemExp = rowBind[item];
			if(!$.isArray(itemExp)){
				if(rowFormat && rowFormat[item]){
					rowFormat[item].call(rowBind,item,rowBind);
				}else{
					if(typeof itemExp == "function"){
						itemVal = rowBind.item.call(rowBind,item,rowBind);
					}else{
						itemVal = itemExp;
					}
				}
				let regex = new RegExp("{"+item+"}","g");
				content = content.replace(regex,itemVal);
			}
		}
		return content;
	}

	$.renderTemplateEngine = function(id,rowBind,format){
		format = format || {};
		let template = $("#"+id).html().trim();
		if(!rowBind){
			return template;
		}
		let regex = /{for[\s]*([\S]*)[\s]*(.*{\w+}*[^}]*)}/;
		let array = [];
		do{
			array = regex.exec(template);
			if(array && array.length){
				let var_v = array[1];
				let var_c = array[2].trim();
				let data = rowBind[var_v];
				let result = [];
				for(let i in data){
					result.push(renderValue(var_c,data[i],format[var_v]));
				}
				template = template.replace(regex,result.join(""));
			}
		}while(array && array.length);
		
		template = renderValue(template,rowBind,format);
			
		return template;
	}
});