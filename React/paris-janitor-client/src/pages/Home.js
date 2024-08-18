// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Paris Janitor</h1>
            <p>Your one-stop solution for property management services.</p>
            <p>
                <Link to="/signup">Sign Up</Link> or <Link to="/login">Log In</Link> to manage your properties.
            </p>
        </div>
    );
}

export default Home;
