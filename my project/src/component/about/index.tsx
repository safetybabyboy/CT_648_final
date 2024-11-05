import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#333',
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

      {/* About Content */}
      <div 
      style={{
        marginTop: '5100px', 
        padding: '20px', 
        maxWidth: '1200px', 
        lineHeight: '1.6', 
        backgroundColor: '#FFC0CB',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>โครงการ CT_648_final</h1>

        <section style={{ marginBottom: '30px' }}>
          <h2>บทนำ</h2>
          <p>โครงการนี้เป็นส่วนหนึ่งของวิชา CT648 เป็นการพัฒนาเว็บแอปพลิเคชันที่ถูกสร้างขึ้นเพื่อเป็นตัวอย่างการออกแบบ ระบบเว็บที่มีการรับ-ส่ง API และระบบฐานข้อมูล</p>
        </section>

        <section style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2>แผนภาพโครงสร้าง</h2>
          <img src="/pic/1.jpg" alt="โครงสร้างโครงการ" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>รายละเอียด</h2>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Homepage</h3>
            <p>หน้า Homepage ที่มี Link ไปที่หน้า Login และ Create account</p>
            <img src="/pic/2.JPG" alt="Homepage" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Create account</h3>
            <p>หน้า Create account ส่ง API ไปที่ server เพื่อตรวจสอบข้อมูลซ้ำและบันทึกข้อมูลสมาชิกลงไปในฐานข้อมูล</p>
            <img src="/pic/4.JPG" alt="Create account" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Login</h3>
            <p>หน้า Login ตรวจสอบข้อมูลสมาชิกโดยการส่ง API ไปให้ server ตรวจสอบข้อมูลสมาชิกในฐานข้อมูล</p>
            <img src="/pic/3.JPG" alt="Login" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Lobby</h3>
            <p>หน้า Lobby เป็นหน้าสำหรับสมาชิกที่ผ่านการ Login เข้ามา มี link ไปที่หน้า snakegame</p>
            <img src="/pic/5.JPG" alt="Lobby" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Snakegame</h3>
            <p>หน้า snakegame เป็นหน้าสำหรับเล่นเกม เมื่อเล่นเกมจบ (Gameover) จะส่ง API ไปที่ server เพื่อบันทึกสถิติการเล่น</p>
            <img src="/pic/6.JPG" alt="Snakegame" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
            <p>หน้า snakegame จะนำ API จากเว็ป unsplash.com มาใช้เป็นพื้นหลังของบอร์ดเกม</p>
            <img src="/pic/8.jpg" alt="Snakegame Background" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>หน้า Statistics</h3>
            <p>หน้า statistics เป็นหน้าสำหรับดูข้อมูลสถิติการเล่นของ user</p>
            <img src="/pic/7.JPG" alt="Statistics" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>โครงสร้างโปรเจค</h2>
          <img src="/pic/9.jpg" alt="Statistics" style={{ width: '100%', maxWidth: '800px', height: 'auto', display: 'block', margin: '10px auto' }} />
        </section>

        <section>
          <h2>วิธีการติดตั้ง</h2>
          <ol>
            <li>โคลน repository: <code>git clone https://github.com/safetybabyboy/CT_648_final.git</code></li>
            <li>เข้าไปยังโฟลเดอร์โปรเจกต์: <code>cd CT_648_final</code></li>
            <li>รัน Docker: <code>docker-compose up --build</code></li>
          </ol>
        </section>

        {/* GitHub Link Section */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2>ดูรายละเอียดเพิ่มเติมได้ที่ GitHub:</h2>
          <a
            href="https://github.com/safetybabyboy/CT_648_final.git"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#333', fontWeight: 'bold', textDecoration: 'none' }}
          >
            https://github.com/safetybabyboy/CT_648_final.git
          </a>
        </div>
      </div>
    </>
  );
}
