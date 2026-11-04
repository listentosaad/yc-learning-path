const pill =
  'text-[14px] text-[#7a7672] no-underline px-3.5 py-2 rounded-full border border-white/[0.06] transition-all duration-200 hover:text-[#f0ede8] hover:border-white/[0.12] hover:bg-[#141414] hover:opacity-100';

export default function Nav() {
  return (
    <nav className="max-w-[1160px] mx-auto py-5 px-[clamp(16px,4vw,40px)] flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-[clamp(16px,3vw,32px)] flex-wrap">
        <a href="#" className="font-serif font-bold text-[20px] text-[#f0ede8] no-underline">
          مسـار المؤسـس
        </a>
        <div className="flex items-center gap-1.5">
          <a href="#plan" className={pill}>خطـة تعلم ريادة الأعمال</a>
          <a href="#essays" className={pill}>مقالات غراهام</a>
        </div>
      </div>
    </nav>
  );
}
