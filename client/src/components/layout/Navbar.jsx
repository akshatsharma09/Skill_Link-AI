import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SparklesIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-dark-900/95 backdrop-blur-lg shadow-2xl shadow-primary-500/10 border-b border-primary-500/20'
        : 'bg-dark-800/80 backdrop-blur-sm border-b border-dark-700/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="group relative text-dark-100 font-bold text-xl hover:text-primary-400 transition-all duration-300 flex items-center gap-2"
            >
              <div className="relative">
                <SparklesIcon className="h-8 w-8 text-primary-400 animate-pulse" />
                <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="relative">
                SkillLink AI
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link
                to="/"
                className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                  >
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {user.role === 'business' ? (
                    <Link
                      to="/workers"
                      className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                    >
                      <span className="relative z-10">Find Workers</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ) : (
                    <Link
                      to="/jobs"
                      className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                    >
                      <span className="relative z-10">Find Jobs</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                  >
                    <span className="relative z-10">Profile</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <button
                    onClick={logout}
                    className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group relative text-dark-200 hover:text-dark-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700/50 hover:scale-105"
                  >
                    <span className="relative z-10">SignIn</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <Link
                    to="/register"
                    className="group relative bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">SignUp</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 animate-shimmer opacity-20" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-dark-200 hover:text-dark-100 p-2 rounded-lg hover:bg-dark-700/50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800/95 backdrop-blur-lg border-t border-dark-700/50">
          <Link
            to="/"
            className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>

              {user.role === 'business' ? (
                <Link
                  to="/workers"
                  className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Workers
                </Link>
              ) : (
                <Link
                  to="/jobs"
                  className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Jobs
                </Link>
              )}

              <Link
                to="/profile"
                className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SignIn
              </Link>
              <Link
                to="/register"
                className="block bg-gradient-to-r from-primary-600 to-primary-500 text-white px-3 py-2 rounded-lg text-base font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
