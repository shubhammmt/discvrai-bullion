export interface KycData {
  pan: string;
  dob: string; // DD-MM-YYYY
  kycStatus: "not_submitted" | "submitted";
  updatedAt: string; // ISO timestamp
}

const KYC_KEY = "userKyc";
const LIFETIME_BUY_KEY = "lifetimeBuyTotal";

export function getKyc(): KycData | null {
  try {
    const raw = localStorage.getItem(KYC_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as KycData;
  } catch {
    return null;
  }
}

export function saveKyc(data: Omit<KycData, "kycStatus" | "updatedAt">): KycData {
  const kyc: KycData = {
    ...data,
    kycStatus: "submitted",
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(KYC_KEY, JSON.stringify(kyc));
  return kyc;
}

export function clearKyc(): void {
  localStorage.removeItem(KYC_KEY);
}

export function getLifetimeBuyTotal(): number {
  try {
    return parseFloat(localStorage.getItem(LIFETIME_BUY_KEY) || "0") || 0;
  } catch {
    return 0;
  }
}

export function setLifetimeBuyTotal(amount: number): void {
  localStorage.setItem(LIFETIME_BUY_KEY, amount.toString());
}

export function addToLifetimeBuyTotal(amount: number): void {
  setLifetimeBuyTotal(getLifetimeBuyTotal() + amount);
}

// PAN validation regex
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export function isValidPAN(pan: string): boolean {
  return PAN_REGEX.test(pan.toUpperCase());
}

export function maskPAN(pan: string): string {
  if (pan.length !== 10) return pan;
  return `${pan.slice(0, 5)}****${pan.slice(9)}`;
}

export function isKycSubmitted(): boolean {
  const kyc = getKyc();
  return kyc?.kycStatus === "submitted" && !!kyc.pan && !!kyc.dob;
}
