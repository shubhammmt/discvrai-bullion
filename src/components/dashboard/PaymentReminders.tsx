
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, Home, AlertTriangle } from 'lucide-react';

const PaymentReminders = () => {
  const reminders = [
    {
      type: 'Credit Card',
      name: 'HDFC Regalia',
      amount: 25000,
      dueDate: '15 Jan',
      status: 'urgent',
      icon: CreditCard
    },
    {
      type: 'Loan EMI',
      name: 'Home Loan',
      amount: 45000,
      dueDate: '20 Jan',
      status: 'upcoming',
      icon: Home
    },
    {
      type: 'SIP',
      name: 'HDFC Top 100',
      amount: 10000,
      dueDate: '25 Jan',
      status: 'scheduled',
      icon: Calendar
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={20} />
          Payment Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              reminder.status === 'urgent' ? 'border-red-200 bg-red-50' :
              reminder.status === 'upcoming' ? 'border-orange-200 bg-orange-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <reminder.icon size={20} className={
                    reminder.status === 'urgent' ? 'text-red-600' :
                    reminder.status === 'upcoming' ? 'text-orange-600' :
                    'text-blue-600'
                  } />
                  <div>
                    <h4 className="font-medium">{reminder.name}</h4>
                    <p className="text-xs text-gray-600">{reminder.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{reminder.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Due {reminder.dueDate}</p>
                </div>
              </div>
              {reminder.status === 'urgent' && (
                <Button size="sm" className="mt-2 w-full bg-red-600 hover:bg-red-700">
                  Pay Now
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentReminders;
