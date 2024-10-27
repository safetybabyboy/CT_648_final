import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Comic Sans MS, sans-serif' }}>
      
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
        <Link to="/login" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Login</Link>
        <Link to="/signup" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Create account</Link>
      </nav>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        // background: 'linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)',
      }}>
        <h1 style={{
          fontSize: '48px',
          color: '#fff',
          textShadow: '2px 2px 4px #000',
        }}>Welcome to My Game</h1>

        {/* Image */}
        <div style={{ marginTop: '30px' }}>
        <img src="/pic/game.png" alt="Game" style={{
            width: '500px',
            height: 'auto',
            // border: '5px solid #fff',
            // borderRadius: '15px',
            // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          }} />
        </div>
      </div>
    </div>
  );
}
