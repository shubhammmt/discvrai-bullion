
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

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research & Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Research Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="border-blue-500 text-blue-600">
              <Share2 size={16} className="mr-2" />
              Share Analysis
            </Button>
            <Button variant="outline" className="border-green-500 text-green-600">
              <Download size={16} className="mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-600">
              <FileText size={16} className="mr-2" />
              Save Report
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-600"
              onClick={() => setShowNotes(!showNotes)}
            >
              <MessageSquare size={16} className="mr-2" />
              Add Notes
            </Button>
          </div>

          {/* Social Sharing */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Share on Social Platforms</h4>
            <div className="flex gap-2 flex-wrap">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                className="border-blue-400 text-blue-600 hover:bg-blue-50"
              >
                𝕏 Twitter
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('linkedin')}
                className="border-blue-600 text-blue-700 hover:bg-blue-50"
              >
                💼 LinkedIn
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('whatsapp')}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                📱 WhatsApp
              </Button>
            </div>
          </div>

          {/* Subscription CTAs */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Stay Updated</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <Button 
                onClick={handleTelegramSubscribe}
                className="bg-blue-500 hover:bg-blue-600 text-white justify-start"
              >
                <Send size={16} className="mr-2" />
                Subscribe to Telegram Updates
              </Button>
              <Button 
                onClick={handleWhatsAppSubscribe}
                className="bg-green-500 hover:bg-green-600 text-white justify-start"
              >
                <MessageCircle size={16} className="mr-2" />
                Get WhatsApp Alerts
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Get daily market insights and personalized stock alerts
            </p>
          </div>

          {/* Notes Section */}
          {showNotes && (
            <div className="space-y-3 border-t pt-4">
              <h4 className="font-medium text-gray-900">Research Notes</h4>
              <Textarea
                placeholder="Add your research notes, observations, or investment thesis..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Save Notes
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShareToSocial('twitter')}
                >
                  Share Notes
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowNotes(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
