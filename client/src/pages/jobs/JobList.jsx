import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/jobs?${queryParams}`);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4" role="alert">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Available Jobs</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse through available job opportunities and find your next gig
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/jobs/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="form-input"
        >
          <option value="">All Categories</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="writing">Writing</option>
          <option value="admin">Admin Support</option>
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="form-input"
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="form-input"
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="on-site">On Site</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="form-input"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="budget-high">Budget: High to Low</option>
          <option value="budget-low">Budget: Low to High</option>
        </select>
      </div>

      {/* Job List */}
      <div className="mt-8 space-y-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your filters or check back later for new opportunities.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="hover:text-indigo-600"
                  >
                    {job.title}
                  </Link>
                </h2>
                <span className="badge badge-primary">
                  {job.type}
                </span>
              </div>

              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-4">{job.location}</span>
                <span className="mr-4">{job.category}</span>
                <span>${job.budget}</span>
              </div>

              <p className="mt-3 text-gray-700 line-clamp-2">
                {job.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={job.client.avatar || '/default-avatar.png'}
                    alt={job.client.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {job.client.name}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;