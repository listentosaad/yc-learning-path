import { useState } from 'react';

const INVITE_TEXT = 'أهلاً، وجدت هذا المسار الرهيب لتأسيس الشركات (مسار المؤسس)، أعتقد أنه يفيدك: https://founder-path.com';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(INVITE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-[1160px] mx-auto px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,96px)]">
      <div className="flex flex-col items-start gap-6 p-[clamp(28px,4vw,48px)] bg-[#121212] border border-white/[0.07] rounded-[20px]">
        <div className="flex flex-col gap-3 min-w-0">
          <span className="text-[14px] font-bold text-[var(--accent)]">أعجبك المحتوى؟</span>
          <h2 className="m-0 font-serif font-bold text-[clamp(26px,3vw,36px)] leading-[1.4] text-[#f0ede8] [text-wrap:pretty]">
            شاركه مع صديق واحد فقط ليتعلم معك.
          </h2>
        </div>
        <div className="flex items-center gap-3.5 flex-wrap">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[var(--accent)] text-[#0d0d0d] border-0 rounded-[10px] px-5 py-3 font-sans font-bold text-[15px] cursor-pointer transition-[filter] duration-200 hover:brightness-[1.08]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            انسخ رسالة المشاركة
          </button>
          <span
            className="text-[13px] text-[var(--accent)] font-medium transition-opacity duration-200 ease-in-out"
            style={{ opacity: copied ? 1 : 0 }}
            aria-live="polite"
          >
            {copied ? 'تم النسخ ✓' : ''}
          </span>
        </div>
      </div>
    </section>
  );
}
