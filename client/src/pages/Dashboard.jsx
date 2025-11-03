import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (user.role === 'worker') {
        const res = await api.get("/jobs/matched");
        setJobs(res.data);
      } else {
        const res = await api.get("/jobs");
        setJobs(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-dark-100 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user.profile?.firstName || 'User'}!
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {user.role === 'business' && (
            <Link
              to="/jobs/create"
              className="ml-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Post a New Job
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-dark-100 mb-4">
          {user.role === 'worker' ? 'Matched Jobs' : 'Your Posted Jobs'}
        </h3>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="relative rounded-lg border border-dark-600 bg-dark-800 px-6 py-5 shadow-sm flex flex-col hover:border-dark-500"
            >
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-dark-100">{job.title}</h4>
                <p className="mt-1 text-sm text-dark-300">{job.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full bg-primary-800 px-2.5 py-0.5 text-xs font-medium text-primary-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-dark-300">
                  {job.location.city}, {job.budget.amount} {job.budget.currency}
                </div>
                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-flex items-center rounded-md bg-dark-700 px-2.5 py-1.5 text-sm font-semibold text-primary-400 shadow-sm ring-1 ring-inset ring-dark-600 hover:bg-dark-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-dark-100">No jobs found</h3>
            <p className="mt-1 text-sm text-dark-300">
              {user.role === 'worker'
                ? "We'll notify you when new matching jobs are posted."
                : "Get started by posting your first job."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
