import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-badge">Y Combinator</div>
        <h1 className="hero-title">
          مسار تعلّم ريادة الأعمال
        </h1>
        <p className="hero-subtitle">
          تعلّم أساسيات بناء الشركات الناشئة من أفضل محتوى Y Combinator — من الفكرة إلى بناء الفريق، في ٦ فصول مرتّبة.
        </p>
        <a href="#chapters" className="hero-cta">
          ابدأ التعلّم
        </a>
      </div>
    </section>
  );
}
