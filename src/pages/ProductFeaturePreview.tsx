import Header from '@/components/Header';
import GlobalFooter from '@/components/GlobalFooter';
import MobileBottomNav from '@/components/MobileBottomNav';
import { EnhancedByteNewsCard } from '@/components/news/EnhancedByteNewsCard';
import { ByteNewsCard } from '@/components/news/ByteNewsCard';
import { MUTUAL_FUND_FEATURES, AI_SCREENING_QUERIES } from '@/data/productFeatures';
import { mockByteNews } from '@/data/mockNewsData';

const ProductFeaturePreview = () => {
  // Mix product features with news bytes to show how they blend in
  const mixedFeed = [
    { type: 'news' as const, data: mockByteNews[0] },
    { type: 'product-feature' as const, data: MUTUAL_FUND_FEATURES[0] },
    { type: 'news' as const, data: mockByteNews[1] },
    { type: 'news' as const, data: mockByteNews[2] },
    { type: 'product-feature' as const, data: MUTUAL_FUND_FEATURES[1] },
    { type: 'news' as const, data: mockByteNews[3] },
    { type: 'product-feature' as const, data: MUTUAL_FUND_FEATURES[2] },
    { type: 'news' as const, data: mockByteNews[4] },
    { type: 'product-feature' as const, data: MUTUAL_FUND_FEATURES[3] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Preview Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Feature Cards Preview</h1>
          <p className="text-muted-foreground">
            See how product feature cards blend into your news byte feed
          </p>
        </div>

        {/* All Feature Cards Showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Mutual Fund Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {MUTUAL_FUND_FEATURES.map((feature) => (
              <EnhancedByteNewsCard
                key={feature.id}
                type="product-feature"
                productFeature={feature}
              />
            ))}
          </div>
        </section>

        {/* AI Screening Query Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">AI Screening Query Cards</h2>
          <p className="text-muted-foreground mb-6">
            Smart query cards that link directly to pre-filled AI screening results
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_SCREENING_QUERIES.map((query) => (
              <EnhancedByteNewsCard
                key={query.id}
                type="product-feature"
                productFeature={query}
              />
            ))}
          </div>
        </section>

        {/* Mixed Feed Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mixed Feed Example</h2>
          <p className="text-muted-foreground mb-6">
            Product features seamlessly integrated with news bytes
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mixedFeed.map((item, index) => (
              item.type === 'product-feature' ? (
                <EnhancedByteNewsCard
                  key={`pf-${index}`}
                  type="product-feature"
                  productFeature={item.data}
                />
              ) : (
                <ByteNewsCard
                  key={`news-${index}`}
                  news={item.data}
                />
              )
            ))}
          </div>
        </section>

        {/* Developer Integration Guide */}
        <section className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🔧 Developer Integration Guide</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Import Required Components</h3>
              <pre className="bg-background p-3 rounded-md overflow-x-auto">
{`import { EnhancedByteNewsCard } from '@/components/news/EnhancedByteNewsCard';
import { MUTUAL_FUND_FEATURES, getRandomProductFeature } from '@/data/productFeatures';`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Basic Usage - Single Card</h3>
              <pre className="bg-background p-3 rounded-md overflow-x-auto">
{`<EnhancedByteNewsCard 
  type="product-feature" 
  productFeature={MUTUAL_FUND_FEATURES[0]} 
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Random Feature Insertion</h3>
              <pre className="bg-background p-3 rounded-md overflow-x-auto">
{`// Insert random product feature every N items
const mixedFeed = [];
newsByteItems.forEach((news, index) => {
  mixedFeed.push({ type: 'news', data: news });
  
  // Insert product feature every 3 items
  if ((index + 1) % 3 === 0) {
    mixedFeed.push({ 
      type: 'product-feature', 
      data: getRandomProductFeature() 
    });
  }
});`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Rendering Mixed Feed</h3>
              <pre className="bg-background p-3 rounded-md overflow-x-auto">
{`{mixedFeed.map((item, index) => (
  item.type === 'product-feature' ? (
    <EnhancedByteNewsCard
      key={\`pf-\${index}\`}
      type="product-feature"
      productFeature={item.data}
    />
  ) : (
    <ByteNewsCard
      key={\`news-\${index}\`}
      news={item.data}
    />
  )
))}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Customization Options</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Modify insertion frequency (every 3rd, 5th, 10th item)</li>
                <li>Add A/B testing to track which features get more clicks</li>
                <li>Personalize based on user behavior (show relevant features)</li>
                <li>Track analytics when users click feature cards</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6. Files to Note</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><code className="bg-background px-1 rounded">src/components/news/ProductFeatureCard.tsx</code> - Main card component</li>
                <li><code className="bg-background px-1 rounded">src/data/productFeatures.ts</code> - Feature data & helpers</li>
                <li><code className="bg-background px-1 rounded">src/types/news.ts</code> - TypeScript interface</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};

export default ProductFeaturePreview;
