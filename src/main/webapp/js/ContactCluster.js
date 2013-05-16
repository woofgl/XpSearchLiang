;(function() {
    
    (function ($) {
        brite.registerView("ContactCluster",  {emptyParent : true}, {
            create:function (data, config) {
                var $html = app.render("tmpl-ContactCluster");
                var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                brite.display("ReportHeader");
                brite.display("EaselJSForceClusterSlider");
            }
            
        });
    })(jQuery);


})();
