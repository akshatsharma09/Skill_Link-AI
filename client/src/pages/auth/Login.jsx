import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { SparklesIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);

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

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-secondary-500/6 rounded-full blur-2xl animate-float-gentle" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent-400/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Subtle particle overlay */}
      <div className="absolute inset-0 particles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <SparklesIcon className="h-16 w-16 text-primary-400 animate-pulse" />
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md animate-glow-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold gradient-text animate-gradient-x">
            Welcome Back
          </h2>
          <p className="mt-2 text-dark-300 text-lg">
            Sign in to your SkillLink AI account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10" ref={formRef}>
        <div className="bg-dark-800/80 backdrop-blur-lg py-8 px-6 shadow-2xl sm:rounded-2xl border border-dark-700/50 relative overflow-hidden">
          {/* Form background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 opacity-50" />

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="transition-all duration-300 focus:scale-105 pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-dark-400 hover:text-dark-200 transition-colors duration-200 focus:outline-none focus:text-dark-100"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="animate-fade-in-up text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3" style={{ animationDelay: '0.3s' }}>
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="animate-fade-in-up flex gap-4" style={{ animationDelay: '0.4s' }}>
              <Button
                type="submit"
                loading={loading}
                className="flex-1 py-3 text-lg font-semibold"
              >
                {loading ? 'Signing in...' : 'SignIn'}
              </Button>
              <Link to="/register" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold"
                >
                  SignUp
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
