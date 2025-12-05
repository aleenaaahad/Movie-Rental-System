package com.movierental.servlet;

import com.movierental.dao.MovieDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet("/api/movies")
public class MovieServlet extends HttpServlet {

    private final MovieDAO movieDAO = new MovieDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        var movies = movieDAO.getAllMovies();
        resp.getWriter().write(gson.toJson(movies));
    }
}
