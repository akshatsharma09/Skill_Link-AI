import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page not found.</p>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Go home</Link>
      </div>
    </div>
  );
};

export default NotFound;
