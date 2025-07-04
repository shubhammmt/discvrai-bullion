
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
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research & Community
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-12 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            <Share2 size={18} className="text-blue-600" />
            <span className="font-medium">Share</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-12 border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
          >
            <Download size={18} className="text-green-600" />
            <span className="font-medium">Export</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-12 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
          >
            <FileText size={18} className="text-purple-600" />
            <span className="font-medium">Save</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 h-12 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
            onClick={() => setShowNotes(!showNotes)}
          >
            <MessageSquare size={18} className="text-orange-600" />
            <span className="font-medium">Notes</span>
          </Button>
        </div>

        {/* Notes Section */}
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
              className="min-h-[100px] border-gray-300 focus:border-orange-400 focus:ring-orange-100"
            />
            <div className="flex gap-2 mt-3">
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

        {/* Social Media Sharing */}
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-semibold text-gray-800 mb-1">Share on Social Platforms</h4>
            <p className="text-sm text-gray-600">Spread the word about your investment research</p>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleShareToSocial('twitter')}
              className="flex items-center gap-3 px-6 py-3 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
            >
              <Twitter size={20} className="text-blue-500 group-hover:text-blue-600" />
              <span className="font-medium text-gray-700 group-hover:text-blue-600">Twitter</span>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleShareToSocial('linkedin')}
              className="flex items-center gap-3 px-6 py-3 border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
            >
              <Linkedin size={20} className="text-blue-600 group-hover:text-blue-700" />
              <span className="font-medium text-gray-700 group-hover:text-blue-700">LinkedIn</span>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleShareToSocial('whatsapp')}
              className="flex items-center gap-3 px-6 py-3 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
            >
              <MessageCircle size={20} className="text-green-600 group-hover:text-green-700" />
              <span className="font-medium text-gray-700 group-hover:text-green-700">WhatsApp</span>
            </Button>
          </div>
        </div>

        {/* Subscription CTAs */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="font-semibold text-gray-800 mb-1">Stay Updated</h4>
            <p className="text-sm text-gray-600">Get daily market insights and personalized alerts</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            <Button 
              onClick={handleTelegramSubscribe}
              className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send size={18} />
              <span className="font-medium">Telegram Updates</span>
            </Button>
            <Button 
              onClick={handleWhatsAppSubscribe}
              className="bg-green-500 hover:bg-green-600 text-white h-12 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <MessageCircle size={18} />
              <span className="font-medium">WhatsApp Alerts</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
