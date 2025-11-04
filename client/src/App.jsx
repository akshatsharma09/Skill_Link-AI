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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              <main className="flex-grow container mx-auto px-4 py-8">
                <Login />
              </main>
            } />
            <Route path="/register" element={
              <main className="flex-grow container mx-auto px-4 py-8">
                <Register />
              </main>
            } />
            <Route
              path="/dashboard"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={Dashboard} />
                </main>
              }
            />
            <Route
              path="/profile"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={Profile} />
                </main>
              }
            />
            <Route
              path="/jobs"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={JobList} />
                </main>
              }
            />
            <Route
              path="/jobs/create"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={JobCreate} />
                </main>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={JobDetail} />
                </main>
              }
            />
            <Route
              path="/workers"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={WorkerSearch} />
                </main>
              }
            />
            <Route
              path="/workers/:id"
              element={
                <main className="flex-grow container mx-auto px-4 py-8">
                  <PrivateRoute component={WorkerProfile} />
                </main>
              }
            />
            <Route path="*" element={
              <main className="flex-grow container mx-auto px-4 py-8">
                <NotFound />
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
