import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // เก็บสถานะสมัครสมาชิก
  const navigate = useNavigate(); // ใช้ในการเปลี่ยนหน้าเมื่อสมัครสำเร็จ

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการ refresh หน้า

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true); // สมัครสำเร็จ
        setTimeout(() => {
          navigate('/login'); // เปลี่ยนหน้าไปที่หน้า Login หลังจาก 2 วินาที
        }, 2000);
      } else {
        setIsSuccess(false); // สมัครไม่สำเร็จ (เช่น ชื่อซ้ำ)
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSuccess(false); // แสดงข้อผิดพลาด
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
        <div>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}>Home</Link>
        </div>
      </nav>

      <div className="comic-signup-card">
        <div className="signup-header">
          <h2>Create account</h2>
        </div>
        <form className="signup-body" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">Create account</button>
        </form>

        {/* ป็อปอัพสถานะการสมัครสมาชิก */}
        {isSuccess === true && (
          <div className="popup success">
            <p>สมัครสมาชิกสำเร็จ! กำลังเปลี่ยนหน้า...</p>
          </div>
        )}
        {isSuccess === false && (
          <div className="popup error">
            <p>สมัครสมาชิกไม่สำเร็จ: ชื่อผู้ใช้หรืออีเมลซ้ำ</p>
          </div>
        )}

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
}
