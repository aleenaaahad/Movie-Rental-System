package com.movierental.database;

import java.sql.*;

public class DatabaseConnection {
private static final String URL = System.getenv("DB_URL");
private static final String USERNAME = System.getenv("DB_USERNAME");
private static final String PASSWORD = System.getenv("DB_PASSWORD");

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            throw new RuntimeException("Database error: " + e.getMessage());
        }
    }
}
