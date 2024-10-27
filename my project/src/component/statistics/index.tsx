import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../component/navbar';

interface Statistic {
  username: string;
  score: number;
  time: number;
  date: string;
}

interface LocationState {
  state: {
    username: string;
  };
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const location = useLocation() as LocationState;
  const { username } = location.state || { username: 'Guest' }; // ถ้าไม่มีชื่อผู้ใช้ให้แสดงเป็น Guest

  useEffect(() => {
    fetch('http://localhost:5000/api/statistics')
      .then((res) => res.json())
      .then((data) => setStatistics(data.slice(0, 10))) // แสดงเฉพาะ 10 อันดับแรก
      .catch((error) => console.error('Error fetching statistics:', error));
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar username={username} />
      <div style={{ marginTop: '60px', padding: '20px' }}>
        <h1>Game Statistics</h1>
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0}
          style={{
            width: '100%',
            textAlign: 'left',
            backgroundColor: 'white',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#ddd' }}>
              <th>Username</th>
              <th>Score</th>
              <th>Time (seconds)</th> {/* เพิ่มคอลัมน์เวลา */}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {statistics.length > 0 ? (
              statistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.username}</td>
                  <td>{stat.score}</td>
                  <td>{stat.time}</td> {/* แสดงเวลาเล่น */}
                  <td>{new Date(stat.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  No statistics available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            to="/lobby"
            state={{ username }}
            style={{
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '5px',
              display: 'inline-block',
            }}
          >
            Back to Lobby
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Statistics;



