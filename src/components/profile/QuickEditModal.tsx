
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProfileTotals, ReconciliationResult, formatCurrency } from '@/utils/portfolioReconciliation';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTotals: ProfileTotals;
  reconciliation?: ReconciliationResult;
  onSave: (updatedTotals: ProfileTotals) => void;
}

const QuickEditModal = ({ 
  isOpen, 
  onClose, 
  currentTotals, 
  reconciliation, 
  onSave 
}: QuickEditModalProps) => {
  const { toast } = useToast();
  const [editedTotals, setEditedTotals] = useState<ProfileTotals>(currentTotals);

  const categoryLabels = {
    equity: 'Equity Investments',
    debt: 'Debt Investments',
    insurance: 'Insurance Coverage',
    realEstate: 'Real Estate',
    emergency: 'Emergency Fund',
    other: 'Other Assets'
  };

  const handleSave = () => {
    onSave(editedTotals);
    toast({
      title: "Profile Updated",
      description: "Your basic asset totals have been updated successfully.",
    });
    onClose();
  };

  const handleUseRecommended = () => {
    if (reconciliation) {
      setEditedTotals(reconciliation.updatedTotals);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Edit Basic Portfolio Totals
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reconciliation Warning */}
          {reconciliation?.hasConflicts && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      Data Conflicts Detected
                    </h4>
                    <p className="text-sm text-orange-800 mb-3">
                      Your detailed holdings don't match your basic totals. 
                      We recommend using calculated totals from your detailed entries.
                    </p>
                    <Button
                      onClick={handleUseRecommended}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Use Recommended Values
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Editors */}
          <div className="grid gap-4">
            {Object.entries(categoryLabels).map(([category, label]) => {
              const currentValue = editedTotals[category as keyof ProfileTotals];
              const conflict = reconciliation?.conflicts.find(c => c.category === category);
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={category} className="text-sm font-medium">
                      {label}
                    </Label>
                    {conflict && (
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        Conflict: {formatCurrency(conflict.calculatedTotal)}
                      </Badge>
                    )}
                  </div>
                  <Input
                    id={category}
                    type="number"
                    value={currentValue}
                    onChange={(e) => setEditedTotals(prev => ({
                      ...prev,
                      [category]: Number(e.target.value) || 0
                    }))}
                    placeholder="Enter amount in ₹"
                    className={conflict ? "border-orange-300" : ""}
                  />
                  {conflict && (
                    <p className="text-xs text-orange-600">
                      Your detailed entries total: {formatCurrency(conflict.calculatedTotal)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Conflict Details */}
          {reconciliation?.conflicts && reconciliation.conflicts.length > 0 && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Conflict Summary</h4>
                <div className="space-y-2">
                  {reconciliation.conflicts.map((conflict, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {categoryLabels[conflict.category as keyof typeof categoryLabels]}:
                      </span>
                      <span>
                        {formatCurrency(conflict.profileTotal)} → {formatCurrency(conflict.calculatedTotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickEditModal;
