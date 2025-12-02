import { useEffect } from 'react';

/**
 * SEO Component for dynamically updating meta tags and page title
 * @param {Object} props - SEO configuration object
 * @param {string} props.title - Page title
 * @param {string} props.description - Page meta description
 * @param {string} props.keywords - Page keywords (comma-separated)
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.url - Canonical URL for the page
 * @param {string} props.type - Open Graph type (default: 'website')
 */
const SEO = ({
  title = 'BYTCD - Creative Design & Development Studio',
  description = 'BYTCD is a creative studio specializing in bespoke design and robust development. We transform ideas into stunning digital experiences, focusing on user-centric design and cutting-edge technology.',
  keywords = 'web development, UI/UX design, digital design, web design, custom web applications, e-commerce solutions, brand identity, graphic design, digital strategy',
  image = 'https://bytcd.com/logo.png',
  url = 'https://bytcd.com',
  type = 'website',
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update or create meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);

    // Twitter Card tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', url);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Cleanup function (optional - can reset to defaults)
    return () => {
      // Optionally reset to default values when component unmounts
    };
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;

