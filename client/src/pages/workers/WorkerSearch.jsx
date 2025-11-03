import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const WorkerSearch = () => {
  const [workers, setWorkers] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWorkers = async (q = '') => {
    try {
      setIsLoading(true);
      const params = q ? `?q=${encodeURIComponent(q)}` : '';
      const res = await api.get(`/workers${params}`);
      setWorkers(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch workers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Find Workers</h1>
          <p className="mt-2 text-sm text-gray-600">Search local gig workers by skill, location or name.</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by skill, name or location"
          className="form-input flex-grow"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" type="submit">Search</button>
      </form>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="loading-spinner" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4" role="alert">
            <p className="text-red-700">{error}</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No workers found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {workers.map((w) => (
              <div key={w._id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={w.avatar || '/default-avatar.png'} alt={w.fullName} className="h-12 w-12 rounded-full" />
                  <div>
                    <Link to={`/workers/${w._id}`} className="text-lg font-medium text-gray-900 hover:underline">{w.fullName}</Link>
                    <div className="text-sm text-gray-500">{w.primarySkill || w.skills?.[0] || ''}</div>
                    <div className="text-sm text-gray-500">{w.location}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Rate: ${w.hourlyRate || '—'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerSearch;
