/**
 * View: MainView
 *
 *
 *
 *
 */
(function ($) {
    brite.registerView("MainView",{parent: "body", emptyParent: true},
        {
            create: function (data, config) {
                return render("MainView");
            },

            postDisplay: function (data) {
                brite.display("TopBar", ".topBarContainer");
            },
            events: {
                "click; button.import":function(){
                    console.log("import");
                    app.Api.import().done(function(data) {
                        console.log("import success");
                    })
                    return false;
                },
                "click; button.search":function(event){
                    var view = this;
                    var q = view.$el.find("input[type='text']").val();
                    brite.display("Search", ".MainView-content", {q: q});
                    return false;
                },
                "keyup; input[type='text']":function(event){
                    if(event.which==13){
                        var view = this;
                        var q = view.$el.find("input[type='text']").val();
                        brite.display("Search", ".MainView-content", {q: q});

                    }
                    return false;
                }


            },
            docEvents: {}
        });
})(jQuery);
