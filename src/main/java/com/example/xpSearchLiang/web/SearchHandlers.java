package com.example.xpSearchLiang.web;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.example.xpSearchLiang.dao.PostDao;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import java.util.Map;

@Singleton
public class SearchHandlers {

    @Inject
    private PostDao postDao;

    @WebModelHandler(startsWith="/search")
    public void search(@WebModel Map m, @WebParam("q")String q){
        m.put("results", postDao.fullTextSearch(q));
        m.put("q", q);
    }
}
