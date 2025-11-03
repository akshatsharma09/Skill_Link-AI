import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load job');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleApply = async (jobId) => {
    if (!user) {
      alert('Please login to apply for jobs');
      return;
    }

    try {
      setApplying(true);
      await api.post(`/jobs/${jobId}/apply`);
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply for job');
    } finally {
      setApplying(false);
    }
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

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Job not found.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{job.category} • {job.type}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">${job.budget}</div>
            <div className="text-sm text-gray-500">{job.location}</div>
          </div>
        </div>

        <div className="mt-6 text-gray-700">
          <p>{job.description}</p>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Required skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((s, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={job.client?.avatar || '/default-avatar.png'} alt={job.client?.name} className="h-10 w-10 rounded-full" />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{job.client?.name}</div>
              <div className="text-sm text-gray-500">Posted {new Date(job.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to={`/workers/${job.client?._id}`} className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">View Client</Link>
            <button
              onClick={() => handleApply(job._id)}
              disabled={applying}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
