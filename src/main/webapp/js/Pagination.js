/**
 * View: Pagination
 *
 *
 *
 *
 */
(function ($) {
    brite.registerView("Pagination", {emptyParent: true},
        {
            create: function (data, config){
                return app.render("Pagination");
            },

            postDisplay: function (data) {
                var view = this;
                renderPage.call(view, data.pageNo||1, data.pageSize||10, data.totalCount, data.callback);
            },
            events: {
              "click; a[data-page]":function(event){
                  var view = this;
                  var newPageNo = $(event.currentTarget).attr("data-page");
                  view.page.callback(newPageNo, view.page.pageSize);
              },
              "click; a.next":function(event){

                  var view = this;
                  var page = view.page;
                  view.page.callback(page.pageNo + 1, page.pageSize);
              },
              "click; a.prev":function(event){
                  var view = this;
                  var page = view.page;
                  view.page.callback(page.pageNo - 1, page.pageSize);
              }
            },
            docEvents: {}
        });

        function calc(page) {
            page.pageCount = parseInt(page.totalCount/page.pageSize) + page.totalCount % page.pageSize;
            if(page.pageNo > 5){
                page.start = page.pageNo -1;
            }else{
                page.start = 1;
            }

            page.end = page.pageNo + 1;
            if(page.end > page.pageCount){
                page.end =page.pageCount;
            }
            if(page.end < page.pageCount -2) {
                page.end_2 = page.pageCount - 2;
            }
            if(page.end < page.pageCount -1) {
                page.end_1 = page.pageCount - 1;
            }
        }

    function renderPage(pageNo, pageSize, totalCount, callback) {
        var view = this;
        var page = view.page = {pageNo: pageNo, pageSize: pageSize, totalCount: totalCount, callback: callback};
        calc(view.page);
        var html = app.render("Pagination-detail", page);
        view.$el.empty().append(html);
    }

})(jQuery);
