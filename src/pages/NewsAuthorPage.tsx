import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Award, Briefcase, GraduationCap, Twitter, Linkedin, FileText } from 'lucide-react';
import { newsAuthors } from '@/data/newsAuthors';
import { mockNewsArticles } from '@/data/mockNewsData';
import { SEOHead } from '@/components/seo/SEOHead';
import { PersonStructuredData } from '@/components/seo/PersonStructuredData';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { ArticleCard } from '@/components/news/ArticleCard';

export const NewsAuthorPage = () => {
  const { authorId } = useParams();
  const author = authorId ? newsAuthors[authorId] : null;

  if (!author) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  const authorArticles = mockNewsArticles.filter(a => a.author.id === author.id);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${author.name} - Author Profile`}
        description={author.bio}
        keywords={[author.name, ...author.expertise]}
      />

      <PersonStructuredData
        name={author.name}
        authorId={author.id}
        image={author.avatar}
        jobTitle={author.jobTitle}
        description={author.bio}
        education={author.education}
        expertise={author.expertise}
        socialLinks={author.socialLinks}
        awards={author.awards}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'News', url: '/news' },
          { name: 'Authors', url: '/news/authors' },
          { name: author.name }
        ]}
      />

      <Header />

      {/* Author Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-32 h-32 md:w-48 md:h-48">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-4xl">{author.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-lg py-1">
                  {author.jobTitle}
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {author.bio}
              </p>

              {/* Social Links */}
              {author.socialLinks && (
                <div className="flex gap-3">
                  {author.socialLinks.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {author.socialLinks.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Author Details */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Credentials */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Credentials
            </h3>
            <p className="text-muted-foreground">{author.credentials}</p>
          </Card>

          {/* Experience */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Experience
            </h3>
            <p className="text-muted-foreground">{author.yearsOfExperience}+ years in financial analysis</p>
          </Card>

          {/* Education */}
          {author.education && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>
              <p className="text-muted-foreground">{author.education}</p>
            </Card>
          )}

          {/* Articles Count */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Published Articles
            </h3>
            <p className="text-2xl font-bold text-primary">{author.articleCount}</p>
          </Card>
        </div>

        {/* Expertise */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map(exp => (
              <Badge key={exp} variant="secondary" className="text-sm py-1 px-3">
                {exp}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Awards */}
        {author.awards && author.awards.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
            <ul className="space-y-2">
              {author.awards.map(award => (
                <li key={award} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Separator className="my-8" />

        {/* Author Articles */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Latest Articles by {author.name}</h2>
          {authorArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {authorArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No articles published yet.</p>
            </Card>
          )}
        </div>
      </div>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
