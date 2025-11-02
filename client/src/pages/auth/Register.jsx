import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

  useEffect(() => {
    // Reset validation error when form data changes
    setValidationError('');
  }, [formData]);

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

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="/hero-illustration.svg" alt="SkillLink AI Illustration" className="mx-auto h-24 w-24 mb-4" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-100">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-dark-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="worker">Skilled Worker</option>
                <option value="business">Business Owner</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-dark-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Skills tags */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-dark-300">Skills</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="form-input flex-grow px-3 py-2 border border-dark-600 bg-dark-700 text-dark-100 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <button onClick={handleAddSkill} className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-500">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center px-3 py-1 rounded-full bg-dark-600 text-dark-100 text-sm">
                    {s}
                    <button type="button" onClick={() => handleRemoveSkill(s)} className="ml-2 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Error Messages */}
            {(error || validationError) && (
              <div className="text-red-600 text-sm mt-2">
                {error || validationError}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;