package com.example.xpSearchLiang;


import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Singleton
public class DBManager {
    private final String url;
    private final String user;
    private final String passwd;

    @Inject
    public DBManager(@Named("db.driveClass") String driveClass, @Named("db.url") String url,
                     @Named("db.user") String user, @Named("db.passwd") String passwd) throws ClassNotFoundException {
        Class.forName(driveClass);
        this.url = url;
        this.user = user;
        this.passwd =passwd;

    }

    public Connection getConnection() {
        try {
            return  DriverManager.getConnection(url, user, passwd);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("get Connection from " + url + " fail");
        }
    }
}
