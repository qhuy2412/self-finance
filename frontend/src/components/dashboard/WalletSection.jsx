import React, { useState } from 'react';
import styles from '../../css/WalletSection.module.css';

const WalletsSection = ({ wallets }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const scroll = (direction) => {
    const container = document.getElementById('wallets-container');
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.walletsSection}>
      <div className={styles.walletHeader}>
        <h3 className={styles.title}>Ví tiền của tôi</h3>
        <button className={styles.addWalletBtn}>+ Thêm ví mới</button>
      </div>

      <div className={styles.walletsContainer}>
        <button className={styles.navBtn} onClick={() => scroll('left')}>
          ‹
        </button>

        <div id="wallets-container" className={styles.walletsScroll}>
          {wallets.map((wallet) => (
            <div key={wallet.id} className={styles.walletCard}>
              <div className={styles.walletIcon}>{wallet.icon}</div>
              <h4 className={styles.walletName}>{wallet.name}</h4>
              <p className={styles.walletBalance}>{formatCurrency(wallet.balance)}</p>
            </div>
          ))}
        </div>

        <button className={styles.navBtn} onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </section>
  );
};

export default WalletsSection;
