import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import '../../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {

      await login(email, password);

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Đăng nhập thất bại, vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-background">
      <MDBContainer fluid className="d-flex justify-content-center align-items-center h-100">
        <MDBCard className="login-card my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
          <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
            
            <h2 className="fw-bold mb-2 text-uppercase text-primary">Đăng Nhập</h2>
            <p className="text-white-50 mb-4">Vui lòng điền email và mật khẩu của bạn!</p>

            <form onSubmit={handleSubmit} className="w-100">

              {errorMsg && (
                <div className="alert alert-danger p-2 text-center" role="alert">
                  {errorMsg}
                </div>
              )}

              {/* Input Email */}
              <MDBInput 
                wrapperClass="mb-4 w-100" 
                labelClass="text-secondary" 
                label="Địa chỉ Email" 
                id="emailInput" 
                type="email" 
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              {/* Input Password */}
              <MDBInput 
                wrapperClass="mb-4 w-100" 
                labelClass="text-secondary" 
                label="Mật khẩu" 
                id="passwordInput" 
                type="password" 
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Ghi nhớ đăng nhập & Quên mật khẩu */}
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Ghi nhớ tôi" />
                <a href="#!" className="text-primary text-decoration-none">Quên mật khẩu?</a>
              </div>

              {/* Nút Submit */}
              <MDBBtn 
                type="submit" 
                size="lg" 
                className="w-100 mb-4" 
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
              </MDBBtn>
            </form>

            {/* Link sang trang Đăng ký */}
            <div>
              <p className="mb-0">Chưa có tài khoản? <Link to="/register" className="text-primary fw-bold text-decoration-none">Đăng ký ngay</Link></p>
            </div>

          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Login;