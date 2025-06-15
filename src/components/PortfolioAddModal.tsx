
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PortfolioAddModalProps {
  assetName: string;
  assetSymbol: string;
  assetType: 'stock' | 'mutual-fund' | 'ipo' | 'insurance' | 'credit' | 'smallcase';
  currentPrice?: number;
  trigger?: React.ReactNode;
}

const PortfolioAddModal: React.FC<PortfolioAddModalProps> = ({ 
  assetName, 
  assetSymbol, 
  assetType, 
  currentPrice,
  trigger 
}) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(currentPrice?.toString() || '');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [action, setAction] = useState<'add' | 'track'>('add');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (action === 'track') {
      // Add to watchlist in organize
      toast({
        title: "Added to Watchlist",
        description: `${assetName} has been added to your watchlist.`,
      });
    } else {
      // Add to portfolio
      if (!quantity || !purchasePrice) {
        toast({
          title: "Missing Information",
          description: "Please fill in quantity and purchase price.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Added to Portfolio",
        description: `${quantity} units of ${assetName} added to your portfolio.`,
      });
    }
    
    setOpen(false);
    setQuantity('');
    setPurchasePrice(currentPrice?.toString() || '');
  };

  const getAssetTypeLabel = () => {
    switch (assetType) {
      case 'stock': return 'shares';
      case 'mutual-fund': return 'units';
      case 'insurance': return 'policies';
      case 'credit': return 'accounts';
      default: return 'units';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus size={16} className="mr-2" />
            Add to Portfolio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {assetName} to Portfolio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{assetSymbol}</strong> • {assetName}
            </p>
            {currentPrice && (
              <p className="text-xs text-blue-600 mt-1">
                Current Price: ₹{currentPrice}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Action</Label>
            <Select value={action} onValueChange={(value: 'add' | 'track') => setAction(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add to Portfolio (with holdings)</SelectItem>
                <SelectItem value="track">Add to Watchlist (track only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {action === 'add' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity ({getAssetTypeLabel()})</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={`Number of ${getAssetTypeLabel()}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price (per unit)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Purchase price"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>

              {quantity && purchasePrice && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    Total Investment: ₹{(parseFloat(quantity) * parseFloat(purchasePrice)).toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
              <Check size={16} className="mr-2" />
              {action === 'add' ? 'Add to Portfolio' : 'Add to Watchlist'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioAddModal;
