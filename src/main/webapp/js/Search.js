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
                    search.call(view, {q: q});
                    return false;
                },
                "keyup; input[type='text']":function(event){
                    console.log(event);
                    if(event.which==13){
                        var view = this;
                        var q = view.$el.find("input[type='text']").val();
                        search.call(view, {q: q});

                    }
                    return false;
                }
            },
            docEvents: {}
        });

    function search(data) {
        var view = this;
        if(data.q){
            view.$el.find("input[type='text']").val(data.q);
            app.Api.search(data).done(function(result) {
                var html = render("Search-result", result.result);
                view.$el.find(".results").empty().append(html);
                brite.display("Pagination",view.$el.find(".page"),{
                    pageNo: result.result.pageNo,
                    pageSize: result.result.pageSize,
                    totalCount:result.result.totalCount,
                    callback:function(pageNo,pageSize){
                        search.call(view,{q:data.q, pageNo:pageNo, pageSize:pageSize});
                    }
                })
            })
        }
    }
})(jQuery);
