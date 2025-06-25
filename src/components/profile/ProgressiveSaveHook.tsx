
import { useEffect, useCallback } from 'react';
import { savePartialProfile, PartialProfileData } from '@/utils/apiIntegration';

interface UseProgressiveSaveProps {
  profileData: any;
  currentStep: number;
}

export const useProgressiveSave = ({ profileData, currentStep }: UseProgressiveSaveProps) => {
  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('profileSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('profileSessionId', sessionId);
    }
    return sessionId;
  }, []);

  const saveProgress = useCallback(async (data: PartialProfileData) => {
    const sessionId = getSessionId();
    try {
      await savePartialProfile(sessionId, data);
    } catch (error) {
      // Non-blocking error - continue with local storage
      console.log('Progressive save failed, using local storage:', error);
    }
    
    // Always save to local storage as backup
    localStorage.setItem('financialProfile', JSON.stringify(profileData));
  }, [profileData, getSessionId]);

  useEffect(() => {
    if (currentStep > 1 && profileData.personalDetails.age > 0) {
      const debounceTimer = setTimeout(() => {
        saveProgress({
          personalDetails: profileData.personalDetails,
          assets: profileData.assets,
          expenses: profileData.expenses,
          goals: profileData.goals
        });
      }, 1000); // Debounce saves by 1 second

      return () => clearTimeout(debounceTimer);
    }
  }, [profileData, currentStep, saveProgress]);

  return { saveProgress };
};
