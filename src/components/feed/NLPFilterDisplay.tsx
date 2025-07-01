import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Edit } from 'lucide-react';
import { SearchFilters } from '@/utils/unifiedSearchApi';

interface NLPFilterDisplayProps {
  analysis: {
    interpreted_filters: Record<string, any>;
    confidence: number;
    suggestions: string[];
    original_query: string;
    confidence_reasoning?: string;
    intent_analysis?: {
      confidence_reasoning?: string;
      communication_message?: string;
    };
  };
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

const NLPFilterDisplay = ({ analysis, onFiltersChange, onSearch }: NLPFilterDisplayProps) => {
  const { interpreted_filters, confidence, suggestions, original_query, confidence_reasoning, intent_analysis } = analysis;

  // Debug logging
  console.log('NLPFilterDisplay - Full analysis object:', analysis);
  console.log('NLPFilterDisplay - confidence_reasoning:', confidence_reasoning);
  console.log('NLPFilterDisplay - intent_analysis:', intent_analysis);
  console.log('NLPFilterDisplay - intent_analysis?.confidence_reasoning:', intent_analysis?.confidence_reasoning);

  // Get confidence reasoning from either location
  const actualConfidenceReasoning = intent_analysis?.confidence_reasoning || confidence_reasoning;
  console.log('NLPFilterDisplay - actualConfidenceReasoning:', actualConfidenceReasoning);

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
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-3">
          {getConfidenceIcon(confidence)}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Search Interpretation</h3>
          <Badge variant="outline" className={`${getConfidenceColor(confidence)} text-xs flex-shrink-0`}>
            {Math.round(confidence * 100)}% confidence
          </Badge>
        </div>

        <div className="mb-3 space-y-2">
          <div className="bg-white/60 p-2 rounded text-xs sm:text-sm">
            <p className="text-gray-600 break-words">
              <strong>Your query:</strong> "{original_query}"
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              I understood this as:
            </p>
            {actualConfidenceReasoning ? (
              <div className="bg-white/60 p-2 rounded text-xs sm:text-sm">
                <p className="text-gray-700 break-words">{actualConfidenceReasoning}</p>
              </div>
            ) : (
              <div className="bg-yellow-50 p-2 rounded text-xs sm:text-sm">
                <p className="text-yellow-700">No confidence reasoning available</p>
              </div>
            )}
          </div>
        </div>

        {/* Interpreted Filters */}
        <div className="space-y-2 mb-4">
          {Object.entries(interpreted_filters).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <Badge variant="secondary" className="text-xs px-2 py-1 max-w-full">
                  <span className="truncate">
                    {formatFilterName(key)}: {formatFilterValue(key, value)}
                  </span>
                </Badge>
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle size={14} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-yellow-800">
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
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Suggestions to improve your search:</p>
            <div className="space-y-1 pl-3">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-gray-600 break-words">• {suggestion}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NLPFilterDisplay;
