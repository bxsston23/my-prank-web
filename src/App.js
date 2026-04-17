import React, { useState, useEffect } from 'react';
import './App.css';

// Import รูปภาพ (ตรวจสอบให้แน่ใจว่าย้ายโฟลเดอร์ img เข้ามาใน src แล้ว)
import gey from './img/gey.jpg';
import gey1 from './img/gey1.jpg';

function App() {
  const [step, setStep] = useState(1);
  const [currentImg, setCurrentImg] = useState(null);
  
  // สร้าง State สำหรับนับเวลาถอยหลัง (หน่วยเป็นวินาที)
  // 135 วินาที = 2 นาที 15 วินาที
  const [timeLeft, setTimeLeft] = useState(135);

  const friendImages = [gey, gey1];

  // --- ส่วนของ Logic การนับถอยหลัง ---
  useEffect(() => {
    // ถ้าเวลาหมดแล้ว ไม่ต้องทำอะไร
    if (timeLeft <= 0) return;

    // สั่งให้ลดค่า timeLeft ทุกๆ 1 วินาที (1000ms)
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // ล้างข้อมูลเมื่อออกจาก Component เพื่อไม่ให้เครื่องค้าง
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // ฟังก์ชันแปลงวินาทีเป็นรูปแบบ 00:00:00
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    const randomIdx = Math.floor(Math.random() * friendImages.length);
    setCurrentImg(friendImages[randomIdx]);
    setStep(2);
  };

  return (
    <div className="shopping-container">
      {step === 1 ? (
        <div className="promo-card">
          <div className="badge">Limited Time</div>
          <img 
            src="https://img.freepik.com/free-vector/flash-sale-banner-with-product-description_1361-2098.jpg" 
            alt="Sale" 
            className="promo-img"
          />
          <div className="content">
            <h2>คูปองส่วนลด 90% ทุกรายการ! 🏷️</h2>
            <p>สิทธิ์พิเศษสำหรับคุณคนเดียวเท่านั้น</p>
            {/* เรียกใช้ฟังก์ชัน formatTime เพื่อแสดงผลตัวเลขที่กำลังวิ่ง */}
            <div className="timer">หมดเขตใน: {formatTime(timeLeft)}</div>
            <button className="claim-btn" onClick={handleClaim}>
              เก็บคูปองเลย!
            </button>
          </div>
        </div>
      ) : (
        <div className="reveal-box">
          <h1 className="reveal-text">🌈 ยินดีด้วย! 🌈</h1>
          <img src={currentImg} alt="Friend" className="friend-img" />
          <h2 className="reveal-subtext">คุณได้เป็นเกย์แล้ว</h2>
          <div className="rainbow-bg"></div>
          <p className="joke-footer">โดนหลอกแล้วไอ้เกย์ 5555555</p>
          <button className="back-btn" onClick={() => { setStep(1); setTimeLeft(135); }}>ลองใหม่</button>
        </div>
      )}
    </div>
  );
}

export default App;