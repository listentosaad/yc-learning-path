import useVisitorData from './hooks/useVisitorData';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import ChapterList from './components/ChapterList';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const { data, toggleChapter, completedCount, progress } = useVisitorData();

  return (
    <>
      <Hero />
      <ProgressBar
        data={data}
        completedCount={completedCount}
        progress={progress}
      />
      <ChapterList data={data} onToggleChapter={toggleChapter} />
      <About />
      <Footer />
    </>
  );
}

export default App;
