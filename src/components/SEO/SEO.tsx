import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  path?: string;
}

export default function SEO({
  title = 'Text to Speech - Free Text to Speech Converter',
  description = 'Convert text to natural-sounding speech with our AI-powered tool. Free, fast, and easy to use. Support for multiple languages and voices.',
  keywords = 'text to speech, voice generator, speech synthesis, text to audio, AI voice, voice converter',
  ogImage = '/og-image.png',
  path = '',
}: SEOProps) {
  const siteUrl = 'https://free-text-to-speech.vercel.app';

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text to Speech",
    "applicationCategory": "Multimedia",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description,
    "url": `${siteUrl}${path}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${siteUrl}${path}`} />
      
      {/* Alternative Language Versions */}
      <link rel="alternate" href={`${siteUrl}/es${path}`} hrefLang="es" />
      <link rel="alternate" href={`${siteUrl}/fr${path}`} hrefLang="fr" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}