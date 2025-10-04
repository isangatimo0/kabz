import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">KABZ Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.firstName}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>
      <div className="p-6">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.role === 'TENANT' && (
            <>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">My Leases</h3>
                <p>View your active leases</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Payments</h3>
                <p>Track your rent payments</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Maintenance</h3>
                <p>Submit maintenance requests</p>
              </div>
            </>
          )}
          {user.role === 'PROPERTY_MANAGER' && (
            <>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Properties</h3>
                <p>Manage properties and units</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Tenants</h3>
                <p>Manage tenant information</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Reports</h3>
                <p>View financial reports</p>
              </div>
            </>
          )}
          {user.role === 'LANDLORD' && (
            <>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">My Properties</h3>
                <p>View owned properties</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Income Reports</h3>
                <p>Track rental income</p>
              </div>
            </>
          )}
          {user.role === 'ADMIN' && (
            <>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">User Management</h3>
                <p>Manage all users</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">System Reports</h3>
                <p>Full system analytics</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;