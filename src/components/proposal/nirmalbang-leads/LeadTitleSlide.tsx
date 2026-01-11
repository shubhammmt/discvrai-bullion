import React from 'react';
import { TrendingUp, Users, Target, ArrowDown } from 'lucide-react';

export const LeadTitleSlide: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Target className="w-4 h-4" />
          Nirmal Bang Securities Pvt. Ltd.
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          AI-Driven Lead Lifecycle & RM Productivity System
        </h1>
        <p className="text-xl text-slate-600">
          Turning Raw Leads into Sales-Ready Opportunities
        </p>
      </div>

      {/* Context Points */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-slate-700 font-medium">
            Lead volumes are increasing across digital and offline channels
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-slate-700 font-medium">
            Conversion depends on how well leads are prepared and routed
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-slate-700 font-medium">
            RM productivity is critical for revenue growth without adding headcount
          </p>
        </div>
      </div>

      {/* Lead to Revenue Funnel */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Lead-to-Revenue Funnel</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-64 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl flex items-center justify-center text-white font-semibold shadow-md">
              Raw Leads
            </div>
            <ArrowDown className="w-4 h-4 text-slate-400" />
            <div className="w-52 h-12 bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
              Nurtured Leads
            </div>
            <ArrowDown className="w-4 h-4 text-slate-400" />
            <div className="w-40 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-semibold shadow-md">
              Qualified Leads
            </div>
            <ArrowDown className="w-4 h-4 text-slate-400" />
            <div className="w-28 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-b-xl flex items-center justify-center text-white font-semibold shadow-md">
              Revenue
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500">
          Prepared for <span className="font-semibold text-slate-700">Vivek Joshi</span> – North Sales Head
        </p>
      </div>
    </div>
  );
};
