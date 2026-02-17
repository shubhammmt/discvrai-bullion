import { useState, useEffect, useCallback } from "react";
import {
  KycData,
  getKyc,
  saveKyc,
  clearKyc,
  getLifetimeBuyTotal,
  setLifetimeBuyTotal as setTotal,
  isKycSubmitted,
} from "@/lib/kycStorage";

export function useKyc() {
  const [kyc, setKyc] = useState<KycData | null>(null);
  const [lifetimeBuyTotal, setLifetimeBuyTotalState] = useState(0);

  useEffect(() => {
    setKyc(getKyc());
    setLifetimeBuyTotalState(getLifetimeBuyTotal());
  }, []);

  const submitKyc = useCallback((pan: string, dob: string): KycData => {
    const saved = saveKyc({ pan: pan.toUpperCase(), dob });
    setKyc(saved);
    return saved;
  }, []);

  const removeKyc = useCallback(() => {
    clearKyc();
    setKyc(null);
  }, []);

  const refreshKyc = useCallback(() => {
    setKyc(getKyc());
    setLifetimeBuyTotalState(getLifetimeBuyTotal());
  }, []);

  const updateLifetimeBuyTotal = useCallback((amount: number) => {
    setTotal(amount);
    setLifetimeBuyTotalState(amount);
  }, []);

  const needsKycForBuy = useCallback((currentBuyAmount: number): boolean => {
    const newTotal = getLifetimeBuyTotal() + currentBuyAmount;
    return newTotal > 2000 && !isKycSubmitted();
  }, []);

  const needsKycForSell = useCallback((): boolean => {
    return !isKycSubmitted();
  }, []);

  return {
    kyc,
    lifetimeBuyTotal,
    isKycDone: kyc?.kycStatus === "submitted",
    submitKyc,
    removeKyc,
    refreshKyc,
    updateLifetimeBuyTotal,
    needsKycForBuy,
    needsKycForSell,
  };
}
