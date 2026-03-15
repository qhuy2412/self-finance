import React from 'react';
import styles from '../../css/CashflowOverview.module.css';

const CashflowOverview = ({ income, expense, categories }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalExpense = categories.reduce((sum, cat) => sum + cat.value, 0);
  const maxValue = Math.max(...categories.map(cat => cat.value));

  return (
    <section className={styles.cashflowSection}>
      <h3 className={styles.title}>Thu/Chi tháng này</h3>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <p className={styles.label}>Tổng thu</p>
          <p className={styles.incomeAmount}>{formatCurrency(income)}</p>
          <span className={styles.badge} style={{ backgroundColor: '#10b981' }}>
            ↑ Thu nhập
          </span>
        </div>

        <div className={styles.summaryCard}>
          <p className={styles.label}>Tổng chi</p>
          <p className={styles.expenseAmount}>{formatCurrency(expense)}</p>
          <span className={styles.badge} style={{ backgroundColor: '#ef4444' }}>
            ↓ Chi tiêu
          </span>
        </div>
      </div>

      <div className={styles.chartSection}>
        <h4 className={styles.chartTitle}>Cơ cấu chi tiêu</h4>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => {
            const percentage = (category.value / maxValue) * 100;
            const categoryPercentage = (category.value / totalExpense) * 100;

            return (
              <div key={index} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryValue}>{categoryPercentage.toFixed(0)}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <p className={styles.categoryAmount}>{formatCurrency(category.value)}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.surplus}>
          Dư: <span className={styles.surplusValue}>{formatCurrency(income - expense)}</span>
        </p>
      </div>
    </section>
  );
};

export default CashflowOverview;
