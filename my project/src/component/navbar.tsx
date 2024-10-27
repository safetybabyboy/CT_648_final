import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // รีเซ็ตสถานะเมื่อ Logout
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: '#333',
      padding: '10px',
      position: 'fixed',
      width: '100%',
      top: '0',
      left: '0',
      zIndex: '1000',
    }}>
      <div style={{ 
        color: 'white', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginLeft: '20px' , 
        marginTop: '10px' ,
        }}>
        Welcome, {username}
      </div>
      <div>
        <Link to="/profile" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Profile</Link>
        <Link to="/statistics" state={{ username }} style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Statistics</Link>
        <button onClick={handleLogout} style={{
          color: 'white',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          marginRight: '20px',
        }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
