import { useState, useEffect, useCallback, useRef } from 'react';

const MODULES = [
  {
    id: 'm1',
    num: '01',
    title: 'القرار بالبدء',
    subtitle: 'هل يجب أن تبني شركة ناشئة؟',
    videos: [
      { id: 'm1v1', label: 'هل يجب أن تبدأ شركة ناشئة؟', url: 'https://youtu.be/BUE-icVYRFU' },
    ],
    readings: [
      { id: 'm1r1', label: 'لماذا لا تمتنع عن البدء؟', url: 'https://www.paulgraham.com/notnot.html' },
      { id: 'm1r2', label: 'ما قبل الشركة الناشئة', url: 'https://www.paulgraham.com/before.html' },
    ],
  },
  {
    id: 'm2',
    num: '02',
    title: 'الفكرة وتقييمها',
    subtitle: 'كيف تجد فكرة تستحق البناء',
    videos: [
      { id: 'm2v1', label: 'كيف تجد وتقيّم أفكار الشركات الناشئة', url: 'https://youtu.be/Th8JoIan4dg' },
      { id: 'm2v2', label: 'كل شيء عن التحول (Pivoting)', url: 'https://youtu.be/8pNxKX1SUGE' },
    ],
    readings: [
      { id: 'm2r1', label: 'كيف تحصل على أفكار — بول غراهام', url: 'https://www.paulgraham.com/startupideas.html' },
    ],
  },
  {
    id: 'm3',
    num: '03',
    title: 'بناء الفريق المؤسس',
    subtitle: 'الشركاء والحصص والديناميكية',
    videos: [
      { id: 'm3v1', label: 'كل شيء عن الشركاء المؤسسين', url: 'https://youtu.be/A4SLDQDXdp0' },
      { id: 'm3v2', label: 'أخطاء المؤسسين التي تقتل الشركات', url: 'https://youtu.be/dlfjs_eEEzs' },
      { id: 'm3v3', label: 'كيف تقسم الحصص بين المؤسسين', url: 'https://youtu.be/9NhEBVPlJs4' },
      { id: 'm3v4', label: 'كيف تعملون معاً بفعالية', url: 'https://youtu.be/30a5yFBd7Fo' },
    ],
    readings: [],
  },
  {
    id: 'm4',
    num: '04',
    title: 'التخطيط للـ MVP',
    subtitle: 'من الفكرة إلى أول نسخة قابلة للاختبار',
    videos: [
      { id: 'm4v1', label: 'كيف تتحدث مع المستخدمين', url: 'https://youtu.be/z1iF1c8w5Lg' },
      { id: 'm4v2', label: 'كيف تبني منتجاً أولياً (MVP)', url: 'https://youtu.be/QRZ_l7cVzzU' },
    ],
    readings: [
      { id: 'm4r1', label: 'أساسيات دورة تطوير المنتج', url: 'https://www.ycombinator.com/library/4e-guide-to-product-development' },
    ],
  },
  {
    id: 'm5',
    num: '05',
    title: 'الإطلاق',
    subtitle: 'كيف تخرج للسوق وتكسب أول عملائك',
    videos: [
      { id: 'm5v1', label: 'كيف تطلق مشروعك', url: 'https://youtu.be/u36A-YTxiOw' },
      { id: 'm5v2', label: 'كيف تحصل على أول عملائك', url: 'https://youtu.be/hyYCn_kAngI' },
    ],
    readings: [
      { id: 'm5r1', label: 'افعل أشياءً لا تتقشر — Do Things That Don\'t Scale', url: 'https://paulgraham.com/ds.html' },
    ],
  },
  {
    id: 'm6',
    num: '06',
    title: 'النمو والتوليد',
    subtitle: 'المؤشرات والتسعير واستراتيجيات النمو',
    videos: [
      { id: 'm6v1', label: 'كيف تحدد المؤشرات (KPIs) وترتب أولوياتك', url: 'https://youtu.be/6DTK9yDP6p0' },
      { id: 'm6v2', label: 'نماذج العمل والتسعير', url: 'https://youtu.be/oWZbWzAyHAE' },
      { id: 'm6v3', label: 'استراتيجيات النمو', url: 'https://youtu.be/6lY9CYIY4pQ' },
    ],
    readings: [],
  },
];

const STORAGE_KEY = 'yc_study_plan_v1';

function loadChecked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveChecked(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

const ALL_ITEMS = MODULES.flatMap((m) => [...m.videos, ...m.readings]);
const TOTAL = ALL_ITEMS.length;

// ─── RingProgress ────────────────────────────────────────────────────────────

function RingProgress({ done, total, size = 32 }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total === 0 ? 0 : done / total;
  const offset = circ * (1 - pct);
  return (
    <svg className="flex-shrink-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ opacity: pct === 0 ? 0 : 1, transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)' }}
      />
      {done === total && total > 0 && (
        <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize="10" fill="var(--accent)" fontFamily="ThmanyahSans" fontWeight="700">✓</text>
      )}
    </svg>
  );
}

// ─── ItemRow ─────────────────────────────────────────────────────────────────

function ItemRow({ item, checked, onToggle, type, isLast }) {
  const handleCheck = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(item.id);
  };

  return (
    <div className={`group flex items-start gap-3 px-2 py-[10px] -mx-2 w-[calc(100%+1rem)] cursor-pointer rounded-lg transition-colors duration-150 hover:bg-[#1a1a1a] ${!isLast ? 'border-b border-white/[0.06]' : ''}`}>
      <button
        className={`w-[18px] h-[18px] border-[1.5px] rounded-[5px] flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 bg-transparent p-0 group-hover:border-[var(--accent)] ${
          checked ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-white/[0.12]'
        }`}
        onClick={handleCheck}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCheck(e)}
        role="checkbox"
        aria-checked={checked}
        aria-label={`تحديد: ${item.label}`}
      >
        <svg
          width="10" height="10" viewBox="0 0 12 12" fill="none"
          style={{
            opacity: checked ? 1 : 0,
            transform: checked ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <a
          className={`text-[13.5px] font-medium leading-[1.5] transition-colors duration-300 block no-underline ${
            checked
              ? 'text-[#3a3835] line-through decoration-[#3d3b38]'
              : 'text-[#f0ede8] hover:text-[var(--accent)] hover:underline hover:decoration-[oklch(0.68_0.18_45_/_0.4)] hover:underline-offset-[3px]'
          }`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {item.label}
        </a>
      </div>

      <span className="text-[13px] flex-shrink-0 mt-0.5 opacity-70">
        {type === 'video' ? '📺' : '📖'}
      </span>
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-2">
      <span className="text-[10px] font-semibold tracking-[0.1em] text-[#3d3b38] uppercase">{children}</span>
      <span className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ─── ModuleCard ───────────────────────────────────────────────────────────────

function ModuleCard({ mod, checked, onToggle, idx }) {
  const items = [...mod.videos, ...mod.readings];
  const doneCount = items.filter((i) => checked[i.id]).length;
  const allDone = doneCount === items.length;
  const [open, setOpen] = useState(idx === 0);

  return (
    <div
      className={`animate-card-in rounded-[14px] overflow-hidden transition-all duration-200 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] ${
        allDone
          ? 'bg-[#141414] border border-[oklch(0.68_0.18_45_/_0.25)] shadow-[0_0_0_1px_oklch(0.68_0.18_45_/_0.12)]'
          : 'bg-[#141414] border border-white/[0.06] hover:border-white/[0.12]'
      }`}
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      {/* Header */}
      <button
        className={`flex items-center justify-between w-full px-[22px] pt-5 pb-[18px] gap-3 bg-transparent border-0 font-sans text-right text-inherit cursor-pointer select-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:-outline-offset-2 ${
          !open ? 'hover:bg-white/[0.02]' : ''
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`module-body-${mod.id}`}
      >
        <div className="flex items-center gap-[14px] flex-1 min-w-0">
          <span className="text-[10px] font-bold text-[var(--accent)] w-[26px] h-[26px] border border-[var(--accent-dim)] rounded-[8px] flex items-center justify-center bg-[var(--accent-glow)] flex-shrink-0">
            {mod.num}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] sm:text-[15px] font-bold text-[#f0ede8] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {mod.title}
            </div>
            <div className="text-[12px] text-[#7a7672] font-normal">{mod.subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {!allDone && !open && (
            <span className="text-[10px] text-[#3d3b38] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full tabular-nums">
              {items.length} عنصر
            </span>
          )}
          <RingProgress done={doneCount} total={items.length} />
          <svg
            className={`flex-shrink-0 transition-all duration-300 ${open ? 'rotate-180 text-[var(--accent)] opacity-100' : 'text-[#7a7672] opacity-60'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Body */}
      <div
        id={`module-body-${mod.id}`}
        className="overflow-hidden"
        style={{ maxHeight: open ? '2000px' : '0', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="px-[22px] pb-5 border-t border-white/[0.06]">
          {mod.videos.length > 0 && (
            <>
              <SectionLabel>فيديوهات</SectionLabel>
              {mod.videos.map((item, i) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  checked={!!checked[item.id]}
                  onToggle={onToggle}
                  type="video"
                  isLast={i === mod.videos.length - 1 && mod.readings.length === 0}
                />
              ))}
            </>
          )}
          {mod.readings.length > 0 && (
            <>
              <SectionLabel>قراءات</SectionLabel>
              {mod.readings.map((item, i) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  checked={!!checked[item.id]}
                  onToggle={onToggle}
                  type="reading"
                  isLast={i === mod.readings.length - 1}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [checked, setChecked] = useState(loadChecked);
  const progressFillRef = useRef(null);

  const totalDone = Object.values(checked).filter(Boolean).length;
  const pct = TOTAL === 0 ? 0 : (totalDone / TOTAL) * 100;
  const allComplete = totalDone === TOTAL;

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  useEffect(() => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pct}%`;
    }
  }, [pct]);

  const onToggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const onReset = () => {
    if (window.confirm('هل تريد إعادة ضبط كل التقدم؟')) {
      setChecked({});
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] overflow-x-hidden font-sans">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.05] z-[100]">
        <div
          ref={progressFillRef}
          className="h-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
          style={{ width: `${pct}%`, transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 pb-20">

        {/* Hero */}
        <div className="pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
          <h1
            className="font-serif font-bold text-[#f0ede8] max-w-[480px] mx-auto mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: '1.35', fontFeatureSettings: '"calt" 1, "liga" 1, "cswh" 1' }}
          >
            خطة دراسة<br />ريادة الأعمال
          </h1>

          <h2
            className="font-serif font-medium text-[#7a7672] max-w-[420px] mx-auto mb-9 leading-[1.7]"
            style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontFeatureSettings: '"calt" 1, "liga" 1' }}
          >
            مسار منظّم لإتقان أساسيات بناء الشركات الناشئة من خلال محتوى Y Combinator ، بها تصنع شركة ناشئة ناجحة
          </h2>

          {/* Stats strip */}
          <div className="flex justify-center gap-5 sm:gap-8 mb-4">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[20px] font-bold text-[var(--accent)] tabular-nums">{totalDone}</span>
              <span className="text-[11px] text-[#7a7672]">مكتمل</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[20px] font-bold text-[var(--accent)] tabular-nums">{TOTAL - totalDone}</span>
              <span className="text-[11px] text-[#7a7672]">متبقٍّ</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[20px] font-bold text-[var(--accent)] tabular-nums">{TOTAL}</span>
              <span className="text-[11px] text-[#7a7672]">إجمالي</span>
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3d3b38] mt-6">
            <span className="w-[5px] h-[5px] rounded-full bg-[#3d3b38] flex-shrink-0" />
            تقدمك محفوظ تلقائياً في متصفحك
          </div>
        </div>

        {/* Completion banner */}
        {allComplete && (
          <div className="animate-card-in bg-[var(--accent-glow)] border border-[var(--accent-dim)] rounded-[14px] px-6 py-5 text-center mb-8">
            <h3 className="text-[16px] font-bold text-[var(--accent)] mb-1">🎉 أتممت المسار كاملاً!</h3>
            <p className="text-[13px] text-[#7a7672]">لقد أكملت جميع الفيديوهات والقراءات — أنت جاهز للبناء.</p>
          </div>
        )}

        {/* Modules */}
        <div className="flex flex-col gap-4">
          {MODULES.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              checked={checked}
              onToggle={onToggle}
              idx={i}
            />
          ))}
        </div>

        {/* Reset */}
        {totalDone > 0 && (
          <button
            className="block mx-auto mt-10 bg-transparent border border-white/[0.06] text-[#3d3b38] font-sans text-[12px] px-5 py-2 rounded-full cursor-pointer transition-all duration-200 hover:border-white/[0.12] hover:text-[#7a7672] hover:bg-[#141414]"
            onClick={onReset}
          >
            إعادة الضبط
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center px-6 pt-12 pb-8 border-t border-white/[0.06] mt-16">
        <p className="text-[13px] text-[#7a7672] leading-[1.7] max-w-[400px] mx-auto mb-6">
          مسار دراسي منظّم يجمع أفضل محتوى Y Combinator لمساعدتك على بناء شركتك الناشئة بخطوات واضحة.
        </p>
        <p className="text-[10px] text-[#3d3b38] tracking-[0.03em] font-light">
          الموقع لـ سعد الرفاعي - المؤسس المشارك ومدير المنتجات، نقوة
        </p>
        <a
          className="text-[10px] text-[var(--accent)] tracking-[0.03em] font-light mt-1 block transition-opacity duration-200 hover:opacity-70"
          href="https://trynaqua.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          اكتشف نقوة
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-[14px] mt-2.5">
          <a className="text-[#3d3b38] transition-colors duration-200 flex items-center hover:text-[#7a7672]" href="https://x.com/listentosaad" target="_blank" rel="noopener noreferrer" aria-label="تويتر">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a className="text-[#3d3b38] transition-colors duration-200 flex items-center hover:text-[#7a7672]" href="https://www.linkedin.com/in/alrefaai/" target="_blank" rel="noopener noreferrer" aria-label="لينكدإن">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
