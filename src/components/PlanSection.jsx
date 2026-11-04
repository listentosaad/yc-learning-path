import { MODULES, ALL_ITEMS, TOTAL } from '../data/modules.js';

const ACCENT = 'var(--accent)';

function moduleStats(mod, checked) {
  const items = [...mod.videos, ...mod.readings];
  const done = items.filter((i) => checked[i.id]).length;
  const allDone = done === items.length;
  return {
    done,
    count: items.length,
    allDone,
    status: allDone ? 'مكتملة' : done ? `${done} من ${items.length}` : `${items.length} دروس`,
    shortStatus: allDone ? 'مكتملة' : `${done}/${items.length}`,
    statusColor: allDone ? ACCENT : '#7a7672',
  };
}

// ─── ProgressCard ────────────────────────────────────────────────────────────

function ProgressCard({ checked, totalDone, onReset }) {
  const pct = TOTAL === 0 ? 0 : Math.round((totalDone / TOTAL) * 100);
  return (
    <div className="flex flex-col gap-[18px] max-w-[400px] p-[22px] bg-[#121212] border border-white/[0.07] rounded-2xl">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-[#8a8682]">تقدمك في المسار</span>
          <span className="text-[15px] text-[#f0ede8] whitespace-nowrap tabular-nums">
            {totalDone} من {TOTAL} درساً
          </span>
        </div>
        <span className="font-serif font-bold text-[40px] leading-none text-[var(--accent)] tabular-nums">
          {pct}٪
        </span>
      </div>

      <div className="flex gap-[3px]" aria-hidden="true">
        {ALL_ITEMS.map((i) => (
          <span
            key={i.id}
            className="flex-1 h-1.5 rounded-[2px] transition-[background] duration-300"
            style={{ background: checked[i.id] ? ACCENT : 'rgba(255,255,255,0.08)' }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 text-[12px] text-[#7a7672] pt-3.5 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5">
          <span className="w-[5px] h-[5px] rounded-full bg-[#5a5753]" />
          محفوظ تلقائياً في متصفحك
        </span>
        {totalDone > 0 && (
          <button
            onClick={onReset}
            className="bg-transparent border-0 p-0 text-[#7a7672] font-sans text-[12px] cursor-pointer underline underline-offset-[3px] hover:text-[#f0ede8]"
          >
            إعادة الضبط
          </button>
        )}
      </div>
    </div>
  );
}

// ─── ModuleIndex (desktop only) ──────────────────────────────────────────────

function ModuleIndex({ checked }) {
  return (
    <nav className="hidden min-[1000px]:flex flex-col max-w-[400px]" aria-label="مراحل المسار">
      {MODULES.map((mod, idx) => {
        const s = moduleStats(mod, checked);
        const isLast = idx === MODULES.length - 1;
        return (
          <a
            key={mod.id}
            href={`#${mod.id}`}
            className="grid grid-cols-[20px_minmax(0,1fr)_auto] gap-x-3.5 items-start no-underline text-[#8a8682] text-[14px] rounded-[10px] px-2 -mx-2 transition-all duration-200 hover:text-[#f0ede8] hover:bg-[#121212] hover:opacity-100"
          >
            <span className="flex flex-col items-center self-stretch">
              <span
                className="mt-[15px] w-3 h-3 rounded-full shrink-0 border-2 transition-all duration-300"
                style={{
                  borderColor: s.done ? ACCENT : '#3d3b38',
                  background: s.allDone ? ACCENT : 'transparent',
                }}
              />
              <span
                className="flex-1 w-px mt-1"
                style={{
                  background: isLast ? 'transparent' : s.allDone ? 'oklch(0.68 0.18 45 / 0.4)' : 'rgba(255,255,255,0.08)',
                }}
              />
            </span>
            <span className="py-[11px] flex flex-col gap-px min-w-0">
              <span className="text-[11px] text-[#5a5753] tabular-nums">المرحلة {mod.num}</span>
              <span style={{ color: s.done && !s.allDone ? '#f0ede8' : 'inherit' }}>{mod.title}</span>
            </span>
            <span className="pt-[26px] text-[12px] tabular-nums" style={{ color: s.statusColor }}>
              {s.shortStatus}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

// ─── LessonCard ──────────────────────────────────────────────────────────────

function LessonCard({ item, type, checked, onToggle }) {
  const isVideo = type === 'video';
  return (
    <div
      className={`flex items-stretch bg-[#121212] border rounded-[14px] overflow-hidden transition-[border-color] duration-200 hover:border-white/[0.16] ${
        checked ? 'border-[oklch(0.68_0.18_45_/_0.25)]' : 'border-white/[0.07]'
      }`}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-0 flex items-center gap-3.5 px-4 py-3.5 no-underline text-inherit transition-colors duration-150 hover:bg-[#181818] hover:opacity-100"
      >
        <span className="w-10 h-10 rounded-[10px] shrink-0 flex items-center justify-center bg-[oklch(0.68_0.18_45_/_0.1)] text-[var(--accent)]">
          {isVideo ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
            </svg>
          )}
        </span>
        <span className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span
            className="text-[16px] leading-[1.5] transition-colors duration-300"
            style={{ color: checked ? '#8a8682' : '#f0ede8' }}
          >
            {item.label}
          </span>
          <span className="text-[12px] text-[#7a7672]">{isVideo ? 'فيديو' : 'مقالة'}</span>
        </span>
        <span className="shrink-0 flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)]">
          {isVideo ? 'شاهد' : 'اقرأ'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="17" y1="7" x2="7" y2="17" />
            <polyline points="17 17 7 17 7 7" />
          </svg>
        </span>
      </a>
      <button
        onClick={() => onToggle(item.id)}
        aria-pressed={checked}
        aria-label={`علّمه كمكتمل: ${item.label}`}
        title={checked ? 'إلغاء الإكمال' : 'علّمه كمكتمل'}
        className="shrink-0 flex items-center justify-center gap-1.5 min-w-[92px] px-3.5 border-r border-white/[0.07] font-sans text-[13px] font-bold cursor-pointer transition-all duration-200 hover:brightness-[1.15]"
        style={{
          background: checked ? 'oklch(0.68 0.18 45 / 0.14)' : 'transparent',
          color: checked ? ACCENT : '#7a7672',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {checked ? 'مكتمل' : 'أنهيته'}
      </button>
    </div>
  );
}

// ─── ModuleItem ──────────────────────────────────────────────────────────────

function ModuleItem({ mod, idx, checked, onToggle }) {
  const s = moduleStats(mod, checked);
  return (
    <li
      id={mod.id}
      className="animate-card-in grid grid-cols-[auto_minmax(0,1fr)] gap-x-[clamp(16px,3vw,36px)] py-[clamp(32px,4vw,48px)] border-b border-white/10 scroll-mt-6"
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      <span
        className="font-serif font-bold text-[clamp(32px,4vw,48px)] leading-none tabular-nums transition-colors duration-[400ms]"
        style={{ color: s.done ? ACCENT : '#5a5753' }}
      >
        {mod.num}
      </span>
      <div className="flex flex-col gap-5 min-w-0">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="m-0 font-serif font-bold text-[clamp(22px,2.4vw,28px)] leading-[1.4] text-[#f0ede8]">
              {mod.title}
            </h3>
            <span className="text-[13px] tabular-nums" style={{ color: s.statusColor }}>{s.status}</span>
          </div>
          <p className="m-0 text-[15px] leading-[1.7] text-[#8a8682]">{mod.subtitle}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {mod.videos.map((item) => (
            <LessonCard key={item.id} item={item} type="video" checked={!!checked[item.id]} onToggle={onToggle} />
          ))}
          {mod.readings.map((item) => (
            <LessonCard key={item.id} item={item} type="reading" checked={!!checked[item.id]} onToggle={onToggle} />
          ))}
        </div>
      </div>
    </li>
  );
}

// ─── PlanSection ─────────────────────────────────────────────────────────────

export default function PlanSection({ checked, totalDone, onToggle, onReset }) {
  return (
    <section
      id="plan"
      className="max-w-[1160px] mx-auto pt-10 min-[860px]:pt-[clamp(64px,9vw,128px)] px-[clamp(16px,4vw,40px)] pb-[clamp(64px,8vw,112px)] grid grid-cols-[minmax(0,1fr)] min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-[clamp(40px,5vw,88px)] items-start"
    >
      <aside className="static min-[1000px]:sticky top-8 flex flex-col gap-8 min-w-0">
        <div className="flex flex-col gap-4">
          <h2
            className="m-0 font-serif font-bold text-[clamp(32px,4vw,44px)] leading-[1.35] text-[#f0ede8] flex flex-col"
            style={{ fontFeatureSettings: '"calt" 1, "liga" 1, "cswh" 1' }}
          >
            <span>خطة دراسة</span>
            <span>ريادة الأعمال</span>
          </h2>
          <p className="m-0 font-serif font-medium text-[17px] leading-[1.85] text-[#8a8682] max-w-[400px] [text-wrap:pretty]">
            مسار منظّم لإتقان أساسيات بناء الشركات الناشئة من خلال محتوى Y Combinator ، بها تصنع شركة ناشئة ناجحة
          </p>
        </div>
        <ProgressCard checked={checked} totalDone={totalDone} onReset={onReset} />
        <ModuleIndex checked={checked} />
      </aside>

      <ol className="min-w-0 list-none m-0 p-0 border-t border-white/10">
        {MODULES.map((mod, i) => (
          <ModuleItem key={mod.id} mod={mod} idx={i} checked={checked} onToggle={onToggle} />
        ))}
      </ol>
    </section>
  );
}
