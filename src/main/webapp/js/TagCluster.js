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
                app.Api.getTags().done(function(result){
                    brite.display("ReportHeader",'.TagCluster-header',{data:result.result}).done(function(instance){
                        var html = app.render("TagCluster-addTag");
                        view.$el.find(".toolItems").append(html);
                    });


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
            },
            events: {
                "click; .toolbar-item-content.addTag .btn":function(event){
                    var view = this;
                    var tagName = $(event.currentTarget).closest("div").find("input").val();
                    app.Api.addTag(tagName).done(function(){
                        app.Api.getTags().done(function(result){
                            brite.display("ReportHeader",'.TagCluster-header',{data:result.result}).done(function(instance){
                                var html = app.render("TagCluster-addTag");
                                view.$el.find(".toolItems").append(html);
                            });

                        });
                    });

                }
            }
            
        });
    })(jQuery);


})();
