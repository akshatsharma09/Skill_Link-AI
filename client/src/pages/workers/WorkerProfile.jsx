import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const WorkerProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [worker, setWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messaging, setMessaging] = useState(false);
  const [hiring, setHiring] = useState(false);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/workers/${id}`);
        setWorker(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load worker');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchWorker();
  }, [id]);

  const handleMessage = async () => {
    if (!user) {
      alert('Please login to message workers');
      return;
    }

    try {
      setMessaging(true);
      // TODO: Implement messaging functionality
      alert('Messaging feature coming soon!');
    } catch (err) {
      alert('Failed to send message');
    } finally {
      setMessaging(false);
    }
  };

  const handleHire = async () => {
    if (!user) {
      alert('Please login to hire workers');
      return;
    }

    try {
      setHiring(true);
      // TODO: Implement hiring functionality
      alert('Hiring feature coming soon!');
    } catch (err) {
      alert('Failed to hire worker');
    } finally {
      setHiring(false);
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

  if (!worker) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Worker not found.</p>
        <Link to="/workers" className="text-indigo-600 hover:underline">Back to search</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center gap-6">
          <img src={worker.avatar || '/default-avatar.png'} alt={worker.fullName} className="h-20 w-20 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{worker.fullName}</h1>
            <div className="text-sm text-gray-600">{worker.location} • {worker.availability}</div>
            <div className="mt-2 text-sm text-gray-700">{worker.bio}</div>
          </div>
        </div>

        {worker.skills && worker.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {worker.skills.map((s, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Rate</div>
            <div className="text-lg font-semibold">${worker.hourlyRate || '—'}</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleMessage}
              disabled={messaging}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {messaging ? 'Messaging...' : 'Message'}
            </button>
            <button
              onClick={handleHire}
              disabled={hiring}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {hiring ? 'Hiring...' : 'Hire'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
