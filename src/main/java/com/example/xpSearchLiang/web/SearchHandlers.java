package com.example.xpSearchLiang.web;

import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.example.xpSearchLiang.DBManager;
import com.example.xpSearchLiang.utils.XmlReader;
import com.google.inject.Inject;
import com.google.inject.Singleton;

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


    public static final String sql = "select title,ts_headline(body, plainto_tsquery('%s'))   body, " +
            "                ts_rank(to_tsvector(body||tags||title), plainto_tsquery('%s')) rank " +
            "                from xpsearchliang_schema.post " +
            "                where to_tsvector(body) @@ to_tsquery('%s')" +
            "                order by rank";


    @Inject
    DBManager dbManager;

    @Inject
    XmlReader xmlReader;


    @WebModelHandler(startsWith="/search")
    public void search(@WebModel Map m, @WebParam("q")String q){
        Connection conn = dbManager.getConnection();
        List ls = new ArrayList();
        try {
            PreparedStatement ps = conn.prepareStatement(String.format(sql, q, q,q));
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Map map = new HashMap();
                map.put("title", rs.getString("title"));
                map.put("body", rs.getString("body"));
                ls.add(map);
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try {
                conn.close();
            } catch (SQLException e) {
                //
            }
        }
        m.put("results", ls);
        m.put("q", q);
    }

    @WebGet("/import")
    public WebResponse importFile(@WebParam("includeComments") Boolean includeComments) {
        //start from maven, cur dir should in project dir
        String parent  = new File(".").getAbsoluteFile().getParent();
        File importDir = new File(parent, "/tmp/imports");
        for (File file : importDir.listFiles()) {
            System.out.println(file.getName());
            if(file.getName().equals("Posts.xml")){
               xmlReader.importXml(file);
            }else if(file.getName().equals("Comments.xml") && includeComments){
                xmlReader.importXml(file);
            }
        }
        return WebResponse.success();
    }
}
