import { useState, useEffect, useCallback } from 'react';
import { ALL_ITEMS, TOTAL, loadChecked, saveChecked } from './data/modules.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import PlanSection from './components/PlanSection.jsx';
import CelebrationBox from './components/CelebrationBox.jsx';
import ShareSection from './components/ShareSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [checked, setChecked] = useState(loadChecked);

  // Count only items that still exist, so stale ids in storage don't inflate progress.
  const totalDone = ALL_ITEMS.filter((i) => checked[i.id]).length;
  const pct = TOTAL === 0 ? 0 : (totalDone / TOTAL) * 100;
  const allComplete = TOTAL > 0 && totalDone === TOTAL;

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  const onToggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const onReset = () => {
    if (window.confirm('هل تريد إعادة ضبط كل التقدم؟')) {
      setChecked({});
    }
  };

  return (
    <div className="min-h-screen text-[#f0ede8] overflow-x-hidden font-sans">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.05] z-[100]">
        <div
          className="h-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
          style={{ width: `${pct}%`, transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>

      {/* First screen on mobile: Nav + Hero fill the screen minus 56px. The plan
          section's 40px top padding takes most of that, so only the top ~16px of
          its heading shows, as a hint to scroll. Desktop sizes come from Hero. */}
      <div className="flex flex-col min-h-[calc(100svh-56px)] min-[860px]:block min-[860px]:min-h-0">
        <Nav />
        <Hero />
      </div>
      <PlanSection checked={checked} totalDone={totalDone} onToggle={onToggle} onReset={onReset} />
      {allComplete && <CelebrationBox />}
      <ShareSection />
      <Footer />
    </div>
  );
}
