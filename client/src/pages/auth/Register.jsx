import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { SparklesIcon, UserIcon, BriefcaseIcon, EyeIcon, EyeSlashIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'worker', // or 'business'
    firstName: '',
    lastName: '',
  });

  const [validationError, setValidationError] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    // Reset validation error when form data changes
    setValidationError('');
  }, [formData]);

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

  const handleAddSkill = (e) => {
    e.preventDefault();
    const s = newSkill.trim();
    if (!s) return;
    if (!skills.includes(s)) setSkills((prev) => [...prev, s]);
    setNewSkill('');
  };

  const handleRemoveSkill = (s) => {
    setSkills((prev) => prev.filter((x) => x !== s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    try {
      // Transform form data to match API expectations
      const userData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          skills: skills,
        },
      };

      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google registration error:', err);
    }
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

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <SparklesIcon className="h-16 w-16 text-primary-400 animate-pulse" />
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md animate-glow-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold gradient-text animate-gradient-x">
            Join SkillLink AI
          </h2>
          <p className="mt-2 text-dark-300 text-lg">
            Create your account and start connecting with opportunities
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10" ref={formRef}>
        <div className="bg-dark-800/80 backdrop-blur-lg py-8 px-6 shadow-2xl sm:rounded-2xl border border-dark-700/50 relative overflow-hidden">
          {/* Form background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 opacity-50" />

          {/* Google Sign Up Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center py-3 mb-6"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-dark-400">Or register with email</span>
              </div>
            </div>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium text-dark-300 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'worker' })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === 'worker'
                      ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                      : 'border-dark-600 bg-dark-700/50 text-dark-300 hover:border-primary-500/50'
                  }`}
                >
                  <UserIcon className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Skilled Worker</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'business' })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === 'business'
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-dark-600 bg-dark-700/50 text-dark-300 hover:border-accent-500/50'
                  }`}
                >
                  <BriefcaseIcon className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Business Owner</div>
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="transition-all duration-300 focus:scale-105"
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            {/* Email */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
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
              <div className="relative">
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="transition-all duration-300 focus:scale-105 pr-12"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-9 text-dark-400 hover:text-dark-200 transition-colors duration-200 focus:outline-none focus:text-dark-100"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Skills Section */}
            {formData.role === 'worker' && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <label className="block text-sm font-medium text-dark-300 mb-3">Skills</label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., React, Plumbing)"
                    className="flex-grow transition-all duration-300 focus:scale-105"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                  />
                  <Button
                    type="button"
                    onClick={handleAddSkill}
                    variant="outline"
                    size="sm"
                    className="px-4"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm border border-primary-500/30">
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="ml-2 text-primary-400 hover:text-primary-200 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error Messages */}
            {(error || validationError) && (
              <div className="animate-fade-in-up text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3" style={{ animationDelay: '0.6s' }}>
                {error || validationError}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="animate-fade-in-up flex gap-4" style={{ animationDelay: '0.7s' }}>
              <Button
                type="submit"
                loading={loading}
                className="flex-1 py-3 text-lg font-semibold"
              >
                {loading ? 'Signing up...' : 'SignUp'}
              </Button>
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold"
                >
                  SignIn
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
