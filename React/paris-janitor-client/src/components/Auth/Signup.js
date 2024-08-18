import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Membre');  // rôle par défaut
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { name, firstname, email, password, role });
            
            if (response && response.data) {
                // Redirect to login page after successful signup
                navigate('/login');
            } else {
                throw new Error('Signup failed. No response data received.');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            // Afficher un message d'erreur à l'utilisateur
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    type="text" 
                    value={firstname} 
                    onChange={(e) => setFirstname(e.target.value)} 
                    placeholder="Firstname" 
                    required 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Membre">Membre</option>
                    <option value="Administrateur">Administrateur</option>
                    <option value="Owner">Owner</option>
                    <option value="Invité">Invité</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
