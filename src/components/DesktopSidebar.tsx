import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Bell, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DesktopSidebarProps {
  userProfile: any;
}

const DesktopSidebar = ({ userProfile }: DesktopSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Sidebar is now empty - all sections removed */}
    </div>
  );
};

export default DesktopSidebar;
