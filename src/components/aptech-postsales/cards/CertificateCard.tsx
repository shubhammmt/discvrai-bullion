import React, { useState } from 'react';
import { Award, Download, Eye, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CertificateCardProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  brand: string;
  isPreview?: boolean; // for recommended courses — shows a sample
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  studentName,
  courseName,
  completionDate,
  certificateId,
  brand,
  isPreview = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const brandColors: Record<string, { bg: string; accent: string; border: string }> = {
    Arena: { bg: 'from-orange-500 to-red-500', accent: 'text-orange-600', border: 'border-orange-300' },
    MAAC: { bg: 'from-blue-600 to-indigo-700', accent: 'text-blue-600', border: 'border-blue-300' },
    LAPA: { bg: 'from-teal-500 to-cyan-600', accent: 'text-teal-600', border: 'border-teal-300' },
    'Lakmé Academy': { bg: 'from-pink-500 to-rose-600', accent: 'text-pink-600', border: 'border-pink-300' },
  };

  const colors = brandColors[brand] || brandColors.Arena;

  return (
    <div className="animate-fade-in">
      {/* Compact card */}
      <div className={`bg-white border ${colors.border} rounded-xl overflow-hidden shadow-sm`}>
        {/* Header band */}
        <div className={`bg-gradient-to-r ${colors.bg} px-4 py-2 flex items-center gap-2`}>
          <Award className="h-4 w-4 text-white" />
          <span className="text-white text-xs font-semibold">
            {isPreview ? 'Sample Certificate Preview' : 'Course Certificate'}
          </span>
          {isPreview && (
            <span className="ml-auto bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">Preview</span>
          )}
        </div>

        <div className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground">{isPreview ? 'On completion, you will receive:' : 'Congratulations! Your certificate is ready.'}</p>
          <p className={`text-sm font-semibold ${colors.accent}`}>{courseName}</p>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>Student: <strong className="text-foreground">{studentName}</strong></p>
            <p>{isPreview ? 'Expected completion' : 'Completed'}: <strong className="text-foreground">{completionDate}</strong></p>
            <p>Certificate ID: <span className="font-mono text-[10px]">{certificateId}</span></p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setExpanded(true)}
              className={`text-xs h-7 ${colors.border}`}
            >
              <Eye className="h-3 w-3 mr-1" /> View
            </Button>
            {!isPreview && (
              <Button
                size="sm"
                className={`text-xs h-7 bg-gradient-to-r ${colors.bg} text-white`}
              >
                <Download className="h-3 w-3 mr-1" /> Download
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded certificate view */}
      {expanded && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setExpanded(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-sm font-semibold">Certificate {isPreview ? 'Preview' : 'View'}</span>
              <button onClick={() => setExpanded(false)} className="p-1 hover:bg-muted rounded-lg"><X className="h-4 w-4" /></button>
            </div>

            {/* Certificate render */}
            <div className="p-6">
              <div className={`border-4 ${colors.border} rounded-xl p-6 text-center relative bg-gradient-to-b from-white to-orange-50/30`}>
                {isPreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-6xl font-black text-muted-foreground/10 rotate-[-20deg] select-none">SAMPLE</span>
                  </div>
                )}
                {/* Logo area */}
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4`}>
                  <Award className="h-8 w-8 text-white" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{brand}</p>
                <h2 className="text-lg font-bold text-foreground mb-1">Certificate of Completion</h2>
                <p className="text-xs text-muted-foreground mb-4">This is to certify that</p>
                <p className="text-xl font-bold text-foreground mb-1 font-serif italic">{studentName}</p>
                <p className="text-xs text-muted-foreground mb-3">has successfully completed the program</p>
                <p className={`text-base font-bold ${colors.accent} mb-4`}>{courseName}</p>
                <div className="flex justify-between items-end text-[10px] text-muted-foreground border-t pt-3 mt-3">
                  <div className="text-left">
                    <p>Date: {completionDate}</p>
                    <p>ID: {certificateId}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-20 border-b border-muted-foreground/40 mb-1" />
                    <p>Program Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 px-4 pb-4">
              {!isPreview && (
                <Button className={`flex-1 text-xs bg-gradient-to-r ${colors.bg} text-white`}>
                  <Download className="h-3 w-3 mr-1" /> Download PDF
                </Button>
              )}
              <Button variant="outline" onClick={() => setExpanded(false)} className="flex-1 text-xs">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
