import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, 
  MDBCard, 
  MDBCardBody, 
  MDBBtn, 
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';

const Dashboard = () => {
  // Lấy thông tin user và hàm logout từ Context
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Gọi API xóa cookie
      navigate('/login'); // Đá về trang đăng nhập
    } catch (error) {
      alert("Có lỗi khi đăng xuất!");
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '50px' }}>
      <MDBContainer>
        <MDBCard className="shadow-5">
          <MDBCardBody className="p-5 text-center">
            
            <MDBIcon fas icon="wallet" size="3x" className="text-primary mb-3" />
            <MDBTypography tag='h2' className="mb-2 fw-bold">
              Chào mừng trở lại, {user?.name || 'bạn'}! 👋
            </MDBTypography>
            <p className="text-muted mb-5">
              Email đăng nhập: {user?.email}
            </p>
            
            {/* Khu vực mô phỏng hiển thị Ví tiền */}
            <div className="p-4 mb-5 rounded-3" style={{ backgroundColor: '#e0f2fe', border: '1px dashed #0284c7' }}>
              <h4 className="fw-bold text-info">Tổng tài sản: 0 VNĐ</h4>
              <p className="text-muted">Bạn chưa có ví nào. Hãy tạo ví đầu tiên để bắt đầu ghi chép chi tiêu nhé!</p>
              <MDBBtn color="success">
                <MDBIcon fas icon="plus" className="me-2" /> Tạo ví mới
              </MDBBtn>
            </div>

            {/* Nút Đăng xuất */}
            <MDBBtn outline color="danger" onClick={handleLogout}>
              Đăng xuất
            </MDBBtn>

          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Dashboard;