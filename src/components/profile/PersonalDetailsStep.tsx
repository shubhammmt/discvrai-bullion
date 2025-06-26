
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PersonalDetailsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const PersonalDetailsStep = ({ data, onDataChange }: PersonalDetailsStepProps) => {
  const handleChange = (field: string, value: string) => {
    const numericValue = value === '' ? 0 : parseInt(value);
    onDataChange({
      personalDetails: {
        ...data.personalDetails,
        [field]: numericValue
      }
    });
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm">
          Let's start with some basic information about you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
            Your Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g., 28"
            value={data.personalDetails.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            className="h-10 text-sm"
          />
          <p className="text-xs text-gray-500">
            Used for age-appropriate recommendations
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="income" className="text-sm font-medium text-gray-700">
            Monthly Income (₹)
          </Label>
          <Input
            id="income"
            type="number"
            placeholder="e.g., 75000"
            value={data.personalDetails.monthlyIncome || ''}
            onChange={(e) => handleChange('monthlyIncome', e.target.value)}
            className="h-10 text-sm"
          />
          <p className="text-xs text-gray-500">
            Your total monthly earning
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="savings" className="text-sm font-medium text-gray-700">
            Monthly Savings (₹)
          </Label>
          <Input
            id="savings"
            type="number"
            placeholder="e.g., 15000"
            value={data.personalDetails.monthlySavings || ''}
            onChange={(e) => handleChange('monthlySavings', e.target.value)}
            className="h-10 text-sm"
          />
          <p className="text-xs text-gray-500">
            Amount you typically save/invest each month
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
