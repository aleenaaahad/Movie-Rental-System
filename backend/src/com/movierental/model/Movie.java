package com.movierental.model;

public class Movie {
    private int movieID;
    private String title;
    private String genre;
    private int year;
    private String rating;
    private double defaultPrice;
    private String description;

    public Movie() {}

    public Movie(int movieID, String title, String genre, int year, String rating,
                 double defaultPrice, String description) {
        this.movieID = movieID;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.rating = rating;
        this.defaultPrice = defaultPrice;
        this.description = description;
    }

    public int getMovieID() { return movieID; }
    public String getTitle() { return title; }
    public String getGenre() { return genre; }
    public int getYear() { return year; }
    public String getRating() { return rating; }
    public double getDefaultPrice() { return defaultPrice; }
    public String getDescription() { return description; }
}
