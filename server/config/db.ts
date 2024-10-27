// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config(); // โหลดค่าจาก .env

// const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD!,
//   {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'postgres',
//     port: Number(process.env.DB_PORT) || 5432,
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('PostgreSQL connected successfully.');
//   } catch (error) {
//     console.error('Unable to connect to PostgreSQL:', error);
//     process.exit(1);
//   }
// };

// export { sequelize, connectDB };


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // โหลดค่าจาก .env

// ตรวจสอบค่าตัวแปรสิ่งแวดล้อมก่อนสร้างอินสแตนซ์
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 5432;

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error('Missing database configuration in .env file.');
  process.exit(1); // ปิดโปรเซสหากค่าจำเป็นหายไป
}

// สร้างอินสแตนซ์ของ Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT,
  logging: false, // ปิดการ log SQL queries
  pool: {
    max: 5, // จำนวนการเชื่อมต่อสูงสุด
    min: 0, // จำนวนการเชื่อมต่อขั้นต่ำ
    acquire: 30000, // เวลาที่รอการเชื่อมต่อ (30 วินาที)
    idle: 10000, // เวลาว่างที่การเชื่อมต่อจะถูกปิด (10 วินาที)
  },
});

// ฟังก์ชันเชื่อมต่อกับฐานข้อมูล
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
    process.exit(1); // ปิดโปรเซสหากเชื่อมต่อไม่สำเร็จ
  }
};

export { sequelize, connectDB };

