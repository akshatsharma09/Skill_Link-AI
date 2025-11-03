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

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
