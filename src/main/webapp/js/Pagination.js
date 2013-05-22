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
            create: function (data, config) {
                return render("Pagination");
            },

            postDisplay: function (data) {

            },
            events: {},
            docEvents: {}
        });
})(jQuery);
