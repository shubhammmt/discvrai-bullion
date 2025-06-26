
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Edit, Search } from 'lucide-react';
import { SearchFilters } from '@/utils/unifiedSearchApi';

interface NLPFilterDisplayProps {
  analysis: {
    interpreted_filters: Record<string, any>;
    confidence: number;
    suggestions: string[];
    original_query: string;
  };
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

const NLPFilterDisplay = ({ analysis, onFiltersChange, onSearch }: NLPFilterDisplayProps) => {
  const { interpreted_filters, confidence, suggestions, original_query } = analysis;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.7) return <CheckCircle size={14} className="text-green-600 flex-shrink-0" />;
    return <AlertCircle size={14} className="text-yellow-600 flex-shrink-0" />;
  };

  const formatFilterValue = (key: string, value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      if ('min' in value && 'max' in value) {
        return `${value.min || ''} - ${value.max || ''}`;
      }
      if ('min' in value) {
        return `≥ ${value.min}`;
      }
      if ('max' in value) {
        return `≤ ${value.max}`;
      }
    }
    return String(value);
  };

  const formatFilterName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <Card className="mb-4 bg-blue-50/50 border-blue-200">
      <CardContent className="p-3 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-2">
          {getConfidenceIcon(confidence)}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">Search Interpretation</h3>
            <Badge variant="outline" className={`${getConfidenceColor(confidence)} text-xs mt-1 w-fit`}>
              {Math.round(confidence * 100)}% confidence
            </Badge>
          </div>
        </div>

        {/* Query Display */}
        <div className="space-y-2">
          <div className="bg-white/60 p-2 rounded text-xs">
            <p className="text-gray-600 break-words leading-relaxed">
              <span className="font-medium">Your query:</span> "{original_query}"
            </p>
          </div>
          <p className="text-xs text-gray-700 font-medium">
            I understood this as:
          </p>
        </div>

        {/* Interpreted Filters */}
        <div className="space-y-2">
          {Object.entries(interpreted_filters).map(([key, value]) => (
            <div key={key} className="bg-white/40 p-2 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    {formatFilterName(key)}
                  </div>
                  <div className="text-xs text-gray-900 break-words">
                    {formatFilterValue(key, value)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={() => onFiltersChange(interpreted_filters)}
                >
                  <Edit size={10} className="text-blue-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Warning */}
        {confidence < 0.7 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <div className="flex items-start gap-2 mb-1">
              <AlertCircle size={12} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-yellow-800 leading-tight">
                Low confidence - please review
              </span>
            </div>
            <p className="text-xs text-yellow-700 leading-relaxed">
              The filters might not match your intent. You can edit them or try rephrasing.
            </p>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Suggestions:</p>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-gray-600 break-words leading-relaxed pl-2 border-l-2 border-gray-200">
                  {suggestion}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
          <Button onClick={onSearch} size="sm" className="w-full flex items-center justify-center gap-2 text-xs h-8">
            <Search size={12} />
            <span>Search with these filters</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onFiltersChange(interpreted_filters)}
            className="w-full text-xs h-8"
          >
            Edit filters manually
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NLPFilterDisplay;
