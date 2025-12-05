import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Calendar, DollarSign, X } from "lucide-react";

const MovieRentalSystem = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutForm, setCheckoutForm] = useState({
    paymentMethod: 'Credit Card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };



  // Fetch data from Java backend (Tomcat + JDBC)
  useEffect(() => {
    fetch("/movie-renting/api/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("MOVIES FROM BACKEND:", data);
        const formatted = data.map((m) => ({
          id: m.movieID,
          title: m.title,
          genre: m.genre,
          year: m.year,
          rating: m.rating,
          price: m.defaultPrice,
          description: m.description,
        }));
        console.log(formatted);

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
    if (cart.length >= 5) {
      alert("You cannot rent more than 5 movies at a time!");
      return;
    }
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
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
    showToast("Checkout completed successfully!");
  };

  const handleCompleteCheckout = (e) => {
    e.preventDefault();

    // Validate payment info
    if (checkoutForm.paymentMethod === 'Credit Card') {
      if (!checkoutForm.cardNumber || !checkoutForm.expiryDate || !checkoutForm.cvv) {
        alert('Please fill in all payment details');
        return;
      }
    }
    setCart([]);
    setShowCheckout(false);
    setCheckoutForm({
      paymentMethod: 'Credit Card',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
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
            onClick={() => {
              setCart([]);
              window.location.href = "/login";
            }}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

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
                className={`px-4 py-2 rounded-lg transition ${selectedGenre === genre
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
                <span>{selectedMovie.rating}</span>
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

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <form onSubmit={handleCompleteCheckout} className="space-y-4">
              <div>
                <label className="block mb-1">Payment Method</label>
                <select
                  value={checkoutForm.paymentMethod}
                  onChange={(e) =>
                    setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 rounded"
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Cash</option>
                </select>
              </div>

              {checkoutForm.paymentMethod !== "Cash" && (
                <>
                  <div>
                    <label className="block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={checkoutForm.cardNumber}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, cardNumber: e.target.value })
                      }
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={checkoutForm.expiryDate}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, expiryDate: e.target.value })
                        }
                        className="w-full p-2 bg-gray-700 rounded"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-1">CVV</label>
                      <input
                        type="text"
                        value={checkoutForm.cvv}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, cvv: e.target.value })
                        }
                        className="w-full p-2 bg-gray-700 rounded"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
              >
                Complete Checkout
              </button>
            </form>

            <button
              onClick={() => setShowCheckout(false)}
              className="mt-4 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
          {toastMessage && (
            <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
              {toastMessage}
            </div>
          )}

        </div>
      )}
    </div>

  );
};

export default MovieRentalSystem;