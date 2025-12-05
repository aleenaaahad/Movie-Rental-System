import React, { useState } from 'react';
import { Film, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate
    if (!loginForm.username || !loginForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      if (loginForm.username && loginForm.password) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          console.log('Logged in:', loginForm.username);
          // Here you would redirect to dashboard
          // window.location.href = '/dashboard';
        }, 1500);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate
    if (!signupForm.name || !signupForm.username || !signupForm.password || !signupForm.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }


    // Simulate API call
    setTimeout(() => {
      setSuccess('Account created successfully! Please login.');
      setSignupForm({ name: '', username: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setLoginForm({ username: '', password: '' });
    setSignupForm({ name: '', username: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 shadow-lg">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Movie Rental System</h1>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-lg">
            <button
              onClick={() => !loading && switchMode()}
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isLogin
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </div>
            </button>
            <button
              onClick={() => !loading && switchMode()}
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                !isLogin
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span>Sign Up</span>
              </div>
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-500 bg-opacity-10 border border-green-500 rounded-lg text-green-500 text-sm">
              {success}
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="your@username.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          ) : (
            // Sign Up Form
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="username"
                    value={signupForm.username}
                    onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="your@username.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;