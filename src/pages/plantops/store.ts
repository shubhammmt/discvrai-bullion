// Lightweight localStorage-backed store for Plant Ops data entry
import { useEffect, useState, useCallback } from 'react';

export type Shift = 'Day' | 'Night' | 'OT';
export type OutputUnit = 'MT' | 'No.' | 'CTN' | 'Tray' | 'Bottle' | 'Jar' | 'Pouch' | 'Kg';
export type WastageUnit = 'Kg' | 'MT' | 'No.';
export type ProductivityStatus = 'Good' | 'Low' | 'Needs Review';
export type WastageStatus = 'Within Limit' | 'Slightly High' | 'Critical';

export interface ManpowerEntry {
  id: string;
  date: string;
  plant: string;
  category: string;
  subcategory: string;
  activity: string;
  manpower_day: number;
  manpower_night: number;
  manpower_ot: number;
  total_manpower: number;
  output_quantity: number;
  output_unit: OutputUnit;
  output_mt: number;
  mt_per_man: number;
  productivity_status: ProductivityStatus;
  remarks: string;
  source_type: 'manual' | 'excel';
  source_file_name?: string;
  created_by: string;
  created_at: string;
}

export interface WastageEntry {
  id: string;
  date: string;
  plant: string;
  category: string;
  subcategory: string;
  product_line: string;
  activity: string;
  item_name: string;
  output_quantity: number;
  output_unit: OutputUnit;
  output_mt: number;
  wastage_quantity: number;
  wastage_unit: WastageUnit;
  standard_wastage_percent: number;
  actual_wastage_percent: number;
  wastage_variance_percent: number;
  wastage_reason: string;
  wastage_status: WastageStatus;
  remarks: string;
  source_type: 'manual' | 'excel';
  source_file_name?: string;
  created_by: string;
  created_at: string;
}

const MP_KEY = 'plantops.manpower.v1';
const WS_KEY = 'plantops.wastage.v1';

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, val: T[]) {
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new CustomEvent('plantops:update', { detail: { key } }));
}

export const PLANTS = ['Unit 1 - Valsad', 'Unit 2 - Nashik', 'Unit 3 - Gunjan'];

export const CATEGORIES = [
  'IQF LINE',
  'PACKING',
  'CAN VEG. / R.T.E.',
  'UNIT 2 PKL / PASTE / MISC CHUTNEY / SWEET PKL / MISC PASTE',
];

export const SUBCATEGORIES = [
  'IQF PRODUCTION',
  'IQF PACKING',
  'TANDOOR LINE PRODN',
  'PARATHA LINE PRODUCTION',
  'SAMOSA LINE',
  'FROZEN PRODUCT PACKING LINE',
  'COLD STORE',
  'RM STORE',
  'HOT PKL PACKING',
];

export const ACTIVITIES = [
  'IQF VEGETABLE',
  'TANDOORI NAAN & ROTI',
  'PARATHA',
  'Punjabi Samosa 75g',
  'VEGETABLE CARTONS',
  'POUCH PACKING',
  'Loading / Unloading',
  'General / Support',
];

export const ITEMS = [
  'Naan', 'Paratha', 'Frozen Samosa', 'Retort Pouch', 'Kathi Roll',
  'Chutney', 'Momo Chutney', 'Dahi Vada', 'Puff',
];

export const OUTPUT_UNITS: OutputUnit[] = ['MT', 'No.', 'CTN', 'Tray', 'Bottle', 'Jar', 'Pouch', 'Kg'];
export const WASTAGE_UNITS: WastageUnit[] = ['Kg', 'MT', 'No.'];
export const WASTAGE_REASONS = [
  'Production Loss', 'Packing Loss', 'Line Setup Loss', 'Quality Rejection',
  'Handling Damage', 'Machine Issue', 'Material Issue', 'Cleaning / Changeover', 'Other',
];

export function classifyProductivity(mtPerMan: number): ProductivityStatus {
  if (!isFinite(mtPerMan) || mtPerMan <= 0) return 'Needs Review';
  if (mtPerMan >= 0.15) return 'Good';
  if (mtPerMan >= 0.07) return 'Low';
  return 'Needs Review';
}

export function classifyWastage(actual: number, standard: number): WastageStatus {
  const variance = actual - standard;
  if (variance <= 0) return 'Within Limit';
  if (variance <= 1.5) return 'Slightly High';
  return 'Critical';
}

export function computeActualWastagePct(
  wasteQty: number, wasteUnit: WastageUnit,
  outputQty: number, outputUnit: OutputUnit, outputMt: number
): number {
  if (!outputQty && !outputMt) return 0;
  if (wasteUnit === outputUnit) {
    return outputQty > 0 ? (wasteQty / outputQty) * 100 : 0;
  }
  // Normalise to kg
  const wasteKg = wasteUnit === 'MT' ? wasteQty * 1000 : wasteUnit === 'Kg' ? wasteQty : wasteQty;
  const outputKg = outputMt ? outputMt * 1000 : outputUnit === 'MT' ? outputQty * 1000 : outputUnit === 'Kg' ? outputQty : 0;
  return outputKg > 0 ? (wasteKg / outputKg) * 100 : 0;
}

// Hooks
export function useManpower() {
  const [data, setData] = useState<ManpowerEntry[]>(() => read<ManpowerEntry>(MP_KEY));
  useEffect(() => {
    const handler = (e: any) => { if (e.detail?.key === MP_KEY) setData(read<ManpowerEntry>(MP_KEY)); };
    window.addEventListener('plantops:update', handler);
    return () => window.removeEventListener('plantops:update', handler);
  }, []);
  const add = useCallback((entry: ManpowerEntry) => write(MP_KEY, [entry, ...read<ManpowerEntry>(MP_KEY)]), []);
  const remove = useCallback((id: string) => write(MP_KEY, read<ManpowerEntry>(MP_KEY).filter(e => e.id !== id)), []);
  const replaceAll = useCallback((arr: ManpowerEntry[]) => write(MP_KEY, arr), []);
  return { data, add, remove, replaceAll };
}

export function useWastage() {
  const [data, setData] = useState<WastageEntry[]>(() => read<WastageEntry>(WS_KEY));
  useEffect(() => {
    const handler = (e: any) => { if (e.detail?.key === WS_KEY) setData(read<WastageEntry>(WS_KEY)); };
    window.addEventListener('plantops:update', handler);
    return () => window.removeEventListener('plantops:update', handler);
  }, []);
  const add = useCallback((entry: WastageEntry) => write(WS_KEY, [entry, ...read<WastageEntry>(WS_KEY)]), []);
  const remove = useCallback((id: string) => write(WS_KEY, read<WastageEntry>(WS_KEY).filter(e => e.id !== id)), []);
  const replaceAll = useCallback((arr: WastageEntry[]) => write(WS_KEY, arr), []);
  return { data, add, remove, replaceAll };
}

export function seedDemoData() {
  if (read<ManpowerEntry>(MP_KEY).length > 0) return;
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const mp: ManpowerEntry[] = [];
  const ws: WastageEntry[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const date = fmt(d);
    SUBCATEGORIES.slice(0, 5).forEach((sub, idx) => {
      const day = 12 + Math.round(Math.random() * 8);
      const night = 6 + Math.round(Math.random() * 5);
      const ot = Math.round(Math.random() * 3);
      const total = day + night + ot;
      const outMt = +(total * (0.08 + Math.random() * 0.12)).toFixed(2);
      const mpm = +(outMt / total).toFixed(3);
      mp.push({
        id: `${date}-mp-${idx}`,
        date, plant: PLANTS[0],
        category: CATEGORIES[idx % CATEGORIES.length],
        subcategory: sub,
        activity: ACTIVITIES[idx % ACTIVITIES.length],
        manpower_day: day, manpower_night: night, manpower_ot: ot,
        total_manpower: total,
        output_quantity: outMt, output_unit: 'MT', output_mt: outMt,
        mt_per_man: mpm,
        productivity_status: classifyProductivity(mpm),
        remarks: '',
        source_type: 'manual', created_by: 'seed',
        created_at: new Date().toISOString(),
      });
      const item = ITEMS[idx % ITEMS.length];
      const std = 1.5;
      const actual = +(std + (Math.random() * 2 - 0.5)).toFixed(2);
      ws.push({
        id: `${date}-ws-${idx}`,
        date, plant: PLANTS[0],
        category: CATEGORIES[idx % CATEGORIES.length],
        subcategory: sub,
        product_line: sub,
        activity: ACTIVITIES[idx % ACTIVITIES.length],
        item_name: item,
        output_quantity: outMt, output_unit: 'MT', output_mt: outMt,
        wastage_quantity: +(outMt * 1000 * actual / 100).toFixed(2),
        wastage_unit: 'Kg',
        standard_wastage_percent: std,
        actual_wastage_percent: actual,
        wastage_variance_percent: +(actual - std).toFixed(2),
        wastage_reason: WASTAGE_REASONS[idx % WASTAGE_REASONS.length],
        wastage_status: classifyWastage(actual, std),
        remarks: '',
        source_type: 'manual', created_by: 'seed',
        created_at: new Date().toISOString(),
      });
    });
  }
  write(MP_KEY, mp);
  write(WS_KEY, ws);
}
