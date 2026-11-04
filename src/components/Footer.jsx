const link = 'text-[#8a8682] no-underline hover:text-[#f0ede8] hover:opacity-100';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="max-w-[1160px] mx-auto pt-[clamp(40px,5vw,56px)] px-[clamp(16px,4vw,40px)] pb-7 flex flex-col gap-10">
        <div className="flex justify-between items-start gap-8 flex-wrap">
          <div className="flex flex-col gap-2.5 max-w-[420px]">
            <span className="font-serif font-bold text-[22px] text-[#f0ede8]">مسار المؤسس</span>
            <p className="m-0 text-[14px] leading-[1.8] text-[#8a8682] [text-wrap:pretty]">
              مسار دراسي منظّم يجمع أفضل محتوى Y Combinator لمساعدتك على بناء شركتك الناشئة بخطوات واضحة.
            </p>
          </div>
          <div className="flex gap-[clamp(32px,5vw,64px)] flex-wrap">
            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="text-[12px] text-[#5a5753]">الموقع</span>
              <a href="#plan" className={link}>خطة التعلم</a>
              <a href="#essays" className={link}>مقالات غراهام</a>
            </div>
            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="text-[12px] text-[#5a5753]">تابعنا</span>
              <a href="https://x.com/listentosaad" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${link}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                إكس
              </a>
              <a href="https://www.linkedin.com/in/alrefaai/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${link}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                لينكدإن
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 flex-wrap pt-5 border-t border-white/[0.05] text-[12px] text-[#7a7672]">
          <span>الموقع لـ سعد الرفاعي — المؤسس المشارك ومدير المنتجات، نقوة</span>
          <a href="https://trynaqua.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline">
            اكتشف نقوة ←
          </a>
        </div>
      </div>
    </footer>
  );
}
