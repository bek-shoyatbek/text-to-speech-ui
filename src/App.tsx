import Header from './components/Header/Header';
import Features from './components/Features/Features';
import TextToSpeech from './components/TextToSpeech/TextToSpeech';
import Footer from './components/Footer/Footer';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
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
  );
}

export default App;