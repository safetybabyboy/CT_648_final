import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./component/login/index";
import SignUp from "./component/signup/index";
import Home from './component/homepage/index';
import SnakeGame from './component/snakegame/index';
import Lobby from './component/lobby';
import Statistics from './component/statistics/index';
import About from './component/about/index';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/snakegame" element={<SnakeGame />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

