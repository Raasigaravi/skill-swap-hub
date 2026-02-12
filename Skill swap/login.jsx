import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo purposes, allow any login
      if (email && password) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        alert(`✅ Logged in successfully!`);
        navigate('/dashboard');
      } else {
        alert('Please enter email and password');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '2rem',
    color: '#3E54AC',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3E54AC',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  link: {
    color: '#3E54AC',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginPage;
