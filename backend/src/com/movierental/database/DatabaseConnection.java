package com.movierental.database;

import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class DatabaseConnection {

    private static String URL;
    private static String USERNAME;
    private static String PASSWORD;

    static {
        try {
            Properties props = new Properties();

            String path = DatabaseConnection.class
                    .getClassLoader()
                    .getResource("config.properties")
                    .getPath();

            try (InputStream input = DatabaseConnection.class.getResourceAsStream("/config.properties")) {
                if (input == null) {
                    throw new RuntimeException("config.properties not found");
                }

                props.load(input);
            }

            URL = props.getProperty("db.url");
            USERNAME = props.getProperty("db.username");
            PASSWORD = props.getProperty("db.password");

            Class.forName("com.mysql.cj.jdbc.Driver");

        } catch (Exception e) {
            throw new RuntimeException("Database error: " + e.getMessage());
        }
    }

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            throw new RuntimeException("Database error: " + e.getMessage());
        }
    }
}
