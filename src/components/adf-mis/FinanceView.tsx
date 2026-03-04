import React from 'react';
import { financeStatus, formatCurrency } from '@/data/adfMisData';
import { CheckCircle, AlertTriangle, RefreshCw, Database } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { lastRefresh, q1Frozen, q2Frozen, q3Frozen, q4Incremental, unmappedSkus, reconciliation } = financeStatus;

  const quarters = [
    { label: 'Q1', frozen: q1Frozen },
    { label: 'Q2', frozen: q2Frozen },
    { label: 'Q3', frozen: q3Frozen },
    { label: 'Q4', frozen: false, incremental: q4Incremental },
  ];

  return (
    <div className="space-y-6">
      {/* Last Refresh */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Data Cutoff Date</h3>
            <p className="text-xs text-gray-500 mt-0.5">Last refresh: <span className="font-medium text-gray-900">{lastRefresh}</span></p>
          </div>
        </div>
      </div>

      {/* Quarter Freeze Status */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Quarter Freeze Status</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quarters.map(q => (
            <div key={q.label} className={`border rounded-lg p-4 text-center ${
              q.frozen ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="text-lg font-bold text-gray-900">{q.label}</div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {q.frozen ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">Frozen</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">{q.incremental ? 'Incremental' : 'Open'}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reconciliation */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Reconciliation — Standalone vs Consolidated</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Standalone</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(reconciliation.standalone, true)}</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Consolidated</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(reconciliation.consolidated, true)}</div>
          </div>
          <div className={`border rounded-lg p-4 text-center ${reconciliation.variance > 0 ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
            <div className="text-xs text-gray-500 mb-1">Variance</div>
            <div className={`text-lg font-bold ${reconciliation.variance > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
              {formatCurrency(reconciliation.variance, true)}
            </div>
          </div>
        </div>
      </div>

      {/* Unmapped SKUs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Unmapped SKUs</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              <span className="font-semibold text-amber-700">{unmappedSkus}</span> SKUs could not be mapped to a category or customer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
