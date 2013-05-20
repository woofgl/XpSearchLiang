var app = app || {};

		
	/**
	  * Transform the data get the dataSet by name ,default the first one
	  * @return  like:
	  *         {id:..,
	  *           name:..,
	  *           children:[{id:..,name:..,weight:..},{..}]
	  *          }
	  */
	app.transformData = function(dataSet,name){ 
		var object = {};
		if(typeof name == 'undefined'){
			var dataPart = dataSet[0];
			object.id = dataPart.id;
			object.name = dataPart.name;
			object.children = dataPart.friends;
		}else{
			$.each(dataSet,function(i,user){
				if(name == user.name){
					var dataPart = dataSet[i];
					object.id = dataPart.id;
					object.name = dataPart.name;
					object.children = dataPart.friends;
				}
			});
		}

		return object;
	}
	
	//put the name's data as the first one
	app.transformDataFirst = function(dataSet,name){ 
		var children = [];
		var index = 0;
		$.each(dataSet,function(i,it){
			if(it.name==name) index = i;
		});
		children  = children.concat(dataSet.slice(index,index+1)).concat(dataSet.slice(0,index)).concat(dataSet.slice(index+1));
		return children;
	}