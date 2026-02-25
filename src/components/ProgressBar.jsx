import './ProgressBar.css';

export default function ProgressBar({ data, completedCount, progress }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="progress-section">
      <div className="container">
        <div className="progress-card">
          <div className="progress-header">
            <h2 className="progress-title">تقدّمك</h2>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-label">
            أكملت {completedCount} من ٦ فصول
          </p>
          <div className="visitor-stats">
            <div className="stat">
              <span className="stat-label">عدد الزيارات</span>
              <span className="stat-value">{data.visitCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">أول زيارة</span>
              <span className="stat-value">{formatDate(data.firstVisit)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">آخر زيارة</span>
              <span className="stat-value">{formatDate(data.lastVisit)}</span>
            </div>
          </div>
          <p className="storage-notice">
            تقدّمك محفوظ محلياً في متصفحك — لا حاجة لتسجيل دخول.
          </p>
        </div>
      </div>
    </section>
  );
}
