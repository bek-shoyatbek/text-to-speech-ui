import { useInView } from 'react-intersection-observer';
import styles from './Features.module.css';

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: "🎯",
      title: "High Accuracy",
      description: "Advanced AI models ensure precise and natural-sounding speech conversion"
    },
    {
      icon: "⚡",
      title: "Fast Processing",
      description: "Quick conversion times for efficient workflow"
    },
    {
      icon: "💾",
      title: "Easy Download",
      description: "Download your converted audio files in MP3 format"
    },
    {
      icon: "🔒",
      title: "Secure",
      description: "Your text data is processed securely and never stored"
    }
  ];

  return (
    <section id="features" className={styles.features} ref={ref}>
      <h2 className={styles.title}>Features</h2>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`${styles.featureCard} ${inView ? styles.animate : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}