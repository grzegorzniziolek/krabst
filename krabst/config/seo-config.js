// ===== SEO CONFIGURATION =====
const seoConfig = {
  // Base configuration
  base: {
    siteName: "Krabst",
    siteUrl: "https://krabst.pl",
    language: "pl",
    author: "Krabst Sp. z o.o.",
    themeColor: "#2c3e50",
    logo: "https://krabst.pl/images/logo/verona-logo.png",
    favicon: "images/logo/logo_black.png.webp"
  },

  // Page-specific configurations
  pages: {
    home: {
      title: "Krabst - Personalizowane Kasetki dla Marek Beauty | Opakowania Kosmetyczne",
      description: "Specjaliści w projektowaniu i produkcji personalizowanych opakowań kosmetycznych. Od konceptu do produkcji seryjnej - tworzymy unikalne kasetki dla marek beauty.",
      keywords: "opakowania kosmetyczne, kasetki beauty, personalizowane opakowania, produkcja opakowań, projektowanie opakowań, marki beauty, kosmetyki, opakowania premium",
      canonicalUrl: "https://krabst.pl/",
      ogTitle: "Krabst - Personalizowane Kasetki dla Marek Beauty",
      ogDescription: "Specjaliści w projektowaniu i produkcji personalizowanych opakowań kosmetycznych. Od konceptu do produkcji seryjnej.",
      ogUrl: "https://krabst.pl/",
      ogImage: "https://krabst.pl/images/logo/verona-logo.png",
      twitterTitle: "Krabst - Personalizowane Kasetki dla Marek Beauty",
      twitterDescription: "Specjaliści w projektowaniu i produkcji personalizowanych opakowań kosmetycznych.",
      twitterImage: "https://krabst.pl/images/logo/verona-logo.png"
    },
    about: {
      title: "O Nas - Krabst | Specjaliści Opakowań Kosmetycznych",
      description: "Poznaj zespół Krabst - ekspertów w projektowaniu i produkcji opakowań kosmetycznych. Nasze doświadczenie i pasja w tworzeniu unikalnych rozwiązań.",
      keywords: "o nas, krabst, zespół, doświadczenie, opakowania kosmetyczne, produkcja",
      canonicalUrl: "https://krabst.pl/aboutUs.html",
      ogTitle: "O Nas - Krabst | Specjaliści Opakowań Kosmetycznych",
      ogDescription: "Poznaj zespół Krabst - ekspertów w projektowaniu i produkcji opakowań kosmetycznych.",
      ogUrl: "https://krabst.pl/aboutUs.html",
      ogImage: "https://krabst.pl/images/logo/verona-logo.png",
      twitterTitle: "O Nas - Krabst | Specjaliści Opakowań Kosmetycznych",
      twitterDescription: "Poznaj zespół Krabst - ekspertów w projektowaniu i produkcji opakowań kosmetycznych.",
      twitterImage: "https://krabst.pl/images/logo/verona-logo.png"
    },
    contact: {
      title: "Kontakt - Krabst | Skontaktuj się z Nami",
      description: "Skontaktuj się z Krabst. Oferujemy bezpłatną konsultację i wycenę personalizowanych opakowań kosmetycznych. Warszawa, Polska.",
      keywords: "kontakt, krabst, wycena, konsultacja, opakowania kosmetyczne, warszawa",
      canonicalUrl: "https://krabst.pl/contactForm.html",
      ogTitle: "Kontakt - Krabst | Skontaktuj się z Nami",
      ogDescription: "Skontaktuj się z Krabst. Oferujemy bezpłatną konsultację i wycenę personalizowanych opakowań kosmetycznych.",
      ogUrl: "https://krabst.pl/contactForm.html",
      ogImage: "https://krabst.pl/images/logo/verona-logo.png",
      twitterTitle: "Kontakt - Krabst | Skontaktuj się z Nami",
      twitterDescription: "Skontaktuj się z Krabst. Oferujemy bezpłatną konsultację i wycenę.",
      twitterImage: "https://krabst.pl/images/logo/verona-logo.png"
    }
  },

  // Organization structured data
  organization: {
    name: "Krabst",
    url: "https://krabst.pl",
    logo: "https://krabst.pl/images/logo/verona-logo.png",
    description: "Specjaliści w projektowaniu i produkcji personalizowanych opakowań kosmetycznych dla marek beauty",
    address: {
      streetAddress: "ul. Przemysłowa 15",
      addressLocality: "Warszawa",
      postalCode: "00-000",
      addressCountry: "PL"
    },
    contactPoint: {
      telephone: "+48-123-456-789",
      contactType: "customer service",
      email: "kontakt@krabst.pl"
    },
    socialMedia: [
      "https://facebook.com/krabst",
      "https://instagram.com/krabst",
      "https://linkedin.com/company/krabst"
    ]
  },

  // Services structured data
  services: {
    name: "Personalizowane Opakowania Kosmetyczne",
    description: "Projektowanie i produkcja personalizowanych opakowań kosmetycznych dla marek beauty",
    serviceType: "Produkcja opakowań",
    areaServed: "Europe",
    offers: [
      {
        name: "Produkty Gotowe",
        description: "Sprawdzone modele kasetek z możliwością personalizacji"
      },
      {
        name: "Projekty od Podstaw",
        description: "Projektowanie form od podstaw do produkcji seryjnej"
      }
    ]
  },

  // Navigation configuration
  navigation: {
    homeUrl: "home.html",
    aboutUrl: "aboutUs.html",
    offerUrl: "offer.html",
    contactUrl: "contactForm.html",
    productsUrl: "products.html"
  },

  // Contact information
  contact: {
    email: "kontakt@krabst.pl",
    phone: "+48 123 456 789",
    address: "ul. Przemysłowa 15, 00-000 Warszawa"
  },

  // Critical resources to preload
  preloadResources: [
    { href: "css/navbar.css", as: "style" },
    { href: "css/mainHeader.css", as: "style" },
    { href: "js/navbar.js", as: "script" }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = seoConfig;
} else {
  window.seoConfig = seoConfig;
} 