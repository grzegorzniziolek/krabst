# 🚀 Modular SEO System for Krabst

This document explains how to use the modular SEO system that has been implemented to keep your code clean and maintainable.

## 📁 File Structure

```
krabst/
├── components/
│   ├── seo-head.html          # SEO meta tags and head elements
│   ├── structured-data.html   # JSON-LD structured data
│   ├── navbar.html           # Navigation component
│   └── footer.html           # Footer component
├── config/
│   └── seo-config.js         # SEO configuration and data
├── js/
│   └── seo-utils.js          # SEO utilities and functions
└── home.html                 # Main page using modular components
```

## 🎯 How It Works

### 1. **Configuration-Driven SEO** (`config/seo-config.js`)
All SEO data is centralized in one configuration file:

```javascript
const seoConfig = {
  base: {
    siteName: "Krabst",
    siteUrl: "https://krabst.pl",
    // ... more base settings
  },
  pages: {
    home: {
      title: "Krabst - Personalizowane Kasetki dla Marek Beauty",
      description: "Specjaliści w projektowaniu...",
      // ... page-specific SEO data
    },
    about: {
      // ... about page SEO data
    }
  }
};
```

### 2. **Reusable Components** (`components/`)
Each component contains template placeholders that get replaced with actual data:

```html
<!-- components/seo-head.html -->
<title>{{pageTitle}}</title>
<meta name="description" content="{{pageDescription}}">
<meta property="og:title" content="{{ogTitle}}">
```

### 3. **Dynamic Content Replacement** (`js/seo-utils.js`)
The SEO utilities handle:
- Replacing placeholders with actual data
- Generating structured data
- Managing meta tags dynamically
- Loading and injecting components

## 🔧 How to Use

### For a New Page

1. **Add page configuration** to `config/seo-config.js`:
```javascript
pages: {
  newPage: {
    title: "New Page - Krabst",
    description: "Page description...",
    keywords: "keyword1, keyword2",
    canonicalUrl: "https://krabst.pl/newPage.html",
    // ... other SEO data
  }
}
```

2. **Create your HTML page** with component includes:
```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Load SEO config -->
  <script src="config/seo-config.js"></script>
  
  <!-- Include SEO head component -->
  <!-- Include: components/seo-head.html -->
  
  <!-- Your styles -->
  <link rel="stylesheet" href="css/your-styles.css">
</head>
<body>
  <!-- Include navbar -->
  <!-- Include: components/navbar.html -->
  
  <!-- Your page content -->
  <main>
    <h1>Your Page Content</h1>
  </main>
  
  <!-- Include footer -->
  <!-- Include: components/footer.html -->
  
  <!-- Load SEO utilities -->
  <script src="js/seo-utils.js"></script>
  
  <!-- Initialize SEO -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof seoUtils !== 'undefined') {
        seoUtils.initSEO('newPage'); // Use your page type
      }
    });
  </script>
</body>
</html>
```

### For Existing Pages

1. **Replace inline SEO** with component includes
2. **Add the initialization script** at the bottom
3. **Update navigation links** to use the config

## 🛠️ Available Components

### 1. **SEO Head Component** (`components/seo-head.html`)
Contains all meta tags, Open Graph, Twitter Cards, and basic SEO elements.

**Placeholders:**
- `{{pageTitle}}` - Page title
- `{{pageDescription}}` - Meta description
- `{{pageKeywords}}` - Meta keywords
- `{{canonicalUrl}}` - Canonical URL
- `{{ogTitle}}`, `{{ogDescription}}`, etc. - Open Graph tags
- `{{twitterTitle}}`, `{{twitterDescription}}`, etc. - Twitter Card tags

### 2. **Structured Data Component** (`components/structured-data.html`)
Contains JSON-LD structured data for:
- Organization information
- Website data
- Service offerings

### 3. **Navigation Component** (`components/navbar.html`)
Reusable navigation with proper accessibility attributes.

**Placeholders:**
- `{{homeUrl}}` - Home page URL
- `{{isHomePage}}` - Current page indicator

### 4. **Footer Component** (`components/footer.html`)
Reusable footer with contact information and links.

**Placeholders:**
- `{{homeUrl}}` - Home page URL
- `{{isHomePage}}` - Current page indicator

## 🔄 Updating SEO Data

### To update site-wide SEO:
1. Edit `config/seo-config.js`
2. Update the `base` section for global changes
3. Update individual page configurations as needed

### To add a new page:
1. Add page configuration to `seo-config.js`
2. Create the HTML file with component includes
3. Initialize SEO with the correct page type

### To update structured data:
1. Edit `components/structured-data.html`
2. Or modify the `generateStructuredData()` method in `seo-utils.js`

## 📊 SEO Features Included

### ✅ Meta Tags
- Title, description, keywords
- Canonical URLs
- Robots directives
- Language settings

### ✅ Social Media
- Open Graph tags (Facebook/LinkedIn)
- Twitter Card tags
- Social media previews

### ✅ Structured Data (JSON-LD)
- Organization schema
- Website schema
- Service schema
- Contact information

### ✅ Performance
- Resource preloading
- Lazy loading images
- Critical CSS/JS loading

### ✅ Accessibility
- ARIA labels and roles
- Semantic HTML structure
- Screen reader support

### ✅ Technical SEO
- Clean URL structure
- Proper heading hierarchy
- Internal linking
- Mobile optimization

## 🚀 Benefits

1. **Maintainable**: All SEO data in one place
2. **Reusable**: Components can be used across pages
3. **Consistent**: Standardized SEO implementation
4. **Scalable**: Easy to add new pages
5. **Clean**: Separation of concerns
6. **Dynamic**: Content can be updated programmatically

## 🔧 Advanced Usage

### Custom Structured Data
```javascript
// Add custom structured data
seoUtils.addBreadcrumbData([
  { name: "Home", url: "https://krabst.pl/" },
  { name: "Products", url: "https://krabst.pl/products.html" }
]);
```

### Generate Sitemap Data
```javascript
// Get sitemap data
const sitemapData = seoUtils.generateSitemapData();
console.log(sitemapData);
```

### Dynamic SEO Updates
```javascript
// Update SEO data dynamically
seoUtils.updatePageSEO({
  title: "New Title",
  description: "New description"
});
```

## 📝 Notes

- All components use template placeholders that get replaced with actual data
- The system is designed to work with static HTML files
- For server-side rendering, you can use the same components with server-side template engines
- The SEO utilities are loaded after the config to ensure proper initialization
- All structured data is automatically generated from the configuration

This modular approach makes your SEO implementation clean, maintainable, and scalable! 🎉 