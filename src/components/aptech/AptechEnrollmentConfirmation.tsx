import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, CalendarDays, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaymentData } from './AptechPaymentFlow';

interface AptechEnrollmentConfirmationProps {
  payment: PaymentData;
  leadId: string;
  enrollmentId: string;
  leadName: string;
  leadEmail: string;
  leadMobile: string;
  onScheduleVisit: () => void;
}

const AptechEnrollmentConfirmation = ({
  payment,
  leadId,
  enrollmentId,
  leadName,
  leadEmail,
  leadMobile,
  onScheduleVisit,
}: AptechEnrollmentConfirmationProps) => {
  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-5 text-center">
        <CheckCircle2 className="h-12 w-12 text-white mx-auto mb-2" />
        <h3 className="text-white font-bold text-lg">Enrollment Confirmed! 🎉</h3>
        <p className="text-green-100 text-sm mt-1">Welcome to {payment.courseName}</p>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Enrollment Details */}
        <div className="bg-white rounded-lg p-3 border border-green-200 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Enrollment ID</span>
            <code className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono">{enrollmentId}</code>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lead ID</span>
            <code className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">{leadId}</code>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transaction ID</span>
            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono">{payment.transactionId}</code>
          </div>
        </div>

        {/* Course & Payment Summary */}
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-green-800">📋 Receipt Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded p-2 border border-border">
              <p className="text-muted-foreground">Course</p>
              <p className="font-medium">{payment.courseName}</p>
            </div>
            <div className="bg-white rounded p-2 border border-border">
              <p className="text-muted-foreground">Payment Plan</p>
              <p className="font-medium">{payment.emiPlan}</p>
            </div>
            <div className="bg-white rounded p-2 border border-border">
              <p className="text-muted-foreground">Amount Paid</p>
              <p className="font-medium text-green-700">₹{payment.amountPaid.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded p-2 border border-border">
              <p className="text-muted-foreground">Original Fee</p>
              <p className="font-medium">₹{payment.originalAmount.toLocaleString()}</p>
            </div>
          </div>
          {payment.discountApplied && (
            <Badge className="bg-red-100 text-red-700 border-0 text-xs">
              🎉 {payment.discountApplied} applied
            </Badge>
          )}
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-lg p-3 border border-border space-y-1.5 text-xs">
          <h4 className="font-semibold text-sm">👤 Student Details</h4>
          <p><span className="text-muted-foreground">Name:</span> {leadName}</p>
          <p className="flex items-center gap-1"><Mail className="h-3 w-3 text-muted-foreground" /> {leadEmail}</p>
          <p className="flex items-center gap-1"><Phone className="h-3 w-3 text-muted-foreground" /> {leadMobile}</p>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold text-sm text-blue-800 mb-2">📌 What's Next?</h4>
          <ul className="text-xs text-blue-700 space-y-1.5">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0" />
              Confirmation email sent to {leadEmail}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0" />
              Course materials will be shared 3 days before batch start
            </li>
            <li className="flex items-start gap-2">
              <CalendarDays className="h-3.5 w-3.5 mt-0.5 text-blue-600 shrink-0" />
              Schedule your center orientation visit
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-3.5 w-3.5 mt-0.5 text-blue-600 shrink-0" />
              Your academic advisor will call within 24 hours
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => window.print()}
          >
            <Download className="h-3 w-3 mr-1" /> Download Receipt
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs bg-gradient-to-r from-orange-500 to-blue-600 text-white"
            onClick={onScheduleVisit}
          >
            <CalendarDays className="h-3 w-3 mr-1" /> Schedule Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AptechEnrollmentConfirmation;
