// ===== SEO UTILITIES =====
class SEOUtils {
  constructor(config) {
    this.config = config;
  }

  // Replace placeholders in HTML templates
  replacePlaceholders(template, pageData) {
    let result = template;
    
    // Replace basic placeholders
    const placeholders = {
      '{{pageTitle}}': pageData.title,
      '{{pageDescription}}': pageData.description,
      '{{pageKeywords}}': pageData.keywords,
      '{{canonicalUrl}}': pageData.canonicalUrl,
      '{{ogTitle}}': pageData.ogTitle,
      '{{ogDescription}}': pageData.ogDescription,
      '{{ogUrl}}': pageData.ogUrl,
      '{{ogImage}}': pageData.ogImage,
      '{{twitterTitle}}': pageData.twitterTitle,
      '{{twitterDescription}}': pageData.twitterDescription,
      '{{twitterImage}}': pageData.twitterImage,
      '{{homeUrl}}': this.config.navigation.homeUrl,
      '{{isHomePage}}': pageData.isHomePage ? 'page' : 'false'
    };

    Object.keys(placeholders).forEach(placeholder => {
      result = result.replace(new RegExp(placeholder, 'g'), placeholders[placeholder]);
    });

    return result;
  }

  // Generate structured data JSON-LD
  generateStructuredData(pageType = 'home') {
    const baseData = {
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": this.config.organization.name,
        "url": this.config.organization.url,
        "logo": this.config.organization.logo,
        "description": this.config.organization.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": this.config.organization.address.streetAddress,
          "addressLocality": this.config.organization.address.addressLocality,
          "postalCode": this.config.organization.address.postalCode,
          "addressCountry": this.config.organization.address.addressCountry
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": this.config.organization.contactPoint.telephone,
          "contactType": this.config.organization.contactPoint.contactType,
          "email": this.config.organization.contactPoint.email
        },
        "sameAs": this.config.organization.socialMedia
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": this.config.base.siteName,
        "url": this.config.base.siteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${this.config.base.siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      service: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": this.config.services.name,
        "provider": {
          "@type": "Organization",
          "name": this.config.organization.name
        },
        "description": this.config.services.description,
        "serviceType": this.config.services.serviceType,
        "areaServed": this.config.services.areaServed,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Usługi Krabst",
          "itemListElement": this.config.services.offers.map(offer => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": offer.name,
              "description": offer.description
            }
          }))
        }
      }
    };

    return baseData;
  }

  // Insert structured data into page
  insertStructuredData(structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  // Load and inject SEO components
  async loadSEOComponent(componentPath, pageData) {
    try {
      const response = await fetch(componentPath);
      const template = await response.text();
      return this.replacePlaceholders(template, pageData);
    } catch (error) {
      console.error('Error loading SEO component:', error);
      return '';
    }
  }

  // Initialize SEO for a page
  async initSEO(pageType = 'home') {
    const pageData = this.config.pages[pageType];
    if (!pageData) {
      console.error(`Page configuration not found for: ${pageType}`);
      return;
    }

    // Set page-specific data
    pageData.isHomePage = pageType === 'home';

    // Update document title and meta tags
    document.title = pageData.title;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageData.description;

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageData.canonicalUrl;

    // Insert structured data
    const structuredData = this.generateStructuredData(pageType);
    Object.values(structuredData).forEach(data => {
      this.insertStructuredData(data);
    });

    // Load and inject components
    const components = ['navbar', 'footer'];
    for (const component of components) {
      const componentHtml = await this.loadSEOComponent(`components/${component}.html`, pageData);
      const container = document.getElementById(`${component}-container`);
      if (container) {
        container.innerHTML = componentHtml;
      }
    }
  }

  // Generate sitemap data
  generateSitemapData() {
    const pages = Object.keys(this.config.pages);
    return pages.map(page => ({
      url: this.config.pages[page].canonicalUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page === 'home' ? 'weekly' : 'monthly',
      priority: page === 'home' ? '1.0' : '0.8'
    }));
  }

  // Add breadcrumb structured data
  addBreadcrumbData(breadcrumbs) {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };

    this.insertStructuredData(breadcrumbData);
  }
}

// Initialize SEO utilities with config
let seoUtils;
if (typeof seoConfig !== 'undefined') {
  seoUtils = new SEOUtils(seoConfig);
} else {
  // Fallback if config is not loaded
  console.warn('SEO config not found. Loading default configuration...');
  // You can load the config here or use a default one
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOUtils;
} else {
  window.SEOUtils = SEOUtils;
  window.seoUtils = seoUtils;
} 