import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { budgetRanges } from '@/data/aptechCourseData';
import type { LeadData } from '@/utils/aptechCounsellorEngine';

interface AptechLeadFormProps {
  onSubmit: (data: LeadData) => void;
}

const AptechLeadForm = ({ onSubmit }: AptechLeadFormProps) => {
  const [form, setForm] = useState<LeadData>({
    name: '',
    mobile: '',
    email: '',
    city: '',
    courseInterest: '',
    budgetRange: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email) return;
    onSubmit(form);
  };

  const update = (field: keyof LeadData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-orange-700">📋 Share Your Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="lead-name" className="text-xs">Full Name *</Label>
            <Input id="lead-name" placeholder="Enter your name" value={form.name} onChange={e => update('name', e.target.value)} className="h-9 text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="lead-mobile" className="text-xs">Mobile *</Label>
              <Input id="lead-mobile" placeholder="+91 ..." value={form.mobile} onChange={e => update('mobile', e.target.value)} className="h-9 text-sm" required />
            </div>
            <div>
              <Label htmlFor="lead-email" className="text-xs">Email *</Label>
              <Input id="lead-email" type="email" placeholder="you@email.com" value={form.email} onChange={e => update('email', e.target.value)} className="h-9 text-sm" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="lead-city" className="text-xs">City</Label>
              <Input id="lead-city" placeholder="Your city" value={form.city} onChange={e => update('city', e.target.value)} className="h-9 text-sm" />
            </div>
            <div>
              <Label htmlFor="lead-course" className="text-xs">Course Interest</Label>
              <Input id="lead-course" placeholder="e.g. Animation" value={form.courseInterest} onChange={e => update('courseInterest', e.target.value)} className="h-9 text-sm" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Budget Range</Label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {budgetRanges.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => update('budgetRange', b)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    form.budgetRange === b
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-background border-border hover:border-orange-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white">
            <Send className="h-4 w-4 mr-2" /> Submit & Get Course Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AptechLeadForm;
