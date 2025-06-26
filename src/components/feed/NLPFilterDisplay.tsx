
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
    if (confidence >= 0.7) return <CheckCircle size={16} className="text-green-600" />;
    return <AlertCircle size={16} className="text-yellow-600" />;
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
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {getConfidenceIcon(confidence)}
          <h3 className="font-semibold text-gray-900">Search Interpretation</h3>
          <Badge variant="outline" className={getConfidenceColor(confidence)}>
            {Math.round(confidence * 100)}% confidence
          </Badge>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Your query:</strong> "{original_query}"
          </p>
          <p className="text-sm text-gray-700">
            <strong>I understood this as:</strong>
          </p>
        </div>

        {/* Interpreted Filters */}
        <div className="space-y-2 mb-4">
          {Object.entries(interpreted_filters).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                {formatFilterName(key)}: {formatFilterValue(key, value)}
                <Edit size={12} className="cursor-pointer text-blue-600" />
              </Badge>
            </div>
          ))}
        </div>

        {/* Confidence Warning */}
        {confidence < 0.7 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Low confidence - please review the interpretation
              </span>
            </div>
            <p className="text-xs text-yellow-700">
              The filters above might not match your intent. You can edit them or try rephrasing your query.
            </p>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Suggestions to improve your search:</p>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-gray-600">• {suggestion}</p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button onClick={onSearch} size="sm" className="flex items-center gap-1">
            <Search size={14} />
            Search with these filters
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onFiltersChange(interpreted_filters)}
          >
            Edit filters manually
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NLPFilterDisplay;
