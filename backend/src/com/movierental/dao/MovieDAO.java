package com.movierental.dao;

import com.movierental.database.DatabaseConnection;
import com.movierental.model.Movie;
import java.sql.*;
import java.util.*;

public class MovieDAO {
    
    public List<Movie> getAllMovies() {
        List<Movie> movies = new ArrayList<>();
        String sql = "SELECT * FROM Movies";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                movies.add(new Movie(
                    rs.getInt("MovieID"),
                    rs.getString("Title"),
                    rs.getString("Genre"),
                    rs.getInt("Year"),
                    rs.getDouble("Rating"),
                    rs.getDouble("DefaultPrice"),
                    rs.getString("Description")
                ));
            }

        } catch (SQLException e) {
            System.out.println("DAO error: " + e.getMessage());
        }

        return movies;
    }
}
