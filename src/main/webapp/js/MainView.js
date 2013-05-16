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
                    app.api.import().done(function(data) {
                        console.log("import success");
                    })
                    return false;
                }

            },
            docEvents: {}
        });
})(jQuery);
