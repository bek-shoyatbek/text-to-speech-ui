import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Text to Speech</h3>
          <p>Converting text to natural speech with advanced AI technology.</p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#convert">Convert</a>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <div className={styles.socialLinks}>
            <a href="https://github.com/bek-shoyatbek" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/bek-shoyatbek" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/bek-shoyatbekov" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>© 2024 Text to Speech. Created with ❤️ by <a href="https://beksh.uz" target="_blank" rel="noopener noreferrer">Bek Shoyatbek</a></p>
        <p>Powered by <a href="https://play.ht" target="_blank" rel="noopener noreferrer">Play.ht</a></p>
      </div>
    </footer>
  );
}