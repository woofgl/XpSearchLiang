;(function() {

    (function ($) {
        brite.registerView("ReportHeader",  {emptypparent:true, parent:".ContactCluster-header"}, {
            create:function (data, config) {
                var html = app.render("ReportHeader", data||{data:[]});
               	return html;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                view.level = view.level || 2;
                view.scaleVal = view.scaleVal || 1;
                
                $e.find("li.d3jsPart").hide();
                $e.find("li.fabricjsPart").hide();
                
                $('#sl1').slider().off('slide');
                $('#sl1').slider().on('slide', function(ev){
                	if(view.level != ev.value){
                		view.level = ev.value;
	                	view.$el.trigger("DO_SET_LEVEL",{level:ev.value});
                	}
				});
				
				$('#sl2').slider().off('slide');
      			$('#sl2').slider().on('slide', function(ev){
                	var zoom = ev.value;
                	var scaleVal = zoom/100;
                	view.scaleVal = scaleVal;
                	view.$el.trigger("DO_SET_ZOOM",{scaleVal:scaleVal});
				});
            },
            events:{
            	"change; .useRAF input[type='checkbox']" : function(event){
					var view = this;
					if(app.useRAF){
						app.useRAF = false;
					}else{
						app.useRAF = true;
					}
					view.$el.trigger("DO_SET_RAF");
				},
            	"change; .demoData select" : function(event){
					var view = this;
					var id = $(event.target).val();
                    console.log(id);
                    if(id >= -1){
                        var name = $(event.target).find("option:selected").text();
                        var root = {id: id, name: name};
                        view.$el.trigger("DO_SET_ROOT", root);
                    }
				},

            }
        });
        
    })(jQuery);
})();