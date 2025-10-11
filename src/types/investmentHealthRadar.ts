export interface MetricDetail {
  value: number | string;
  score: number;
  benchmark?: number;
}

export interface CategoryDetail {
  [key: string]: MetricDetail | number | undefined;
  weighted_score?: number;
  final_score?: number;
}

export interface CategoryScore {
  category_name: string;
  score: number;
  details: CategoryDetail;
}

export interface DetailedMetric {
  metric_name: string;
  value: number;
  score: number;
  sector_percentile: number | null;
  sector_median: number | null;
  benchmark_comparison: number | null;
}

export interface AIInsights {
  performance_summary: string;
  trending_insight: string;
  analysis_timestamp: string;
  confidence_score: number;
  model_version: string;
}

export interface InvestmentHealthRadarResponse {
  success: boolean;
  message: string;
  symbol: string;
  company_name: string;
  sector: string;
  overall_score: number;
  category_scores: CategoryScore[];
  detailed_metrics: {
    [category: string]: DetailedMetric[];
  };
  ai_insights: AIInsights;
  calculation_timestamp: string;
  data_freshness: string;
}
