/**
 * View: TopBar
 *
 *
 *
 *
 */
(function ($) {
    var processing = false;
    brite.registerView("TopBar", {emptyParent: true},
        {
            create: function (data, config) {
                return render("TopBar");
            },

            postDisplay: function (data) {

            },
            events: {
                "click; li a":function(event){
                    if(!processing){
                        processing = true;
                        var view = this;
                        view.$el.find("li").removeClass("active");
                        $(event.currentTarget).closest("li").addClass("active");
                        var component = $(event.currentTarget).closest("li").attr("data-component");
                        brite.display(component);
                        processing = false;
                    }
                    return false;
                }
            },
            docEvents: {}
        });
})(jQuery);
