
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditProfileButtonProps {
  variant?: 'button' | 'icon' | 'menu-item';
  className?: string;
}

const EditProfileButton = ({ variant = 'button', className = '' }: EditProfileButtonProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/onboarding?edit=true');
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleEditProfile}
        className={`p-2 ${className}`}
        title="Edit Profile"
      >
        <Edit size={16} />
      </Button>
    );
  }

  if (variant === 'menu-item') {
    return (
      <button
        onClick={handleEditProfile}
        className={`flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded ${className}`}
      >
        <Settings size={16} />
        <span>Edit Profile</span>
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleEditProfile}
      className={`flex items-center gap-2 ${className}`}
    >
      <Edit size={16} />
      Edit Profile
    </Button>
  );
};

export default EditProfileButton;
