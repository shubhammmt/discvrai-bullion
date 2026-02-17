import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, User, CheckCircle2, ClipboardList } from 'lucide-react';

interface AptechCenterVisitSchedulerProps {
  centerName: string;
  city: string;
  courseName: string;
  onScheduled: (data: VisitData) => void;
}

export interface VisitData {
  date: string;
  timeSlot: string;
  counselorName: string;
  centerAddress: string;
}

const centerAddresses: Record<string, string> = {
  'Andheri West': 'Plot 12, Veera Desai Road, Andheri West, Mumbai 400053',
  'Thane': 'Office No. 5, 2nd Floor, Panchpakhadi, Thane West 400602',
  'Borivali': 'Shop No. 8, Sai Arcade, S.V. Road, Borivali West, Mumbai 400092',
  'Dadar': '1st Floor, Hindmata Cinema Complex, Dadar TT, Mumbai 400014',
  'Koramangala': '4th Floor, Sony World Junction, 80 Feet Road, Koramangala, Bangalore 560034',
  'Connaught Place': 'L-12, Outer Circle, Connaught Place, New Delhi 110001',
};

const counselors = [
  { name: 'Priya Sharma', role: 'Senior Academic Counselor', exp: '8 years' },
  { name: 'Rahul Verma', role: 'Career Guidance Expert', exp: '5 years' },
  { name: 'Anita Desai', role: 'Admissions Counselor', exp: '6 years' },
];

const getNextDates = () => {
  const dates: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // skip Sundays
    dates.push({
      label: d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      value: d.toISOString().split('T')[0],
    });
    if (dates.length >= 4) break;
  }
  return dates;
};

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '2:00 PM - 3:00 PM',
  '4:00 PM - 5:00 PM',
  '5:30 PM - 6:30 PM',
];

const AptechCenterVisitScheduler = ({ centerName, city, courseName, onScheduled }: AptechCenterVisitSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const dates = getNextDates();
  const assignedCounselor = counselors[Math.floor(Math.random() * counselors.length)];
  const address = centerAddresses[centerName] || `${centerName}, ${city}`;

  const handleConfirm = () => {
    setConfirmed(true);
    onScheduled({
      date: selectedDate!,
      timeSlot: selectedSlot!,
      counselorName: assignedCounselor.name,
      centerAddress: address,
    });
  };

  if (confirmed) {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Visit Confirmed! 🎉</h4>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-200 space-y-2 text-xs">
            <p className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-blue-600" /> {dates.find(d => d.value === selectedDate)?.label}</p>
            <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-blue-600" /> {selectedSlot}</p>
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-red-500" /> {address}</p>
            <p className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-purple-600" /> {assignedCounselor.name} ({assignedCounselor.role})</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <h5 className="font-medium text-xs text-amber-800 flex items-center gap-1 mb-1.5">
              <ClipboardList className="h-3.5 w-3.5" /> What to Bring
            </h5>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Valid Photo ID (Aadhaar/PAN/Passport)</li>
              <li>• Last education marksheet/certificate</li>
              <li>• 2 passport-size photographs</li>
              <li>• Parent/Guardian (if under 18)</li>
            </ul>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" size="sm" className="w-full text-xs">
              <MapPin className="h-3 w-3 mr-1" /> Open in Google Maps
            </Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> Schedule Center Visit
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {centerName}, {city} • {courseName}
          </p>
        </div>

        {/* Assigned Counselor */}
        <div className="bg-purple-50 rounded-lg p-2.5 border border-purple-200 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
            <User className="h-4 w-4 text-purple-700" />
          </div>
          <div>
            <p className="text-xs font-medium">{assignedCounselor.name}</p>
            <p className="text-[10px] text-muted-foreground">{assignedCounselor.role} • {assignedCounselor.exp} experience</p>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Select Date</p>
          <div className="grid grid-cols-2 gap-1.5">
            {dates.map(d => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`px-3 py-2 rounded-lg border text-xs transition-all ${
                  selectedDate === d.value
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 font-medium'
                    : 'border-border hover:border-blue-300 bg-background'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDate && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Select Time Slot</p>
            <div className="grid grid-cols-2 gap-1.5">
              {timeSlots.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSlot(s)}
                  className={`px-3 py-2 rounded-lg border text-xs transition-all ${
                    selectedSlot === s
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 font-medium'
                      : 'border-border hover:border-blue-300 bg-background'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedSlot && (
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" /> Confirm Visit
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AptechCenterVisitScheduler;
