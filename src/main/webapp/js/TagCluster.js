;(function() {
    
    (function ($) {
        brite.registerView("TagCluster",   {parent:".MainView-content", emptyParent: true}, {
            create:function (data, config) {
                var $html = app.render("TagCluster");
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                brite.display("ReportHeader",".TagCluster-header");
                brite.display("EaselJSForceClusterSlider",".TagCluster-main");
            }
            
        });
    })(jQuery);


})();
