import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
    tags: string[];
  };
  keywords?: string[];
  noIndex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  ogUrl,
  article,
  keywords = [],
  noIndex = false
}: SEOHeadProps) => {
  const fullTitle = `${title} | DISCVR News`;
  const canonicalUrl = canonical || window.location.href;
  const imageUrl = ogImage || `${window.location.origin}/og-default.jpg`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large'} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:site_name" content="DISCVR News" />

      {/* Article-specific OG tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@discvr" />

      {/* Additional Meta Tags */}
      {article && (
        <>
          <meta name="author" content={article.author} />
          <meta name="publish_date" property="og:publish_date" content={article.publishedTime} />
        </>
      )}
    </Helmet>
  );
};
