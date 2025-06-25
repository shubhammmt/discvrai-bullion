
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Let's start with some basic information about you
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
            Your Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g., 28"
            value={data.personalDetails.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="income" className="text-sm font-medium text-gray-700">
            Monthly Income (₹)
          </Label>
          <Input
            id="income"
            type="number"
            placeholder="e.g., 75000"
            value={data.personalDetails.monthlyIncome || ''}
            onChange={(e) => handleChange('monthlyIncome', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="savings" className="text-sm font-medium text-gray-700">
            Monthly Savings (₹)
          </Label>
          <Input
            id="savings"
            type="number"
            placeholder="e.g., 15000"
            value={data.personalDetails.monthlySavings || ''}
            onChange={(e) => handleChange('monthlySavings', e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Amount you typically save/invest each month
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
