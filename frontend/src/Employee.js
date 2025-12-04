import React, { useState } from 'react';
import { Film, Users, DollarSign, Package, TrendingUp, Search, Plus, Edit, Trash2, X, Calendar, Star, CheckCircle, XCircle, Clock } from 'lucide-react';

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showEditMovie, setShowEditMovie] = useState(null);

  const [movies, setMovies] = useState([
    { id: 1, title: 'The Matrix', genre: 'Sci-Fi', year: 1999, rating: 8.7, price: 3.99, stock: 15, rented: 8, revenue: 319.20 },
    { id: 2, title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8, price: 4.99, stock: 12, rented: 10, revenue: 499.00 },
    { id: 3, title: 'The Godfather', genre: 'Crime', year: 1972, rating: 9.2, price: 3.99, stock: 10, rented: 7, revenue: 279.30 },
    { id: 4, title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: 8.9, price: 3.99, stock: 8, rented: 6, revenue: 239.40 },
    { id: 5, title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0, price: 4.99, stock: 20, rented: 15, revenue: 748.50 },
  ]);

  const [rentals, setRentals] = useState([
    { id: 1, customer: 'John Smith', movie: 'The Matrix', rentDate: '2025-11-25', dueDate: '2025-11-28', status: 'active', amount: 11.97 },
    { id: 2, customer: 'Sarah Johnson', movie: 'Inception', rentDate: '2025-11-24', dueDate: '2025-11-29', status: 'active', amount: 24.95 },
    { id: 3, customer: 'Mike Wilson', movie: 'The Dark Knight', rentDate: '2025-11-20', dueDate: '2025-11-27', status: 'overdue', amount: 14.97 },
    { id: 4, customer: 'Emily Brown', movie: 'Forrest Gump', rentDate: '2025-11-26', dueDate: '2025-11-30', status: 'active', amount: 7.98 },
    { id: 5, customer: 'David Lee', movie: 'Pulp Fiction', rentDate: '2025-11-23', dueDate: '2025-11-26', status: 'returned', amount: 11.97 },
  ]);

  const [customers] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', totalRentals: 23, activeRentals: 1, totalSpent: 287.65 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', totalRentals: 15, activeRentals: 1, totalSpent: 189.50 },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', totalRentals: 31, activeRentals: 1, totalSpent: 412.30 },
    { id: 4, name: 'Emily Brown', email: 'emily@email.com', totalRentals: 8, activeRentals: 1, totalSpent: 98.20 },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: '', genre: '', year: '', rating: '', price: '', stock: ''
  });

  const totalRevenue = movies.reduce((sum, movie) => sum + movie.revenue, 0);
  const totalMovies = movies.reduce((sum, movie) => sum + movie.stock, 0);
  const totalRented = movies.reduce((sum, movie) => sum + movie.rented, 0);
  const activeRentals = rentals.filter(r => r.status === 'active').length;

  const handleAddMovie = () => {
    if (newMovie.title && newMovie.genre && newMovie.year && newMovie.rating && newMovie.price && newMovie.stock) {
      const movie = {
        id: movies.length + 1,
        title: newMovie.title,
        genre: newMovie.genre,
        year: parseInt(newMovie.year),
        rating: parseFloat(newMovie.rating),
        price: parseFloat(newMovie.price),
        stock: parseInt(newMovie.stock),
        rented: 0,
        revenue: 0
      };
      setMovies([...movies, movie]);
      setNewMovie({ title: '', genre: '', year: '', rating: '', price: '', stock: '' });
      setShowAddMovie(false);
    }
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const handleUpdateRentalStatus = (id, status) => {
    setRentals(rentals.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold">Movie Rental System</h1>
                <p className="text-sm text-gray-400">Employee Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">JD</span>
              </div>
              <span className="text-sm">John Doe (Admin)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {['overview', 'movies', 'rentals', 'customers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                <p className="text-blue-100 text-sm">Total Revenue</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-8 h-8" />
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">{totalMovies}</h3>
                <p className="text-green-100 text-sm">Total Movies</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8" />
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">{activeRentals}</h3>
                <p className="text-purple-100 text-sm">Active Rentals</p>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">{customers.length}</h3>
                <p className="text-orange-100 text-sm">Total Customers</p>
              </div>
            </div>

            {/* Top Movies */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Top Performing Movies</h2>
              <div className="space-y-3">
                {movies.sort((a, b) => b.revenue - a.revenue).slice(0, 5).map(movie => (
                  <div key={movie.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-400">{movie.rented} rentals</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-500">${movie.revenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Rentals */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Rentals</h2>
              <div className="space-y-3">
                {rentals.slice(0, 5).map(rental => (
                  <div key={rental.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{rental.movie}</h3>
                      <p className="text-sm text-gray-400">{rental.customer}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rental.status === 'active' ? 'bg-green-600' :
                        rental.status === 'overdue' ? 'bg-red-600' :
                        'bg-gray-600'
                      }`}>
                        {rental.status}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">${rental.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Movies Tab */}
        {activeTab === 'movies' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Movie Inventory</h2>
              <button
                onClick={() => setShowAddMovie(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
                Add Movie
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Genre</th>
                    <th className="px-6 py-3 text-left">Year</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Rented</th>
                    <th className="px-6 py-3 text-left">Revenue</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {movies.map(movie => (
                    <tr key={movie.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 font-semibold">{movie.title}</td>
                      <td className="px-6 py-4 text-gray-400">{movie.genre}</td>
                      <td className="px-6 py-4 text-gray-400">{movie.year}</td>
                      <td className="px-6 py-4 text-green-500">${movie.price}</td>
                      <td className="px-6 py-4">{movie.stock}</td>
                      <td className="px-6 py-4">{movie.rented}</td>
                      <td className="px-6 py-4 font-semibold">${movie.revenue.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-400">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMovie(movie.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Rental Management</h2>

            <div className="bg-gray-800 rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Movie</th>
                    <th className="px-6 py-3 text-left">Rent Date</th>
                    <th className="px-6 py-3 text-left">Due Date</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {rentals.map(rental => (
                    <tr key={rental.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 font-semibold">{rental.customer}</td>
                      <td className="px-6 py-4">{rental.movie}</td>
                      <td className="px-6 py-4 text-gray-400">{rental.rentDate}</td>
                      <td className="px-6 py-4 text-gray-400">{rental.dueDate}</td>
                      <td className="px-6 py-4 text-green-500">${rental.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          rental.status === 'active' ? 'bg-green-600' :
                          rental.status === 'overdue' ? 'bg-red-600' :
                          'bg-gray-600'
                        }`}>
                          {rental.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {rental.status === 'active' && (
                          <button
                            onClick={() => handleUpdateRentalStatus(rental.id, 'returned')}
                            className="text-green-500 hover:text-green-400 text-sm font-semibold"
                          >
                            Mark Returned
                          </button>
                        )}
                        {rental.status === 'overdue' && (
                          <button
                            onClick={() => handleUpdateRentalStatus(rental.id, 'returned')}
                            className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customers.map(customer => (
                <div key={customer.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{customer.name}</h3>
                      <p className="text-gray-400 text-sm">{customer.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-blue-500">{customer.totalRentals}</p>
                      <p className="text-xs text-gray-400">Total Rentals</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">{customer.activeRentals}</p>
                      <p className="text-xs text-gray-400">Active</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-500">${customer.totalSpent}</p>
                      <p className="text-xs text-gray-400">Total Spent</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Movie Modal */}
      {showAddMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Movie</h2>
              <button onClick={() => setShowAddMovie(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <select
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="">Select Genre</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Crime">Crime</option>
                  <option value="Action">Action</option>
                  <option value="Drama">Drama</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <input
                    type="number"
                    value={newMovie.year}
                    onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMovie.price}
                    onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <input
                    type="number"
                    value={newMovie.stock}
                    onChange={(e) => setNewMovie({ ...newMovie, stock: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
              <button
                onClick={handleAddMovie}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition"
              >
                Add Movie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default EmployeeDashboard;