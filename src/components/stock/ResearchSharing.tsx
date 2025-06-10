
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Download, Mail, MessageCircle, Copy, CheckCircle } from 'lucide-react';

const ResearchSharing = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // PDF generation logic would go here
    console.log('Generating PDF report...');
  };

  const handleEmailShare = () => {
    const subject = 'TCS Stock Research Analysis';
    const body = `Check out this detailed stock analysis for TCS: ${window.location.href}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownloadPDF}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleEmailShare}
            className="flex items-center gap-2"
          >
            <Mail size={16} />
            Email
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <MessageCircle size={16} />
            WhatsApp
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Share this AI-powered research analysis with your network
        </p>
      </CardContent>
    </Card>
  );
};

export default ResearchSharing;
