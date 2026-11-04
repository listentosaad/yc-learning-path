import { useState } from 'react';

export const SUBSTACK_URL = 'https://paulgarabic.substack.com';

const fade = (duration, delay) => ({
  opacity: 0,
  animation: `heroFade ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
});

// Subscribe form from the design: opens Substack's subscribe page in a new
// tab with the email already filled in, where the reader confirms.
function SubscribeForm() {
  const [email, setEmail] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    window.open(`${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`, '_blank', 'noopener');
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 max-w-[520px]" style={fade(1, 1.1)}>
      <div className="flex gap-2 p-1.5 bg-[#141414] border border-white/[0.08] rounded-[14px] flex-wrap">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="بريدك الإلكتروني"
          aria-label="بريدك الإلكتروني"
          dir="ltr"
          className="flex-[1_1_200px] min-w-0 bg-transparent border-0 outline-none text-[#f0ede8] font-sans text-[16px] px-3.5 py-3 text-right placeholder:text-[#3d3b38]"
        />
        <button
          type="submit"
          className="flex-[0_0_auto] bg-[var(--accent)] text-[#0d0d0d] border-0 rounded-[10px] px-6 py-3 font-sans font-bold text-[15px] cursor-pointer transition-[filter] duration-200 hover:brightness-[1.08]"
        >
          اشترك في النشرة
        </button>
      </div>
      <div className="flex items-center gap-1.5 text-[12px] text-[#7a7672]">
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] shrink-0" />
        <span>مقالة مترجمة جديدة في بريدك، عبر</span>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f0ede8] underline underline-offset-[3px] decoration-[rgba(240,237,232,0.3)]"
        >
          Substack
        </a>
      </div>
    </form>
  );
}

export default function Hero() {
  return (
    <section
      id="essays"
      className="relative overflow-hidden grid grid-cols-1 min-[860px]:grid-cols-2 min-h-[calc(100svh-240px)] min-[860px]:min-h-[calc(100vh-80px)] items-stretch border-b border-white/[0.06]"
    >
      <div className="relative z-[1] flex flex-col justify-end min-[860px]:justify-center gap-[clamp(18px,2.4vw,28px)] min-w-0 pt-[clamp(24px,4vw,48px)] pb-8 min-[860px]:pb-[clamp(24px,4vw,48px)] px-[clamp(16px,5vw,72px)]">
        <h1
          className="m-0 font-serif font-bold text-[clamp(44px,6.4vw,80px)] leading-[1.15] tracking-normal flex flex-col"
          style={{ fontFeatureSettings: '"calt" 1, "liga" 1, "cswh" 1' }}
        >
          <span className="block text-[#f0ede8]" style={fade(1.3, 0.15)}>بـاول غـراهـام</span>
          <span className="block text-[var(--accent)]" style={fade(1.3, 0.5)}>بالـعربيـة</span>
        </h1>

        <h2
          className="m-0 font-serif font-medium text-[#7a7672] text-[clamp(18px,2.1vw,24px)] leading-[1.8] max-w-[560px] [text-wrap:pretty]"
          style={{ fontFeatureSettings: '"calt" 1, "liga" 1', ...fade(1.1, 0.85) }}
        >
          ترجمات رصينة لجَمهرَة مقالات باول غراهام، أبرز أصوات ريادة الأعمال. المصدر المعرفي الأبرز لتأسيس شركتك الناشئة.
        </h2>

        <SubscribeForm />
      </div>

      {/* Portrait: beside the text on desktop, a faded backdrop on mobile.
          On mobile the hero is shorter than the screen (100svh - 240px) and the
          text sits at its bottom, so the plan heading peeks above the fold. */}
      <div
        className="absolute inset-0 z-0 min-w-0 min-[860px]:relative min-[860px]:inset-auto min-[860px]:min-h-[min(80vh,640px)]"
        style={fade(1.4, 0.3)}
      >
        <img
          src="/paul-graham.webp"
          alt="باول غراهام"
          width="495"
          height="600"
          className="absolute top-[-12%] inset-x-0 mx-auto w-[min(78%,420px)] h-auto aspect-[1163/1414] opacity-[0.55] object-cover object-top min-[860px]:top-0 min-[860px]:w-full min-[860px]:h-full min-[860px]:aspect-auto min-[860px]:opacity-100"
        />
        <div
          className="absolute inset-0 pointer-events-none min-[860px]:hidden"
          style={{ background: 'linear-gradient(180deg,rgba(13,13,13,0.55) 0%,rgba(13,13,13,0.75) 55%,#0d0d0d 100%)' }}
        />
      </div>
    </section>
  );
}
