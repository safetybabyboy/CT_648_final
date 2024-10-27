import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // เก็บข้อผิดพลาด
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการ refresh หน้า

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response data:', data); // Debug ข้อมูลตอบกลับ

      if (response.ok) {
        // หากเข้าสู่ระบบสำเร็จ เปลี่ยนไปหน้า Lobby พร้อมส่งข้อมูลผู้ใช้
        navigate('/lobby', { state: { username: data.username } });
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav style={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        background: '#333',
        padding: '10px',
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: '1000',
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Home</Link>
      </nav>

      {/* Login Form */}
      <div className="comic-login-card" style={{ marginTop: '60px' }}>
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <form className="card-body" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* แสดงข้อผิดพลาดหากมี */}
        {error && <div className="popup error">{error}</div>}

        <div className="card-footer">
          <p>Don't have an account? <Link to="/signup">Create account</Link></p>
        </div>
      </div>
    </>
  );
}
