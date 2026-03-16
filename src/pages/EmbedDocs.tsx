import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code2, Globe, Palette, MessageSquare, ExternalLink } from 'lucide-react';

const BASE_URL = 'https://discvrai-bullion.lovable.app';

const codeSnippets = {
  basic: `<iframe
  src="${BASE_URL}/embed/screener"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`,

  ai: `<iframe
  src="${BASE_URL}/embed/screener?mode=ai&query=best+large+cap+funds"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`,

  dark: `<iframe
  src="${BASE_URL}/embed/screener?theme=dark&hide_header=1"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px; background: #0a0a0b;"
></iframe>`,

  session: `<iframe
  src="${BASE_URL}/embed/screener?session_id=USER_SESSION_123&mode=ai"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>`,

  postMessage: `<iframe
  id="screener-embed"
  src="${BASE_URL}/embed/screener"
  width="100%"
  height="700"
  frameborder="0"
></iframe>

<script>
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'fund_selected') {
      console.log('Fund selected:', event.data.fund);
      // Handle fund selection in your app
    }
  });
</script>`,

  react: `import { useEffect, useRef } from 'react';

function ScreenerEmbed({ query, theme, sessionId }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === 'fund_selected') {
        console.log('Fund selected:', event.data.fund);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (theme) params.set('theme', theme);
  if (sessionId) params.set('session_id', sessionId);

  const src = \`${BASE_URL}/embed/screener?\${params.toString()}\`;

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width="100%"
      height="700"
      frameBorder="0"
      style={{ border: 'none', borderRadius: '8px' }}
    />
  );
}`,
};

const urlParams = [
  { param: 'query', type: 'string', default: '""', description: 'Pre-fill AI screener query. Auto-sets mode to "ai" if provided.', example: '?query=best+midcap+funds' },
  { param: 'mode', type: '"ai" | "conventional"', default: '"conventional"', description: 'Set the screener mode. "ai" uses natural language, "conventional" uses standard filters.', example: '?mode=ai' },
  { param: 'theme', type: '"light" | "dark"', default: 'system', description: 'Force light or dark theme. Defaults to system preference.', example: '?theme=dark' },
  { param: 'session_id', type: 'string', default: '""', description: 'Pass a session identifier for personalised results and analytics continuity.', example: '?session_id=abc123' },
  { param: 'hide_header', type: '"1"', default: '""', description: 'Set to "1" to hide the card header for a cleaner embedded look.', example: '?hide_header=1' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-2 right-2 h-7 px-2 text-xs gap-1 opacity-70 hover:opacity-100"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}

function CodeBlock({ code, language = 'html' }: { code: string; language?: string }) {
  return (
    <div className="relative">
      <CopyButton text={code} />
      <pre className="bg-muted/60 border rounded-lg p-4 pr-20 overflow-x-auto text-xs leading-relaxed font-mono text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const EmbedDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3 tracking-wide uppercase">
            <Code2 className="w-4 h-4" />
            Developer Documentation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Embed the Mutual Fund Screener
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Add a powerful AI-powered fund screener to any website with a single iframe tag. Supports theming, pre-filled queries, and cross-window messaging.
          </p>
        </div>

        <Separator className="mb-10" />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Quick Start
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Copy and paste this snippet into your HTML to embed the screener with default settings:
          </p>
          <CodeBlock code={codeSnippets.basic} />
        </section>

        {/* URL Parameters */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            URL Parameters
          </h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Parameter</TableHead>
                    <TableHead className="w-[150px]">Type</TableHead>
                    <TableHead className="w-[100px]">Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urlParams.map((p) => (
                    <TableRow key={p.param}>
                      <TableCell className="font-mono text-xs text-primary">{p.param}</TableCell>
                      <TableCell className="font-mono text-xs">{p.type}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{p.default}</TableCell>
                      <TableCell className="text-sm">{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Integration Examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Integration Examples
          </h2>

          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              <TabsTrigger value="ai">AI Pre-filled</TabsTrigger>
              <TabsTrigger value="dark">Dark Theme</TabsTrigger>
              <TabsTrigger value="session">With Session</TabsTrigger>
              <TabsTrigger value="react">React Component</TabsTrigger>
            </TabsList>

            <TabsContent value="ai">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Pre-filled AI Query</CardTitle>
                  <CardDescription>Opens directly in AI mode with a search query ready.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeSnippets.ai} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dark">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Dark Theme, No Header</CardTitle>
                  <CardDescription>Clean embed with dark theme and hidden header for seamless integration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeSnippets.dark} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="session">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Session Context</CardTitle>
                  <CardDescription>Pass a session ID for personalised results and analytics tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeSnippets.session} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="react">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">React Component Wrapper</CardTitle>
                  <CardDescription>A reusable React component with props and postMessage listener.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={codeSnippets.react} language="tsx" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* PostMessage API */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Cross-Window Messaging
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            The embedded screener communicates events to the parent window via <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">window.postMessage</code>. Listen for these events to react to user actions:
          </p>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono">fund_selected</CardTitle>
              <CardDescription>Fired when a user clicks on a fund in the results.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={codeSnippets.postMessage} language="html" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-foreground mb-2">Event Payload</p>
              <CodeBlock
                code={`{
  "type": "fund_selected",
  "fund": {
    "code": "16650",
    "name": "Invesco India Midcap Fund - Direct (G)",
    "category": "Mid Cap Fund",
    "nav": 223.25,
    "returns1Y": 10.56,
    "amc": "Invesco Asset Management"
  }
}`}
                language="json"
              />
            </CardContent>
          </Card>
        </section>

        {/* Live Preview */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Live Preview
          </h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <iframe
                src="/embed/screener?hide_header=1"
                width="100%"
                height="500"
                frameBorder="0"
                className="border-0"
              />
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Live embed preview — this is exactly what your users will see.
          </p>
        </section>

        <Separator className="mb-6" />
        <p className="text-xs text-muted-foreground text-center opacity-60">
          Discvr AI Embed Documentation • v1.0
        </p>
      </div>
    </div>
  );
};

export default EmbedDocs;
