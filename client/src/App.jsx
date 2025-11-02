import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobList from './pages/jobs/JobList';
import JobCreate from './pages/jobs/JobCreate';
import JobDetail from './pages/jobs/JobDetail';
import WorkerSearch from './pages/workers/WorkerSearch';
import WorkerProfile from './pages/workers/WorkerProfile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Debug badge to confirm App is rendering in the browser (remove later) */}
          <div className="fixed top-4 left-4 z-50 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold">DEV</div>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path="/profile"
                element={<PrivateRoute component={Profile} />}
              />
              <Route
                path="/jobs"
                element={<PrivateRoute component={JobList} />}
              />
              <Route
                path="/jobs/create"
                element={<PrivateRoute component={JobCreate} />}
              />
              <Route
                path="/jobs/:id"
                element={<PrivateRoute component={JobDetail} />}
              />
              <Route
                path="/workers"
                element={<PrivateRoute component={WorkerSearch} />}
              />
              <Route
                path="/workers/:id"
                element={<PrivateRoute component={WorkerProfile} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
