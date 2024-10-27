// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { connectDB, sequelize } from './config/db';
// import authRoutes from './routes/auth';
// import statisticRoutes from './routes/statistics';

// dotenv.config(); //คำสั่งใช้ข้อมูลใน .env ที่อยู่ในโฟเดอร์นี้ เพื่อเชื่อมต่อกับฐานข้อมูล

// const app = express();
// const PORT = process.env.PORT || 5000;

// // เชื่อมต่อกับฐานข้อมูล
// connectDB();

// // Middleware
// app.use(cors());  // เปิดให้ API รองรับ CORS
// app.use(express.json()); // รองรับ JSON request body

// // ใช้คำสั่ง { force: true } เพื่อลบตารางเก่าและสร้างตารางใหม่ / { alter: true } เพื่อใช้งานตารางเดิม
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database & tables sync!');
// }).catch((error) => {
//   console.error('Unable to sync database:', error);
// });

// // คำสั่งในการนำ api ไปใช้งาน
// app.use('/api/auth', authRoutes);
// app.use('/api/statistics', statisticRoutes);

// // เริ่มเซิร์ฟเวอร์
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, sequelize } from './config/db';
import authRoutes from './routes/auth';
import statisticRoutes from './routes/statistics';

dotenv.config(); // โหลดค่าจาก .env

const app = express();
const PORT = process.env.PORT || 5000;

// ฟังก์ชันเชื่อมต่อฐานข้อมูล
const startServer = async () => {
  try {
    console.log('📡 Starting the server...'); // แสดงว่าเซิร์ฟเวอร์กำลังเริ่ม
    // เชื่อมต่อฐานข้อมูล
    await connectDB();
    console.log('Connected to the database.');

    // Sync ตารางในฐานข้อมูล (ใช้ alter เพื่อป้องกันการลบข้อมูลเก่า)
    await sequelize.sync({ alter: true });
    console.log('Database & tables sync!');

    // Middleware
    app.use(cors()); // เปิดให้ API รองรับ CORS
    app.use(express.json()); // รองรับ JSON request body

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/statistics', statisticRoutes);

    // เริ่มเซิร์ฟเวอร์
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1); // ปิดโปรเซสหากเกิดข้อผิดพลาดร้ายแรง
  }
};

// เรียกใช้ฟังก์ชันเพื่อเริ่มเซิร์ฟเวอร์
startServer();