// global namespace
var app = app || {};
app.useRAF = true;
app.animation = "tween";


// --------- Render Function --------- //
// Just a little indirection to render a template using handlebars.
Handlebars.templates = Handlebars.templates || {};
function render(templateName,data){
    var tmpl = Handlebars.templates[templateName];
    if (!tmpl){
        throw "app-error: not template found for : " + templateName;
        //tmpl = Handlebars.compile($("#" + templateName).html());
        //Handlebars.templates[templateName] = tmpl;
    }
    return tmpl(data);
}

app.render = render;
// --------- /Render Function --------- //

/**
 * string format function
 */
String.prototype.format = function(args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return templat;
    }
};


(function($) {
    // -------- Public Methods --------- //
    app.ajaxPost = function(url, data, fileElement) {
        var dfd = $.Deferred();
        var formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", fileElement);
        console.log(formData)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = function(e) {
            var adGroup = eval("(" + this.response + ")").result;
            dfd.resolve(adGroup);
        };
        xhr.send(formData);
        return dfd.promise();
    }
    /**
     * A method about use ajax to get json data
     */
    app.getJsonData = function(url, params, failcount, pdfd) {
        var dfd = pdfd || $.Deferred();
        params = params || {};
        jQuery.ajax({
            type : params.method ? params.method : "Post",
            url : url,
            async : true,
            data : params,
            dataType : "json"
        }).success(function(data) {
                console.log(data);
                //auth fail
                if (data && data.AUTH_FAILED) {

                    window.location.href = contextPath;
                    return;
                } else if (data && data.OAUTH_FAILED) {
                    //oauth fail
                    var count = failcount || 0;
                    if (count < 3) {
                        var callback = function() {
                            count++;
                            app.getJsonData(url, params, count, dfd);
                        };
                        window.showModalDialog(data.oauthUrl);
                        callback();
                    }
                    return;
                } else {
                    dfd.resolve(data);
                }

            }).fail(function(jxhr, arg2) {
                try {
                    if (jxhr.responseText) {
                        console.log(" WARNING: json not well formatted, falling back to JS eval");
                        var data = eval("(" + jxhr.responseText + ")");
                        dfd.resolve(data);
                    } else {
                        throw " EXCEPTION: Cannot get content for " + url;
                    }
                } catch (ex) {
                    console.log(" ERROR: " + ex + " Fail parsing JSON for url: " + url + "\nContent received:\n" + jxhr.responseText);
                }
            });

        return dfd.promise();
    };
})(jQuery);



