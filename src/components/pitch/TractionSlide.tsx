
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TractionSlideProps {
  slide: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
    charts: Array<{
      label: string;
      data: number[];
    }>;
  };
}

export const TractionSlide: React.FC<TractionSlideProps> = ({ slide }) => {
  const chartData = slide.charts[0]?.data.map((value, index) => ({
    month: `M${index + 1}`,
    value
  })) || [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {slide.metrics.map((metric, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
              <div className="text-lg font-semibold text-gray-700">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-center">Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
