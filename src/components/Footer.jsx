import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          المحتوى من{' '}
          <a
            href="https://www.ycombinator.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Y Combinator
          </a>{' '}
          — هذا الموقع ليس تابعاً لهم رسمياً.
        </p>
        <p className="footer-copy">
          بُني بواسطة سعد © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
