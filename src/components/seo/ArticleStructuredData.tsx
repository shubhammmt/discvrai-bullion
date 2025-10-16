import { Helmet } from 'react-helmet-async';

interface Author {
  name: string;
  id: string;
  jobTitle: string;
  description?: string;
  bio: string;
}

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: Author;
  articleBody: string;
  category: string;
  keywords: string[];
  slug: string;
}

export const ArticleStructuredData = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  articleBody,
  category,
  keywords,
  slug
}: ArticleStructuredDataProps) => {
  const articleUrl = `${window.location.origin}/news/article/${slug}`;
  const authorUrl = `${window.location.origin}/news/author/${author.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": headline,
    "image": [image],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": authorUrl,
      "jobTitle": author.jobTitle,
      "description": author.description || author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "DISCVR",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`,
        "width": 600,
        "height": 60
      }
    },
    "description": description,
    "articleBody": articleBody,
    "articleSection": category,
    "keywords": keywords,
    "wordCount": articleBody.split(' ').length,
    "inLanguage": "en-IN",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
