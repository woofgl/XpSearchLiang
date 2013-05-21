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
        },
        getUserrel:function(userId){
            var opts={};
            opts.method = 'Get';
            opts.userId = userId;
            return app.getJsonData(contextPath+"/api/getUserRel",opts).pipe(function(data){
                return data;
            });
        },
        getUsers:function(){
            var opts={};
            opts.method = 'Get';
            return app.getJsonData(contextPath+"/api/getUsers",opts).pipe(function(data){
                return data;
            });
        },
        getTags:function(){
            var opts={};
            opts.method = 'Get';
            return app.getJsonData(contextPath+"/api/getTags",opts).pipe(function(data){
                return data;
            });
        }
    }
})();

