package com.example.xpSearchLiang;


import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;

import javax.sql.DataSource;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Singleton
public class DBManager implements DataSource{
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
    @Override
    public Connection getConnection() {
        try {
            return  DriverManager.getConnection(url, user, passwd);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("get Connection from " + url + " fail");
        }
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return  DriverManager.getConnection(url, username, password);
    }


    @Override
    public PrintWriter getLogWriter() throws SQLException {
        return DriverManager.getLogWriter();
    }

    @Override
    public void setLogWriter(PrintWriter out) throws SQLException {
        DriverManager.setLogWriter(out);
    }

    @Override
    public void setLoginTimeout(int seconds) throws SQLException {
        DriverManager.setLoginTimeout(seconds);
    }

    @Override
    public int getLoginTimeout() throws SQLException {
        return DriverManager.getLoginTimeout();
    }

    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        return null;
    }

        @Override
    public boolean isWrapperFor (Class < ? > iface)throws SQLException {
            return false;
        }
    }
