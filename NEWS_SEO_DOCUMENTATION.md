# News Platform - SEO & Architecture Documentation

## URL Structure

### Primary URLs
```
/news                           # News hub - all categories
/news/category/[slug]           # Category pages (ipo, ai, crypto, stocks, etc.)
/news/article/[slug]            # Individual article pages
/news/author/[author-id]        # Author profile pages
/news/latest                    # Byte-sized news feed
/news/tag/[tag-slug]           # Tag-based filtering
```

### URL Pattern Rules
- **Kebab-case**: All URLs use lowercase with hyphens
- **Semantic slugs**: Descriptive, keyword-rich slugs
- **Date inclusion**: Optional `/news/2025/01/article-slug` for time-sensitive content
- **Canonical URLs**: Always set to prevent duplicate content issues

### Example URLs
```
/news/article/sebi-new-regulations-mutual-funds-2025
/news/category/ipo
/news/author/financial-research-team
/news/latest?category=crypto
/news/tag/regulatory-changes
```

---

## SEO Schema Implementation (JSON-LD)

### 1. NewsArticle Schema
**Location**: Individual article pages (`/news/article/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title (Max 110 characters)",
  "alternativeHeadline": "Secondary headline if needed",
  "image": [
    "https://example.com/image-1x1.jpg",
    "https://example.com/image-4x3.jpg",
    "https://example.com/image-16x9.jpg"
  ],
  "datePublished": "2025-01-17T08:00:00+05:30",
  "dateModified": "2025-01-17T09:30:00+05:30",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://example.com/news/author/author-id",
    "jobTitle": "Senior Financial Analyst",
    "description": "Expert in financial markets with 10+ years experience"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DISCVR",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "description": "Meta description (Max 160 characters)",
  "articleBody": "Full article text...",
  "articleSection": "Finance",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "wordCount": 450,
  "inLanguage": "en-IN",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/news/article/slug"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".article-headline", ".article-summary"]
  }
}
```

### 2. Person Schema (Author Pages)
**Location**: Author profile pages (`/news/author/[author-id]`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Author Full Name",
  "url": "https://example.com/news/author/author-id",
  "image": "https://example.com/author-photo.jpg",
  "jobTitle": "Senior Financial Analyst",
  "description": "Detailed bio highlighting expertise, credentials, and experience",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University Name"
  },
  "knowsAbout": [
    "Financial Markets",
    "IPO Analysis",
    "Cryptocurrency",
    "Mutual Funds"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "DISCVR"
  },
  "sameAs": [
    "https://twitter.com/authorhandle",
    "https://linkedin.com/in/authorprofile"
  ],
  "award": ["Award 1", "Certification 2"],
  "publishingPrinciples": "https://example.com/editorial-guidelines"
}
```

### 3. BreadcrumbList Schema
**Location**: All news pages

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "News",
      "item": "https://example.com/news"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "IPO",
      "item": "https://example.com/news/category/ipo"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Article Title"
    }
  ]
}
```

### 4. WebSite Schema (Search)
**Location**: News hub page

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DISCVR News",
  "url": "https://example.com/news",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/news/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 5. Organization Schema
**Location**: All pages (global)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DISCVR",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "description": "AI-powered financial research platform",
  "sameAs": [
    "https://twitter.com/discvr",
    "https://linkedin.com/company/discvr"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "support@example.com"
  }
}
```

### 6. ItemList Schema (Category Pages)
**Location**: Category listing pages

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://example.com/news/article/slug-1"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://example.com/news/article/slug-2"
    }
  ]
}
```

---

## E-E-A-T Implementation (Experience, Expertise, Authoritativeness, Trust)

### Author Profile Requirements

#### 1. Author Bio Page Components
- **Full Name & Photo**: Professional headshot (minimum 400x400px)
- **Job Title & Credentials**: Clear expertise indicators
- **Detailed Biography**: 200-300 words highlighting:
  - Years of experience
  - Educational background
  - Areas of specialization
  - Professional achievements
  - Certifications/Awards
- **Article Portfolio**: List of all published articles
- **Social Proof**: LinkedIn, Twitter links
- **Expertise Areas**: Tags/categories of specialization

#### 2. Author Byline on Articles
- Author name (linked to profile)
- Author photo thumbnail
- Brief credential snippet (e.g., "10+ years in financial analysis")
- Publication date & last updated date
- Reading time estimate

#### 3. Editorial Standards Page
Create `/about/editorial-standards` with:
- Fact-checking process
- Source verification methods
- Correction policy
- Author credentials requirements
- Conflict of interest disclosure

### Trust Signals
- **HTTPS**: Secure connection (already implemented)
- **Contact Information**: Clear contact page
- **Privacy Policy**: Comprehensive privacy documentation
- **About Page**: Team credentials and company background
- **Transparent Corrections**: Visible update history on articles
- **Source Citations**: Links to original data sources

---

## Meta Tags Strategy

### Standard Meta Tags (All Pages)
```html
<title>Keyword-rich Title | DISCVR News</title>
<meta name="description" content="Compelling 150-160 character description with target keywords">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<link rel="canonical" href="https://example.com/news/article/slug">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
```

### Open Graph Tags (Social Sharing)
```html
<meta property="og:type" content="article">
<meta property="og:title" content="Article Title">
<meta property="og:description" content="Article description">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/news/article/slug">
<meta property="og:site_name" content="DISCVR News">
<meta property="article:published_time" content="2025-01-17T08:00:00+05:30">
<meta property="article:modified_time" content="2025-01-17T09:30:00+05:30">
<meta property="article:author" content="Author Name">
<meta property="article:section" content="Finance">
<meta property="article:tag" content="keyword1">
```

### Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Article Title">
<meta name="twitter:description" content="Article description">
<meta name="twitter:image" content="https://example.com/twitter-card.jpg">
<meta name="twitter:site" content="@discvr">
<meta name="twitter:creator" content="@authorhandle">
```

### Article-Specific Meta Tags
```html
<meta property="article:publisher" content="https://facebook.com/discvr">
<meta name="author" content="Author Name">
<meta name="news_keywords" content="keyword1, keyword2">
<meta name="publish_date" property="og:publish_date" content="2025-01-17T08:00:00+05:30">
```

---

## Internal Linking Strategy

### Contextual Links in Articles
- **Product Page Links**: Mention stocks → link to `/stock/[symbol]`
- **Related Articles**: 3-5 related article links at end
- **Category Links**: Link to category pages from article tags
- **Author Links**: Author byline links to author profile
- **Glossary Links**: Financial terms link to definitions

### Anchor Text Best Practices
- Natural, descriptive anchor text
- Avoid "click here" or generic text
- Use target keyword variations
- Don't over-optimize (mix branded + keyword anchors)

### Internal Link Structure
```
Article → Related Articles (same category)
Article → Author Profile
Article → Product Pages (stocks, mutual funds, crypto)
Article → Category Archive
Article → Tag Pages
Category → Latest Articles
Category → Trending Articles
Hub → All Categories
```

---

## Sitemap Structure

### XML Sitemaps

#### 1. news-sitemap.xml (Google News)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://example.com/news/article/slug</loc>
    <news:news>
      <news:publication>
        <news:name>DISCVR</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-01-17T08:00:00+05:30</news:publication_date>
      <news:title>Article Title</news:title>
      <news:keywords>keyword1, keyword2, keyword3</news:keywords>
    </news:news>
  </url>
</urlset>
```

#### 2. sitemap-news.xml (Regular)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/news/article/slug</loc>
    <lastmod>2025-01-17T09:30:00+05:30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Sitemap Index
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/news-sitemap.xml</loc>
    <lastmod>2025-01-17</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-articles.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-authors.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-categories.xml</loc>
  </sitemap>
</sitemapindex>
```

---

## Technical SEO Requirements

### Page Speed Optimization
- **Image Optimization**: WebP format, lazy loading, responsive images
- **Code Splitting**: Dynamic imports for heavy components
- **Critical CSS**: Inline critical CSS, defer non-critical
- **CDN**: Serve static assets from CDN
- **Compression**: Gzip/Brotli compression enabled

### Mobile Optimization
- **Responsive Design**: Mobile-first approach
- **Touch Targets**: Minimum 48x48px tap targets
- **Viewport Meta**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Mobile Page Speed**: Target <3s load time
- **AMP (Optional)**: Consider AMP for news articles

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Accessibility (SEO Impact)
- **Semantic HTML**: Proper heading hierarchy (H1 → H2 → H3)
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: For interactive elements
- **Keyboard Navigation**: Full keyboard accessibility

---

## Content Guidelines

### Article Structure
1. **Headline**: 60-70 characters, includes primary keyword
2. **Meta Description**: 150-160 characters, compelling CTA
3. **Introduction**: 50-100 words, hook + key points
4. **Body**: 300-400 words, scannable paragraphs
5. **Subheadings**: H2/H3 tags with keywords
6. **Conclusion**: Summary + CTA
7. **Related Links**: Internal + external sources

### Keyword Optimization
- **Primary Keyword**: In title, first paragraph, 1-2 subheadings
- **Secondary Keywords**: Natural distribution throughout
- **LSI Keywords**: Related terms and synonyms
- **Keyword Density**: 1-2% (natural, not forced)

### Content Freshness
- **Update Date**: Show last updated date prominently
- **Content Refresh**: Regular updates for evergreen content
- **News Velocity**: Publish timely, breaking news
- **Historical Content**: Archive old news, mark as historical

---

## Analytics & Monitoring

### Key Metrics to Track
- **Organic Traffic**: Google Analytics 4
- **Rankings**: Track keyword positions
- **CTR**: Search Console click-through rates
- **Engagement**: Time on page, bounce rate
- **Core Web Vitals**: PageSpeed Insights
- **Index Coverage**: Google Search Console

### SEO Tools Integration
- **Google Search Console**: Submit sitemaps, monitor errors
- **Google Analytics**: Track user behavior
- **Schema Validator**: Test structured data
- **Mobile-Friendly Test**: Ensure mobile optimization

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] URL structure implementation
- [ ] Meta tags component
- [ ] Structured data (JSON-LD) component
- [ ] Canonical URLs
- [ ] robots.txt configuration

### Phase 2: Content
- [ ] Article page template
- [ ] Author profile pages
- [ ] Category pages
- [ ] Tag pages
- [ ] Breadcrumb navigation

### Phase 3: Technical
- [ ] XML sitemaps generation
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Mobile responsiveness

### Phase 4: E-E-A-T
- [ ] Author bios with credentials
- [ ] Editorial standards page
- [ ] About page with team info
- [ ] Source citations
- [ ] Correction policy

### Phase 5: Monitoring
- [ ] Google Search Console setup
- [ ] Analytics implementation
- [ ] Performance monitoring
- [ ] Schema validation
- [ ] Regular audits

---

## Category Structure

### Primary Categories
- **IPO**: Initial public offerings, listings, performance
- **Stocks**: Equity markets, stock analysis, trading
- **Mutual Funds**: Fund analysis, NAV updates, recommendations
- **Crypto**: Cryptocurrency news, market updates, regulations
- **AI/Technology**: AI in finance, fintech, innovations
- **Regulatory**: SEBI updates, compliance, policy changes
- **Economy**: Macroeconomic news, GDP, inflation
- **Global Markets**: International markets, forex

### Category Page URLs
```
/news/category/ipo
/news/category/stocks
/news/category/mutual-funds
/news/category/crypto
/news/category/ai-fintech
/news/category/regulatory
/news/category/economy
/news/category/global-markets
```

---

## Future Enhancements

### Phase 2 Features
- **Video Content**: Video schema markup
- **Podcasts**: PodcastSeries schema
- **Live Blog**: LiveBlogPosting schema for breaking news
- **FAQ Schema**: For common questions
- **How-To Schema**: For educational content
- **Multi-language**: hreflang tags for Hindi/regional languages
- **AMP Pages**: Accelerated Mobile Pages for news
- **PWA**: Progressive Web App capabilities

### Advanced SEO
- **Featured Snippets**: Target position 0 optimization
- **Knowledge Graph**: Enhanced entity relationships
- **Voice Search**: Natural language optimization
- **Image SEO**: Pinterest, Google Images optimization
- **Local SEO**: City-specific financial news

---

## Maintenance Schedule

### Daily
- Monitor breaking news publication
- Check Search Console for errors
- Review real-time analytics

### Weekly
- Update trending articles
- Refresh category pages
- Review top-performing content
- Check backlink profile

### Monthly
- Content audit and updates
- Keyword ranking review
- Technical SEO audit
- Core Web Vitals check
- Competitor analysis

### Quarterly
- Major content refresh
- Author profile updates
- Schema markup validation
- Full site audit
- Strategy review
