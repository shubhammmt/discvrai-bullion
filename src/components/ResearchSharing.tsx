
import React, { useState } from 'react';
import { Share2, Download, FileText, MessageSquare, Send, MessageCircle, Twitter, Linkedin } from 'lucide-react';
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
    console.log('Saving notes:', notes);
    setShowNotes(false);
  };

  return (
    <Card className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research & Community
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* Main Actions Grid - More compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-20 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            <Share2 size={20} className="text-blue-600" />
            <span className="font-medium text-sm">Share</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-20 border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
          >
            <Download size={20} className="text-green-600" />
            <span className="font-medium text-sm">Export</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-20 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
          >
            <FileText size={20} className="text-purple-600" />
            <span className="font-medium text-sm">Save</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-2 h-20 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
            onClick={() => setShowNotes(!showNotes)}
          >
            <MessageSquare size={20} className="text-orange-600" />
            <span className="font-medium text-sm">Notes</span>
          </Button>
        </div>

        {/* Notes Section - Compact */}
        {showNotes && (
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MessageSquare size={16} className="text-orange-600" />
              Research Notes
            </h4>
            <Textarea
              placeholder="Add your research notes, observations, or investment thesis..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] border-gray-300 focus:border-orange-400 focus:ring-orange-100 mb-3"
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save Notes
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                className="border-gray-300 hover:bg-gray-50"
              >
                Share Notes
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowNotes(false)}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Section - Optimized Layout */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Sharing - Left */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Share on Social</h4>
              <p className="text-xs text-gray-600 mb-3">Spread your investment research</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareToSocial('twitter')}
                  className="flex items-center gap-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-3 py-2"
                >
                  <Twitter size={16} className="text-blue-500" />
                  <span className="text-sm">Twitter</span>
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareToSocial('linkedin')}
                  className="flex items-center gap-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 px-3 py-2"
                >
                  <Linkedin size={16} className="text-blue-600" />
                  <span className="text-sm">LinkedIn</span>
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareToSocial('whatsapp')}
                  className="flex items-center gap-2 border-green-200 hover:border-green-400 hover:bg-green-50 px-3 py-2"
                >
                  <MessageCircle size={16} className="text-green-600" />
                  <span className="text-sm">WhatsApp</span>
                </Button>
              </div>
            </div>

            {/* Subscription CTAs - Right */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Stay Updated</h4>
              <p className="text-xs text-gray-600 mb-3">Get daily insights & alerts</p>
              <div className="space-y-2">
                <Button 
                  onClick={handleTelegramSubscribe}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span className="font-medium">Telegram Updates</span>
                </Button>
                <Button 
                  onClick={handleWhatsAppSubscribe}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span className="font-medium">WhatsApp Alerts</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
