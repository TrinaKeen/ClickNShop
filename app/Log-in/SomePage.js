// pages/SomePage.js
import React from 'react';
import { useAuth } from './contexts/AuthContext';

const SomePage = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {user ? <p>Welcome, {user.email}</p> : <p>Please log in.</p>}
        </div>
    );
};

export default SomePage;
