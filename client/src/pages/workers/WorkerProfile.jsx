import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/workers/${id}`);
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
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">Message</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">Hire</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
