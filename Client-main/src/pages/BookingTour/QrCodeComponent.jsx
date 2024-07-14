// src/QrCodeComponent.jsx
import React from 'react';
import qrCodeImage from './QRCode.jpg'; // Import ảnh QR Code
import Navbar from '../../layout/Navbar';
import NavbarLogin from '../../layout/NavbarLogin/index';
import NavbarPartnerLogin from '../../layout/NavbarPartnerLogin/index.jsx';
import Footer from '../../layout/Footer';
import './QrCodeComponent.css';  // Import file CSS
import { useState } from 'react';
import { useEffect } from 'react';
import Aos from 'aos';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';

const QrCodeComponent = () => {
  const bank = 'Vietinbank';
  const name = 'Nguyen Minh Quang';
  const accountNumber = '101871395719';
  // const totalAmount = '500,000 VND';  
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    // Lấy tổng số chi phí từ localStorage
    const amount = localStorage.getItem('totalCost');
    if (amount) {
      setTotalAmount(amount);
    }
  }, []);


  const paymentSteps = [
    'Bước 1: Quét mã QR để mở ứng dụng ngân hàng của bạn.',
    'Bước 2: Nhập số tiền cần thanh toán.',
    'Bước 3: Xác nhận thanh toán và hoàn tất giao dịch.',
    'Bước 4: Lưu lại biên lai thanh toán của bạn.'
  ];

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      axios
        .get(`http://localhost:8080/api/user/${userId}`)
        .then((response) => {
          const userData = response.data.data;
          setUser(userData);
          const rid = decodedToken.role;
          if (rid === 'PARTNER') {
            setLogPartner(true);
          } else {
            setLogPartner(false);
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, []);

  const [logPartner, setLogPartner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        logPartner ? (
          <NavbarPartnerLogin />
        ) : (
          <NavbarLogin />
        )
      ) : (
        <Navbar />
      )} 
      <section className="w-full bg-boat bg-cover bg-bottom bg-no-repeat h-[50vh] flex justify-center bg-color2 bg-blend-multiply bg-opacity-50">
        <div className="w-full container flex justify-center items-center flex-col">
          <p className="text-white font-secondary text-3xl 2xl:text-6xl" style={{ fontStyle: 'italic', color: '#fff' }}>
            Wish you have an enjoyable experience!
          </p>
        </div>
      </section>
      <div className="qr-container">
        <div className="qr-info">
          <div style={{textAlign: 'center'}} className="qr-info-left">
            <h1><strong>Quét mã QR dưới đây để thanh toán:</strong></h1>
            <h2>Thông Tin Ngân Hàng:</h2>
            <p><strong>Ngân Hàng:</strong> {bank}</p>
            <p><strong>Họ Tên:</strong> {name}</p>
            <p><strong>Số Tài Khoản:</strong> {accountNumber}</p>
            <img className="qr-image" src={qrCodeImage} alt="QR Code" />
          </div>
          <div className="qr-info-right">
            <h2>Tổng Số Chi Phí Phải Thanh Toán </h2>
            <p className="amount">{totalAmount ? `$${totalAmount}` : 'Chưa có thông tin về tổng số chi phí'}</p>
            <h2>Các Bước Thanh Toán</h2>
            <ol className="payment-steps">
              {paymentSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <h2><strong>Lưu ý: </strong>Sau khi thanh toán chúng tôi sẽ liên hệ đến quý khách qua số điện thoại hoặc email quý khách đã cung cấp trong thời gian sớm nhất có thể. Quý khách vui lòng để ý điện thoại.  </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QrCodeComponent;
