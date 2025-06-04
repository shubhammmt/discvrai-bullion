
import React, { useState } from 'react';
import { Share2, Download, FileText, MessageSquare, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResearchSharing = () => {
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const handleTelegramSubscribe = () => {
    window.open('https://t.me/your_channel', '_blank');
  };

  const handleWhatsAppSubscribe = () => {
    window.open('https://wa.me/your_number', '_blank');
  };

  const handleShareToSocial = (platform: string) => {
    const text = `Check out this investment analysis: ${window.location.href}`;
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
    }
    
    if (url) window.open(url, '_blank');
  };

  const handleSaveNotes = () => {
    // Save notes functionality
    console.log('Saving notes:', notes);
    setShowNotes(false);
  };

  return (
    <Card className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Share2 className="w-4 h-4 text-gray-600" />
          Share Research & Community
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Research Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            <Share2 size={14} className="mr-1.5" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            <Download size={14} className="mr-1.5" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            <FileText size={14} className="mr-1.5" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            onClick={() => setShowNotes(!showNotes)}
          >
            <MessageSquare size={14} className="mr-1.5" />
            Add Notes
          </Button>
        </div>

        {/* Notes Section */}
        {showNotes && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-medium text-gray-800 text-sm">Research Notes</h4>
            <Textarea
              placeholder="Add your research notes, observations, or investment thesis..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] text-sm border-gray-300 focus:border-blue-400"
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5"
              >
                Save Notes
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5"
              >
                Share Notes
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowNotes(false)}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Social Sharing */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3 text-sm">Share on Social Platforms</h4>
          <div className="flex gap-2 flex-wrap">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShareToSocial('twitter')}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5"
            >
              𝕏 Twitter
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShareToSocial('linkedin')}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5"
            >
              💼 LinkedIn
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleShareToSocial('whatsapp')}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5"
            >
              📱 WhatsApp
            </Button>
          </div>
        </div>

        {/* Subscription CTAs */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3 text-sm">Stay Updated</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            <Button 
              size="sm"
              onClick={handleTelegramSubscribe}
              className="bg-blue-500 hover:bg-blue-600 text-white justify-start text-xs px-3 py-2"
            >
              <Send size={14} className="mr-1.5" />
              Telegram Updates
            </Button>
            <Button 
              size="sm"
              onClick={handleWhatsAppSubscribe}
              className="bg-green-500 hover:bg-green-600 text-white justify-start text-xs px-3 py-2"
            >
              <MessageCircle size={14} className="mr-1.5" />
              WhatsApp Alerts
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Get daily market insights and personalized stock alerts
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
