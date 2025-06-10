
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building, CreditCard, Wallet, CheckCircle, Upload } from 'lucide-react';

const AccountLinking = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([
    { type: 'Bank', name: 'HDFC Savings', status: 'linked' },
    { type: 'Demat', name: 'Zerodha', status: 'linked' }
  ]);

  const availableAccounts = [
    { type: 'Bank', name: 'ICICI Current', icon: Building },
    { type: 'Credit Card', name: 'SBI Card', icon: CreditCard },
    { type: 'Demat', name: 'Groww', icon: Wallet }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Linked Accounts */}
        <div className="space-y-2 mb-4">
          {linkedAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <div>
                  <p className="text-sm font-medium">{account.name}</p>
                  <p className="text-xs text-gray-600">{account.type}</p>
                </div>
              </div>
              <span className="text-xs text-green-600">Connected</span>
            </div>
          ))}
        </div>

        {/* Add New Account */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">Add Account</h4>
          {availableAccounts.map((account, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <account.icon size={16} className="mr-2" />
              Link {account.name}
            </Button>
          ))}
        </div>

        {/* Upload Portfolio */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Upload Portfolio</h4>
          <Button variant="outline" size="sm" className="w-full">
            <Upload size={16} className="mr-2" />
            Upload Statement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountLinking;
