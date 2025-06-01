
import React, { useState } from 'react';
import { Share2, Download, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResearchSharing = () => {
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-blue-600" />
          Share Research & Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          {showNotes && (
            <div className="space-y-3">
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
