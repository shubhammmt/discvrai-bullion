
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionState {
  isSubscribed: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  isLoading: boolean;
}

interface SubscriptionContextType extends SubscriptionState {
  checkSubscription: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SubscriptionState>({
    isSubscribed: false,
    subscriptionTier: null,
    subscriptionEnd: null,
    isLoading: false,
  });

  // Subscription features are disabled for the first 3 months
  const SUBSCRIPTION_ENABLED = false;

  const checkSubscription = async () => {
    if (!SUBSCRIPTION_ENABLED) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // This will be implemented when Supabase integration is added
      // const { data } = await supabase.functions.invoke('check-subscription');
      // setState(prev => ({
      //   ...prev,
      //   isSubscribed: data.subscribed,
      //   subscriptionTier: data.subscription_tier,
      //   subscriptionEnd: data.subscription_end,
      //   isLoading: false,
      // }));
      
      // For now, just set loading to false
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error checking subscription:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const refreshSubscription = async () => {
    await checkSubscription();
  };

  useEffect(() => {
    if (SUBSCRIPTION_ENABLED) {
      checkSubscription();
    }
  }, []);

  const value: SubscriptionContextType = {
    ...state,
    checkSubscription,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
