// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/Api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const response = await fetchUserProfile();
                setUser(response.data);
            } catch (error) {
                setError('Failed to load user profile');
                if (error.response && error.response.status === 401) {
                    // Token might be invalid or expired, redirect to login
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <p>Welcome, {user.name} {user.firstname}!</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
}

export default Dashboard;
