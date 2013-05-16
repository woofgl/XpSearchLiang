var app = app||{};
(function(){
    app.Api={
        search:function(opts){
            opts=opts||{};
            opts.method = 'Get';
            return app.getJsonData(contextPath+"/api/search",opts).pipe(function(data){
                return data;
            });
        },
        import:function(opts){
            opts=opts||{};
            opts.method = 'Get';
            return app.getJsonData(contextPath+"/api/import",opts).pipe(function(data){
                return data;
            });
        }
    }
})();

