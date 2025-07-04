
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
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research & Community
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Quick Actions Row - More compact */}
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-1 h-16 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            <Share2 size={16} className="text-blue-600" />
            <span className="font-medium text-xs">Share</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-1 h-16 border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
          >
            <Download size={16} className="text-green-600" />
            <span className="font-medium text-xs">Export</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-1 h-16 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
          >
            <FileText size={16} className="text-purple-600" />
            <span className="font-medium text-xs">Save</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center gap-1 h-16 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
            onClick={() => setShowNotes(!showNotes)}
          >
            <MessageSquare size={16} className="text-orange-600" />
            <span className="font-medium text-xs">Notes</span>
          </Button>
        </div>

        {/* Notes Section - Compact when open */}
        {showNotes && (
          <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-orange-400">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
              <MessageSquare size={14} className="text-orange-600" />
              Research Notes
            </h4>
            <Textarea
              placeholder="Add your research notes, observations, or investment thesis..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] border-gray-300 focus:border-orange-400 focus:ring-orange-100 text-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                className="bg-orange-600 hover:bg-orange-700 text-white h-8 text-xs"
              >
                Save Notes
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                className="border-gray-300 hover:bg-gray-50 h-8 text-xs"
              >
                Share Notes
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowNotes(false)}
                className="text-gray-600 hover:bg-gray-100 h-8 text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Social Media and Subscription Combined Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Social Media Sharing - Left Side */}
          <div className="space-y-3">
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Share on Social</h4>
              <p className="text-xs text-gray-600">Spread your investment research</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline"
                onClick={() => handleShareToSocial('twitter')}
                className="flex flex-col items-center gap-1 p-3 h-auto border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <Twitter size={18} className="text-blue-500" />
                <span className="text-xs font-medium text-gray-700">Twitter</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleShareToSocial('linkedin')}
                className="flex flex-col items-center gap-1 p-3 h-auto border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Linkedin size={18} className="text-blue-600" />
                <span className="text-xs font-medium text-gray-700">LinkedIn</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleShareToSocial('whatsapp')}
                className="flex flex-col items-center gap-1 p-3 h-auto border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
              >
                <MessageCircle size={18} className="text-green-600" />
                <span className="text-xs font-medium text-gray-700">WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Subscription CTAs - Right Side */}
          <div className="space-y-3">
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Stay Updated</h4>
              <p className="text-xs text-gray-600">Get daily insights & alerts</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleTelegramSubscribe}
                className="bg-blue-500 hover:bg-blue-600 text-white h-10 w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Send size={16} />
                <span className="font-medium text-sm">Telegram Updates</span>
              </Button>
              <Button 
                onClick={handleWhatsAppSubscribe}
                className="bg-green-500 hover:bg-green-600 text-white h-10 w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <MessageCircle size={16} />
                <span className="font-medium text-sm">WhatsApp Alerts</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
