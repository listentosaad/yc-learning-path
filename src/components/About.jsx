import './About.css';

export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-heading">من أنا</h2>
        <div className="about-card">
          <div className="about-content">
            <h3 className="about-name">سعد</h3>
            <p className="about-bio">
              أتعلّم إدارة المنتجات وأشارك ما أتعلمه. شريك مؤسس لـ<strong>نقوة</strong> — شركة ناشئة لبرمجيات تحقيق التوافق الشرعي للاستثمارات.
            </p>
            <a
              href="https://trynaqua.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              اكتشف نقوة ←
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
