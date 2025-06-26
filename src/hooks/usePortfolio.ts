
import { useState, useCallback } from 'react';
import {
  addPortfolioInstrument,
  updatePortfolioInstrument,
  getPortfolioInstruments,
  reconcilePortfolioData,
  resolvePortfolioConflicts,
  DetailedInstrument,
  PortfolioReconciliationResponse
} from '@/utils/apiIntegration';

export const usePortfolio = () => {
  const [instruments, setInstruments] = useState<DetailedInstrument[]>([]);
  const [reconciliation, setReconciliation] = useState<PortfolioReconciliationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addInstrument = useCallback(async (profileId: string, instrument: Omit<DetailedInstrument, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await addPortfolioInstrument(profileId, instrument);
      
      if (response.success) {
        // Refresh instruments list
        await loadInstruments(profileId);
        return response;
      } else {
        throw new Error('Failed to add instrument');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateInstrument = useCallback(async (instrumentId: string, updates: Partial<DetailedInstrument>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await updatePortfolioInstrument(instrumentId, updates);
      
      if (response.success) {
        // Update local state
        setInstruments(prev => 
          prev.map(inst => 
            inst.id === instrumentId ? { ...inst, ...updates } : inst
          )
        );
        return response;
      } else {
        throw new Error('Failed to update instrument');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadInstruments = useCallback(async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getPortfolioInstruments(profileId);
      
      if (response.success) {
        setInstruments(response.instruments);
        return response;
      } else {
        throw new Error('Failed to load instruments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setInstruments([]); // Fallback to empty array
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkReconciliation = useCallback(async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await reconcilePortfolioData(profileId);
      
      if (response.success) {
        setReconciliation(response);
        return response;
      } else {
        throw new Error('Failed to check reconciliation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resolveConflicts = useCallback(async (
    profileId: string, 
    resolution: 'useDetailed' | 'useProfile' | 'manual', 
    manualTotals?: Record<string, number>
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await resolvePortfolioConflicts(profileId, resolution, manualTotals);
      
      if (response.success) {
        // Clear reconciliation state after successful resolution
        setReconciliation(null);
        return response;
      } else {
        throw new Error('Failed to resolve conflicts');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setInstruments([]);
    setReconciliation(null);
    setError(null);
  }, []);

  return {
    instruments,
    reconciliation,
    isLoading,
    error,
    addInstrument,
    updateInstrument,
    loadInstruments,
    checkReconciliation,
    resolveConflicts,
    clearData
  };
};
