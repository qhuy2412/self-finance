import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

import styles from '../../css/Dashboard.module.css';
import HeroSection from '../../components/dashboard/HeroSection';
import WalletsSection from '../../components/dashboard/WalletSection';
import CashflowOverview from '../../components/dashboard/CashFlowOverview';
import RecentTransactions from '../../components/dashboard/RecentTransaction';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert("Có lỗi khi đăng xuất!");
    }
  };

  const handleAddTransaction = () => {
    setShowAddTransaction(!showAddTransaction);
  };

  // Mock data - replace with real API data
  const mockNetWorth = 5420000; // 5.42M VNĐ
  const mockWallets = [
    { id: 1, name: 'Tiền mặt', icon: '💵', balance: 1200000 },
    { id: 2, name: 'Vietcombank', icon: '🏦', balance: 2450000 },
    { id: 3, name: 'MoMo', icon: '📱', balance: 1770000 },
  ];
  const mockMonthlyIncome = 8000000;
  const mockMonthlyExpense = 3500000;
  const mockCategories = [
    { name: 'Ăn uống', value: 1400000, color: '#FF6B6B' },
    { name: 'Mua sắm', value: 1050000, color: '#4ECDC4' },
    { name: 'Giao thông', value: 700000, color: '#45B7D1' },
    { name: 'Giáo dục', value: 350000, color: '#FFA07A' },
  ];
  const mockTransactions = [
    { id: 1, category: 'Ăn uống', icon: '🍕', note: 'Nhà hàng Pizza', date: 'Hôm nay', amount: -150000 },
    { id: 2, category: 'Lương', icon: '💰', note: 'Lương tháng 3', date: 'Hôm nay', amount: 8000000 },
    { id: 3, category: 'Mua sắm', icon: '🛍️', note: 'Quần áo tại H&M', date: 'Hôm qua', amount: -320000 },
    { id: 4, category: 'Giao thông', icon: '🚕', note: 'Uber về nhà', date: '13 tháng 3', amount: -45000 },
    { id: 5, category: 'Giáo dục', icon: '📚', note: 'Khóa học online', date: '12 tháng 3', amount: -199000 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Bảng điều khiển</h1>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <HeroSection 
          user={user} 
          netWorth={mockNetWorth} 
          onAddTransaction={handleAddTransaction}
        />

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <WalletsSection wallets={mockWallets} />
            <CashflowOverview 
              income={mockMonthlyIncome}
              expense={mockMonthlyExpense}
              categories={mockCategories}
            />
          </div>

          <div className={styles.rightColumn}>
            <RecentTransactions 
              transactions={mockTransactions}
              onViewAll={() => navigate('/transactions')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
