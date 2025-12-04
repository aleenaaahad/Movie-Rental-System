import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Calendar, DollarSign, Star, X } from "lucide-react";

const MovieRentalSystem = () => {

  // Fetch from backend instead of hard-coded movies
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Java backend (Tomcat + JDBC)
  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((data) => {
        // Map backend MovieID -> id to match your frontend logic
        const formatted = data.map((m) => ({
          id: m.movieID,               // from DB (MovieID)
          title: m.title,
          genre: m.genre,
          year: m.year,
          rating: m.rating,
          price: m.defaultPrice,        // DB column DefaultPrice
          description: m.description,
        }));
        setMovies(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  // Original states
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const genres = ["All", "Sci-Fi", "Crime", "Action", "Drama", "Comedy", "Horror", "Romance"];

  // Add to cart
  const addToCart = (movie) => {
    if (!cart.find((item) => item.id === movie.id)) {
      setCart([...cart, { ...movie, rentalDays: 5 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateRentalDays = (id, days) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, rentalDays: parseInt(days) } : item
      )
    );
  };

  // Filtering logic
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.rentalDays,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-xl">Loading movies...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Renting System</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart ({cart.length})</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedGenre === genre
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="bg-gray-700 h-48 flex items-center justify-center text-xl">
                🎬
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{movie.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold">${movie.price}/day</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(movie);
                    }}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-20">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
              <button onClick={() => setSelectedMovie(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-3">{selectedMovie.description}</p>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{selectedMovie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span>{selectedMovie.rating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>${selectedMovie.price}/day</span>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedMovie);
                setSelectedMovie(null);
              }}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800 shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold">{item.title}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="text-sm text-gray-400">Rental Days:</label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={item.rentalDays}
                          onChange={(e) =>
                            updateRentalDays(item.id, e.target.value)
                          }
                          className="w-20 px-2 py-1 bg-gray-600 rounded"
                        />
                      </div>

                      <div className="mt-2 text-right">
                        <span className="text-red-500 font-bold">
                          ${(item.price * item.rentalDays).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-red-500">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRentalSystem;
