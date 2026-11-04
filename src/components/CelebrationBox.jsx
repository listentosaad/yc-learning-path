// Shown only when every lesson is checked. Not part of the design file, so it
// borrows the share card's look to stay consistent.

const STAR_POSITIONS = [
  { left: '4%',  top: '18%', delay: 0,   duration: 2.6 },
  { left: '14%', top: '72%', delay: 0.5, duration: 3.1 },
  { left: '28%', top: '88%', delay: 0.9, duration: 2.4 },
  { left: '50%', top: '2%',  delay: 1.3, duration: 3.3 },
  { left: '72%', top: '82%', delay: 0.4, duration: 2.8 },
  { left: '86%', top: '68%', delay: 0.7, duration: 2.5 },
  { left: '93%', top: '14%', delay: 1.1, duration: 3.0 },
];

export default function CelebrationBox() {
  return (
    <section className="max-w-[1160px] mx-auto px-[clamp(16px,4vw,40px)] pb-6">
      <div className="animate-card-in relative overflow-hidden flex flex-col gap-3 p-[clamp(28px,4vw,48px)] bg-[var(--accent-glow)] border border-[var(--accent-dim)] rounded-[20px]">
        {STAR_POSITIONS.map((s, i) => (
          <span
            key={i}
            className="absolute text-xl pointer-events-none select-none"
            style={{ left: s.left, top: s.top, animation: `floatStar ${s.duration}s ease-in-out ${s.delay}s infinite` }}
            aria-hidden="true"
          >
            ⭐
          </span>
        ))}
        <p className="relative m-0 font-serif font-bold text-[var(--accent)] text-[clamp(28px,6vw,40px)]">
          شطوووووووورر!
        </p>
        <p className="relative m-0 text-[15px] leading-[1.8] text-[#8a8682]">
          لقد أتممت مسار المؤسس بالكامل. أنت الآن جاهز للانطلاق!
        </p>
      </div>
    </section>
  );
}
