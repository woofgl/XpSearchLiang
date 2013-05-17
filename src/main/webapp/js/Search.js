/**
 * View: Search
 *
 *
 *
 *
 */
(function ($) {
    brite.registerView("Search", {parent:".MainView-content", emptyParent: true},
        {
            create: function (data, config) {
                return render("Search");
            },

            postDisplay: function (data) {
                data = data||{};
                var view = this;
                search.call(view, data);
            },
            events: {
                "click; .searchForm .btn":function(event) {
                     var view = this;
                    var q = view.$el.find("input[type='text']").val();
                    console.log(q);
                    search.call(view, {q: q});
                    return false;
                }
            },
            docEvents: {}
        });

    function search(data) {
        var view = this;
        if(data.q){
            view.$el.find("input[type='text']").val(data.q);
            app.Api.search({q:data.q}).done(function(result) {
                console.log(result)
                var html = render("Search-result", result.result);
                view.$el.find(".results").empty().append(html);
            })
        }
    }
})(jQuery);
