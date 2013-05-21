;(function() {
    
    (function ($) {
        brite.registerView("TagCluster",   {parent:".MainView-content", emptyParent: true}, {
            create:function (data, config) {
                var $html = app.render("TagCluster");
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                app.Api.getTags().done(function(result){
                    brite.display("ReportHeader",'.TagCluster-header',{data:result.result});
                    brite.display("EaselJSForceClusterSlider",".TagCluster-main",{
                        getChildren: function(data){
                            var dfd = $.Deferred();
                            if(data.children){
                                dfd.resolve(data.children);
                            }else{
                                app.Api.getTagRel(data.id).done(function(result){
                                    data.children = result.result;
                                    dfd.resolve(data.children);
                                });
                            }
                            return dfd.promise();
                        }
                    });
                });
            }
            
        });
    })(jQuery);


})();
