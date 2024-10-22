import Header from './components/Header/Header';
import Features from './components/Features/Features';
import TextToSpeech from './components/TextToSpeech/TextToSpeech';
import Footer from './components/Footer/Footer';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO/SEO';


function App() {
  return (
    <HelmetProvider>
      <SEO />
    <div className="app">
      <Analytics />
      <Header />
      <main className="main">
        <section className="hero">
          <h1>Transform Text to Natural Speech</h1>
          <p>Experience the power of AI-driven text-to-speech conversion</p>
        </section>
        <Features />
        <section id="convert" className="convert-section">
          <TextToSpeech />
        </section>
      </main>
      <Footer />
    </div>
    </HelmetProvider>
  );
}

export default App;