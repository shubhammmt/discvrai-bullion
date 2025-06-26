
import { useState, useCallback } from 'react';
import { 
  createFinancialProfile, 
  updateFinancialProfile, 
  getFinancialScore,
  FinancialProfilePayload,
  FinancialScoreResponse 
} from '@/utils/apiIntegration';

export const useFinancialProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<FinancialProfilePayload | null>(null);
  const [scoreData, setScoreData] = useState<FinancialScoreResponse['data'] | null>(null);

  const createProfile = useCallback(async (data: FinancialProfilePayload) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await createFinancialProfile(data);
      
      if (response.success) {
        setProfileData(data);
        setScoreData(response.data);
        
        // Store locally as backup
        localStorage.setItem('financialProfile', JSON.stringify(data));
        localStorage.setItem('financialScore', JSON.stringify(response.data.score));
        localStorage.setItem('profileId', response.data.profileId);
        
        return response;
      } else {
        throw new Error(response.message || 'Failed to create profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      // Fallback to local storage for development
      console.log('API failed, using local fallback');
      setProfileData(data);
      localStorage.setItem('financialProfile', JSON.stringify(data));
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileId: string, updates: Partial<FinancialProfilePayload>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await updateFinancialProfile(profileId, updates);
      
      if (response.success) {
        setScoreData(response.data);
        
        // Update local storage
        const existingProfile = localStorage.getItem('financialProfile');
        if (existingProfile) {
          const updated = { ...JSON.parse(existingProfile), ...updates };
          localStorage.setItem('financialProfile', JSON.stringify(updated));
          setProfileData(updated);
        }
        localStorage.setItem('financialScore', JSON.stringify(response.data.score));
        
        return response;
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getScore = useCallback(async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getFinancialScore(profileId);
      
      if (response.success) {
        setScoreData(response.data);
        localStorage.setItem('financialScore', JSON.stringify(response.data.score));
        return response;
      } else {
        throw new Error(response.message || 'Failed to get score');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadFromStorage = useCallback(() => {
    try {
      const storedProfile = localStorage.getItem('financialProfile');
      const storedScore = localStorage.getItem('financialScore');
      
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      }
      
      if (storedScore) {
        const score = JSON.parse(storedScore);
        setScoreData({ 
          profileId: localStorage.getItem('profileId') || '',
          score 
        });
      }
    } catch (err) {
      console.error('Error loading from storage:', err);
    }
  }, []);

  const clearData = useCallback(() => {
    setProfileData(null);
    setScoreData(null);
    setError(null);
    localStorage.removeItem('financialProfile');
    localStorage.removeItem('financialScore');
    localStorage.removeItem('profileId');
  }, []);

  return {
    profileData,
    scoreData,
    isLoading,
    error,
    createProfile,
    updateProfile,
    getScore,
    loadFromStorage,
    clearData
  };
};
