import React from 'react';
import styles from '../../css/HeroSection.module.css';

const HeroSection = ({ user, netWorth, onAddTransaction }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.greeting}>
          <h2 className={styles.greetingText}>
            {getGreeting()}, <span className={styles.userName}>{user?.name || 'bạn'}</span>! 👋
          </h2>
          <p className={styles.date}>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className={styles.netWorthSection}>
          <div className={styles.netWorthCard}>
            <p className={styles.netWorthLabel}>Tổng tài sản (Net Worth)</p>
            <h1 className={styles.netWorthAmount}>{formatCurrency(netWorth)}</h1>
          </div>

          <button className={styles.addTransactionBtn} onClick={onAddTransaction}>
            <span className={styles.plusIcon}>+</span>
            <span>Thêm giao dịch</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
