import chapters from '../data/chapters';
import './ChapterList.css';

const typeIcons = {
  'مقال': '📄',
  'فيديو': '🎬',
  'كتاب': '📖',
};

export default function ChapterList({ data, onToggleChapter }) {
  return (
    <section id="chapters" className="chapters-section">
      <div className="container">
        <h2 className="section-heading">الفصول الدراسية</h2>
        <div className="chapters-list">
          {chapters.map((chapter) => {
            const chapterData = data.chapters[chapter.id];
            const isCompleted = chapterData?.completed;
            return (
              <div
                key={chapter.id}
                className={`chapter-card ${isCompleted ? 'chapter-completed' : ''}`}
              >
                <div className="chapter-header">
                  <div className="chapter-number">
                    {isCompleted ? '✓' : chapter.id}
                  </div>
                  <div className="chapter-info">
                    <h3 className="chapter-title">{chapter.title}</h3>
                    <p className="chapter-desc">{chapter.description}</p>
                  </div>
                </div>
                <div className="chapter-resources">
                  {chapter.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      <span className="resource-icon">
                        {typeIcons[resource.type] || '🔗'}
                      </span>
                      <div className="resource-info">
                        <span className="resource-title">{resource.title}</span>
                        <span className="resource-meta">
                          {resource.author} · {resource.type}
                        </span>
                      </div>
                      <span className="resource-arrow">←</span>
                    </a>
                  ))}
                </div>
                <div className="chapter-footer">
                  <button
                    className={`complete-btn ${isCompleted ? 'complete-btn-done' : ''}`}
                    onClick={() => onToggleChapter(chapter.id)}
                  >
                    {isCompleted ? 'مكتمل ✓' : 'أكملت هذا الفصل'}
                  </button>
                  {isCompleted && chapterData.completedAt && (
                    <span className="completed-date">
                      أُكمل في{' '}
                      {new Date(chapterData.completedAt).toLocaleDateString(
                        'ar-SA',
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
