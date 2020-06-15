<script>
$(function(){
	function renderValue(content,rowBind,rowFormat){
		content = content.trim();
		for(let item in rowBind){
			let itemVal;
			if(!$.isArray(rowBind[item])){
				if(rowFormat[item]){
					rowFormat[item].call(rowBind,item,rowBind);
				}else{
					if(typeof item == "function"){
						itemVal = rowBind.item();
					}else{
						itemVal = rowBind[item];
					}
				}
				let regex = new RegExp("{"+item+"}","g");
				content = content.replace(regex,itemVal);
			}
		}
		return content;
	}


	$.renderTemplateEngine = function(id,rowBind,rowFormat){
		var template = $("#"+id).html().trim();
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
					result.push(renderValue(var_c,data[i],rowFormat));
				}
				template = template.replace(regex,result.join(""));
			}
		}while(array && array.length);
		
		template = renderValue(template,rowBind,rowFormat);
			
		return template;
	}
});
</script>