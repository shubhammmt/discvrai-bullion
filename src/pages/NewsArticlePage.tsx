import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, Share2, Bookmark, TrendingUp, ChevronRight } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { mockNewsArticles } from '@/data/mockNewsData';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArticleStructuredData } from '@/components/seo/ArticleStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { ArticleCard } from '@/components/news/ArticleCard';

export const NewsArticlePage = () => {
  const { slug } = useParams();
  const article = mockNewsArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = mockNewsArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.headline}
        description={article.summary}
        ogType="article"
        ogImage={article.imageUrl}
        keywords={article.keywords}
        article={{
          publishedTime: article.publishedAt,
          modifiedTime: article.updatedAt,
          author: article.author.name,
          section: article.category,
          tags: article.tags
        }}
      />

      <ArticleStructuredData
        headline={article.headline}
        description={article.summary}
        image={article.imageUrl}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        author={article.author}
        articleBody={article.content}
        category={article.category}
        keywords={article.keywords}
        slug={article.slug}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'News', url: '/news' },
          { name: article.category, url: `/news/category/${article.category.toLowerCase()}` },
          { name: article.headline }
        ]}
      />

      <Header />

      {/* Breadcrumb */}
      <nav className="bg-card border-b">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/news" className="hover:text-foreground transition-colors">News</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/news/category/${article.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {article.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate">{article.headline}</span>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default">{article.category}</Badge>
            {article.featured && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.headline}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {article.summary}
          </p>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <Link 
              to={`/news/author/${article.author.id}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">{article.author.credentials}</p>
              </div>
            </Link>

            <Separator orientation="vertical" className="h-12 hidden md:block" />

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>
                  {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Save
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link key={tag} to={`/news/tag/${tag}`}>
                  <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {article.relatedProducts && article.relatedProducts.length > 0 && (
          <Card className="p-6 mb-8 bg-secondary/20">
            <h3 className="text-lg font-semibold mb-4">Related Products</h3>
            <div className="space-y-2">
              {article.relatedProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/${product.type}/${product.id}`}
                  className="block hover:bg-secondary/50 p-3 rounded-lg transition-colors"
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{product.type}</p>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Last Updated */}
        {article.updatedAt !== article.publishedAt && (
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}
          </p>
        )}

        <Separator className="my-8" />

        {/* Author Bio */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">About the Author</h3>
          <Link to={`/news/author/${article.author.id}`} className="flex gap-4 hover:opacity-80 transition-opacity">
            <Avatar className="w-16 h-16">
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-lg">{article.author.name}</p>
              <p className="text-sm text-muted-foreground mb-2">{article.author.jobTitle}</p>
              <p className="text-sm mb-2">{article.author.bio}</p>
              <div className="flex gap-2 flex-wrap">
                {article.author.expertise.slice(0, 3).map(exp => (
                  <Badge key={exp} variant="outline" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(relArticle => (
                <ArticleCard key={relArticle.id} article={relArticle} />
              ))}
            </div>
          </div>
        )}
      </article>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
