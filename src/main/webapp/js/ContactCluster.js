;(function() {
    
    (function ($) {
        brite.registerView("ContactCluster",   {parent:".MainView-content", emptyParent: true}, {
            create:function (data, config) {
                var $html = app.render("ContactCluster");
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                app.Api.getUsers().done(function(result){
                    brite.display("ReportHeader",'.ContactCluster-header',{data:result.result});
                    brite.display("EaselJSForceClusterSlider");
                });
            }
            
        });
    })(jQuery);


})();
