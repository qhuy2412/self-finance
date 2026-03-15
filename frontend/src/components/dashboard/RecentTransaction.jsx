import React from 'react';
import styles from '../../css/RecentTransaction.module.css';

const RecentTransactions = ({ transactions, onViewAll }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  return (
    <section className={styles.transactionsSection}>
      <div className={styles.header}>
        <h3 className={styles.title}>Giao dịch gần đây</h3>
        <button className={styles.viewAllBtn} onClick={onViewAll}>
          Xem tất cả →
        </button>
      </div>

      <div className={styles.transactionsList}>
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transactionItem}>
            <div className={styles.transactionLeft}>
              <div className={styles.categoryIcon}>{transaction.icon}</div>
              <div className={styles.transactionDetails}>
                <p className={styles.transactionCategory}>{transaction.category}</p>
                <p className={styles.transactionNote}>{transaction.note}</p>
              </div>
            </div>

            <div className={styles.transactionRight}>
              <p
                className={styles.transactionAmount}
                style={{
                  color: transaction.amount > 0 ? '#10b981' : '#ef4444',
                }}
              >
                {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
              <p className={styles.transactionDate}>{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.viewAllBtnFull} onClick={onViewAll}>
        Xem tất cả giao dịch
      </button>
    </section>
  );
};

export default RecentTransactions;
