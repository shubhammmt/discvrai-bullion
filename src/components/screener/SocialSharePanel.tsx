import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle, Send, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialSharePanelProps {
  title: string;
  description: string;
  url: string;
}

const SocialSharePanel = ({ title, description, url }: SocialSharePanelProps) => {
  const { toast } = useToast();

  const shareText = `${title}\n\n${description}\n\n${url}`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      },
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'text-blue-500',
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
      },
    },
    {
      name: 'Twitter',
      icon: Share2,
      color: 'text-sky-500',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      },
    },
    {
      name: 'Copy Link',
      icon: Link2,
      color: 'text-primary',
      action: () => {
        navigator.clipboard.writeText(url);
        toast({ title: 'Link copied!', description: 'Share this query with anyone' });
      },
    },
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share This Query
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {shareOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.name}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-3"
              onClick={option.action}
            >
              <Icon className={`h-5 w-5 ${option.color}`} />
              <span className="text-xs">{option.name}</span>
            </Button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Share your insights with the community
      </p>
    </Card>
  );
};

export default SocialSharePanel;
