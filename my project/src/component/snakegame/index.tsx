import React, { useEffect, useState } from 'react';
import Navbar from '../../component/navbar';
import './index.css';
import { Link, useLocation } from 'react-router-dom';

interface LocationState {
  state: {
    username: string;
  };
}

interface SnakePart {
  Xpos: number;
  Ypos: number;
}

interface Apple {
  Xpos: number;
  Ypos: number;
}

const SnakeGame: React.FC = () => {
  const location = useLocation() as LocationState;
  const { username } = location.state || { username: 'Guest' };

  const [snake, setSnake] = useState<SnakePart[]>([
    { Xpos: 100, Ypos: 100 },
    { Xpos: 90, Ypos: 100 },
    { Xpos: 80, Ypos: 100 },
  ]);
  const [apple, setApple] = useState<Apple>({ Xpos: 200, Ypos: 200 });
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(200);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSpeedBoosted, setIsSpeedBoosted] = useState<boolean>(false);
  const [backgroundUrl, setBackgroundUrl] = useState(''); // เพิ่ม state สำหรับภาพพื้นหลัง
  
  

  let gameInterval: any; // แก้ไขเพื่อหลีกเลี่ยงข้อผิดพลาด TypeScript
  let timerInterval: any;

  const fetchRandomBackground = async () => {
    const url = 'https://api.unsplash.com/photos/random?query=nature&client_id=Xnu4uOIiYcC1F8jkWurkOOM4SXPXuUMSmeoPe6Gg0X0';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBackgroundUrl(data.urls.full); // เก็บ URL ของภาพไว้ใน state
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };

  const startGame = () => {
    fetchRandomBackground(); // ดึงภาพใหม่ทุกครั้งที่เริ่มหรือรีสตาร์ทเกม
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0); // รีเซ็ตคะแนนเมื่อเริ่มเกมใหม่
    setGameSpeed(200); // รีเซ็ตความเร็วเมื่อเริ่มเกมใหม่
    setElapsedTime(0); // รีเซ็ตเวลาเมื่อเริ่มเกมใหม่
    setSnake([
      { Xpos: 100, Ypos: 100 },
      { Xpos: 90, Ypos: 100 },
      { Xpos: 80, Ypos: 100 },
    ]);
    setApple({ Xpos: 200, Ypos: 200 });
    setDirection('RIGHT');
  };

  // จับเวลาเมื่อเกมเริ่ม
  useEffect(() => {
    if (isPlaying) {
      timerInterval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerInterval) clearInterval(timerInterval); // หยุดจับเวลาเมื่อเกมหยุด
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval); // ทำความสะอาดเมื่อ component ถูกทำลาย
    };
  }, [isPlaying]);

  // การควบคุมทิศทางของงู
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ': // ปุ่ม Space bar เพิ่มความเร็ว
          if (!isSpeedBoosted) {
            setGameSpeed((prevSpeed) => prevSpeed / 2);
            setIsSpeedBoosted(true);
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') { // ปล่อยปุ่ม Space bar ลดความเร็ว
        setGameSpeed((prevSpeed) => prevSpeed * 2);
        setIsSpeedBoosted(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [direction, isSpeedBoosted]);

  // การเคลื่อนที่ของงู
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      const interval = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, direction, snake]);

  const moveSnake = () => {
    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.Ypos -= 10;
        break;
      case 'DOWN':
        head.Ypos += 10;
        break;
      case 'LEFT':
        head.Xpos -= 10;
        break;
      case 'RIGHT':
        head.Xpos += 10;
        break;
    }

    // ออกอีกด้านเมื่อชนขอบ
    if (head.Xpos < 0) head.Xpos = 490;
    if (head.Xpos >= 500) head.Xpos = 0;
    if (head.Ypos < 0) head.Ypos = 490;
    if (head.Ypos >= 500) head.Ypos = 0;

    // ตรวจสอบชนตัวเอง
    if (newSnake.some((part) => part.Xpos === head.Xpos && part.Ypos === head.Ypos)) {
      handleGameOver();
      return;
    }

    // ตรวจสอบว่ากินแอปเปิล
    if (head.Xpos === apple.Xpos && head.Ypos === apple.Ypos) {
      newSnake.push({ Xpos: apple.Xpos, Ypos: apple.Ypos });
      setApple({
        Xpos: Math.floor(Math.random() * 50) * 10,
        Ypos: Math.floor(Math.random() * 50) * 10,
      });
      setScore(score + 1);
      setGameSpeed((prevSpeed) => prevSpeed * 0.95); // เพิ่มความเร็วเมื่อกินแอปเปิล
    } else {
      newSnake.pop();
    }

    newSnake.unshift(head);
    setSnake(newSnake);
  };

  const handleGameOver = async () => {
    setIsGameOver(true);
    setIsPlaying(false);
    if (timerInterval) clearInterval(timerInterval); // หยุดจับเวลาเมื่อเกมจบ

    try {
      await fetch('http://localhost:5000/api/statistics/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score , time: elapsedTime }),
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div className="game-container">
      <Navbar username={username} />
      <div className="score-board">
        <p>Score: {score}</p>
        <p>Time: {elapsedTime} seconds</p>
      </div>

      <div
        className="game-board"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {snake.map((part, index) => (
          <div
            key={index}
            className={`snake-part ${index === 0 ? 'snake-head' : 'snake-tail'}`}
            style={{ left: part.Xpos, top: part.Ypos }}
          ></div>
        ))}
        <div className="apple" style={{ left: apple.Xpos, top: apple.Ypos }}></div>
      </div>

      {isGameOver && (
        <div className="popup">
          <p>Game Over! Your score: {score}</p>
          <p>Time played: {elapsedTime} seconds</p>
          <button onClick={startGame}>Restart</button>
          <Link to="/lobby" state={{ username }}>
            <button>Back to Lobby</button>
          </Link>
        </div>
      )}

      {!isPlaying && !isGameOver && (
        <div className="start-screen">
          <h1>Snake Game</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

