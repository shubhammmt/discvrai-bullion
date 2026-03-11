
import { useCallback, useEffect, useRef } from 'react';
import { savePartialProfile, PartialProfileData } from '@/utils/apiIntegration';

interface UseProgressiveSaveProps {
  profileData: any;
  currentStep: number;
  enabled?: boolean;
}

export const useProgressiveSave = ({ profileData, currentStep, enabled = true }: UseProgressiveSaveProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const lastSavedRef = useRef<string>('');

  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('profileSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('profileSessionId', sessionId);
    }
    return sessionId;
  }, []);

  const saveProgress = useCallback(async (data: PartialProfileData) => {
    if (!enabled) return;
    
    const sessionId = getSessionId();
    
    try {
      await savePartialProfile(sessionId, data);
      console.log('Progressive save successful');
    } catch (error) {
      console.log('Progressive save failed, using local storage fallback:', error);
    }
    
    // Always save to local storage as backup
    localStorage.setItem('financialProfile', JSON.stringify(profileData));
  }, [profileData, enabled, getSessionId]);

  const debouncedSave = useCallback((data: PartialProfileData) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveProgress(data);
    }, 1000); // Debounce by 1 second
  }, [saveProgress]);

  useEffect(() => {
    if (!enabled || currentStep < 1) return;

    const currentDataString = JSON.stringify(profileData);
    
    // Only save if data has actually changed
    if (currentDataString !== lastSavedRef.current && profileData.personalDetails?.age > 0) {
      lastSavedRef.current = currentDataString;
      
      debouncedSave({
        personalDetails: profileData.personalDetails,
        assets: profileData.assets,
        expenses: profileData.expenses,
        goals: profileData.goals
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [profileData, currentStep, enabled, debouncedSave]);

  const clearSession = useCallback(() => {
    localStorage.removeItem('profileSessionId');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { 
    saveProgress: debouncedSave, 
    clearSession,
    sessionId: getSessionId()
  };
};
