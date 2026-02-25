import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Trỏ đúng về file api của bạn
import '../../css/Login.css'; // Tận dụng lại class nền và hiệu ứng của Login

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

const Register = () => {
  // Quản lý các trường dữ liệu
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Quản lý trạng thái thông báo
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      // Bắn request xuống Backend
      await api.post('/auth/register', { name, email, password });
      
      // Nếu thành công, báo xanh và đếm ngược chuyển trang
      setSuccessMsg('Đăng ký thành công! Đang chuyển hướng về Đăng nhập...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Bắt lỗi (ví dụ: Email đã tồn tại)
      setErrorMsg(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'Có lỗi xảy ra, vui lòng thử lại!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-background">
      <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
        <MDBCard className="login-card my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
          <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
            
            <h2 className="fw-bold mb-2 text-uppercase text-primary">Đăng Ký</h2>
            <p className="text-white-50 mb-4">Tạo tài khoản mới để bắt đầu quản lý!</p>

            <form onSubmit={handleSubmit} className="w-100">
              
              {/* Vùng hiển thị thông báo lỗi/thành công */}
              {errorMsg && <div className="alert alert-danger p-2 text-center">{errorMsg}</div>}
              {successMsg && <div className="alert alert-success p-2 text-center">{successMsg}</div>}

              <MDBInput 
                wrapperClass="mb-4 w-100" 
                label="Họ và Tên" 
                id="nameInput" 
                type="text" 
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <MDBInput 
                wrapperClass="mb-4 w-100" 
                label="Địa chỉ Email" 
                id="emailInput" 
                type="email" 
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <MDBInput 
                wrapperClass="mb-4 w-100" 
                label="Mật khẩu" 
                id="passwordInput" 
                type="password" 
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <MDBBtn 
                type="submit" 
                size="lg" 
                className="w-100 mb-4" 
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ TÀI KHOẢN'}
              </MDBBtn>
            </form>

            <div>
              <p className="mb-0">Đã có tài khoản? <a href="/login" className="text-primary fw-bold text-decoration-none">Đăng nhập ngay</a></p>
            </div>

          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Register;