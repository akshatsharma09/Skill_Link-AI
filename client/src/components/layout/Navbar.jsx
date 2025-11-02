import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-dark-800 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-dark-100 font-bold text-xl hover:text-primary-400 transition-colors">
              SkillLink AI
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>

                  {user.role === 'business' ? (
                    <Link
                      to="/workers"
                      className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Find Workers
                    </Link>
                  ) : (
                    <Link
                      to="/jobs"
                      className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Find Jobs
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-dark-200 hover:text-dark-100 hover:bg-dark-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;