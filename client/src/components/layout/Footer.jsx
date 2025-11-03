import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-dark-800 to-dark-900 border-t border-dark-700/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8" ref={footerRef}>
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand section */}
          <div className="space-y-8 xl:col-span-1 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="relative">
                <SparklesIcon className="h-10 w-10 text-primary-400 animate-pulse" />
                <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md animate-glow-pulse" />
              </div>
              <div className="text-dark-100 font-bold text-2xl gradient-text animate-gradient-x">
                SkillLink AI
              </div>
            </div>
            <p className="text-dark-300 text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connecting skilled professionals with local businesses through AI-powered matching.
              Building the future of work, one connection at a time.
            </p>
            <div className="flex space-x-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {/* Social media links with hover effects */}
              <a
                href="#"
                className="group p-3 rounded-xl bg-dark-700/50 hover:bg-primary-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <svg className="h-6 w-6 text-dark-300 group-hover:text-primary-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group p-3 rounded-xl bg-dark-700/50 hover:bg-primary-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <svg className="h-6 w-6 text-dark-300 group-hover:text-primary-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="group p-3 rounded-xl bg-dark-700/50 hover:bg-primary-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <svg className="h-6 w-6 text-dark-300 group-hover:text-primary-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-dark-100 tracking-wider uppercase mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" />
                  For Workers
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/jobs"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Find Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Skills & Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Training & Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-dark-100 tracking-wider uppercase mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full" />
                  For Businesses
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/jobs/create"
                      className="group flex items-center text-base text-dark-300 hover:text-accent-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Post Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/workers"
                      className="group flex items-center text-base text-dark-300 hover:text-accent-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Find Workers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="group flex items-center text-base text-dark-300 hover:text-accent-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Business Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-dark-100 tracking-wider uppercase mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" />
                  Company
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/register"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="group flex items-center text-base text-dark-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-dark-100 tracking-wider uppercase mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full" />
                  Support
                </h3>
                <ul className="space-y-4">
                  <li className="text-base text-dark-300">
                    Email: support@skilllink.ai
                  </li>
                  <li className="text-base text-dark-300">
                    Phone: +91 (XXX) XXX-XXXX
                  </li>
                  <li className="text-base text-dark-300">
                    Address: Your City, Country
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-dark-700/50 pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-dark-300">
              &copy; {new Date().getFullYear()} SkillLink AI. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center gap-2 text-dark-400">
              <span>Made with</span>
              <HeartIcon className="h-5 w-5 text-accent-400 animate-pulse" />
              <span>for the future of work</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
