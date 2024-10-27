import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../component/navbar';

// คำสั่งส่งค่าชื่อผู้ใช้งาน
interface LocationState {
  state: {
    username: string;
  };
}

const Lobby: React.FC = () => {
  const location = useLocation() as LocationState;
  const { username } = location.state || { username: 'Guest' }; // ถ้าไม่มีชื่อผู้ใช้ให้แสดงเป็น Guest

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Comic Sans MS, sans-serif' }}>
      <Navbar username={username} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        marginTop: '200px',
      }}>
        <h1>Welcome to My Game</h1>

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <Link to="/snakegame" state={{ username }}>
            <img src="/pic/game1.jpg" alt="Game 1" style={{
              width: '300px',
              height: '300px',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lobby;

