package com.example.xpSearchLiang.web;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.example.xpSearchLiang.DBManager;
import com.example.xpSearchLiang.utils.XmlReader;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class SearchHandlers {


    public static final String sql = "select title,ts_headline(body, plainto_tsquery('%s'))   body " +
            "                from xpsearchliang_schema.post " +
            "                where to_tsvector(body||title||tags) @@ to_tsquery('%s')" +
            "                limit %s offset %s";
    public static final String sqlCount = "select count(*) " +
            "                from xpsearchliang_schema.post " +
            "                where to_tsvector(body||title||tags) @@ to_tsquery('%s')" ;


    @Inject
    DBManager dbManager;

    @Inject
    XmlReader xmlReader;
    @Inject
    @Named("import.dir")
    String importDirStr;


    @WebModelHandler(startsWith="/search")
    public void search(@WebModel Map m, @WebParam("q")String q, @WebParam("pageNo") Integer pageNo,@WebParam("pageSize") Integer pageSize ) {
        if (pageNo == null) {
            pageNo = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        int offset = (pageNo-1)*pageSize+1;
        int totalCount = 0;

        Connection conn = dbManager.getConnection();
        List ls = new ArrayList();
        try {
            PreparedStatement ps = conn.prepareStatement(String.format(sql, q, q, pageSize, offset));
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Map map = new HashMap();
                map.put("title", rs.getString("title"));
                map.put("body", rs.getString("body"));
                ls.add(map);
            }
            rs.close();
            ps.close();
            ps = conn.prepareStatement(String.format(sqlCount, q));
            rs = ps.executeQuery();
            if(rs.next()) {
                totalCount = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                conn.close();
            } catch (SQLException e) {
                //
            }
        }
        m.put("results", ls);
        m.put("q", q);
        m.put("totalCount", totalCount);
        m.put("pageNo", pageNo);
        m.put("pageSize", pageSize);
    }

    @WebGet("/import")
    public WebResponse importFile() {
        //start from maven, cur dir should in project dir
        File importDir = new File(importDirStr);
        for (File file : importDir.listFiles()) {
            System.out.println(file.getName());
            xmlReader.importXml(file);
        }
        System.out.println("Done!");
        return WebResponse.success();
    }
}
