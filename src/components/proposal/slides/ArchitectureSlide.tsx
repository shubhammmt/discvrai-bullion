import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { Eye, Brain, Link, MessageSquare, Database, Server } from 'lucide-react';

interface ArchitectureSlideProps {
  slide: JindalSlide;
}

export const ArchitectureSlide: React.FC<ArchitectureSlideProps> = ({ slide }) => {
  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
        <p className="text-lg text-slate-500 mt-2">{slide.subtitle}</p>
      </div>

      {/* Architecture Diagram */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top Layer */}
        <div className="bg-slate-800 text-white rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-5 h-5" />
            <span className="font-semibold">AgentOps & Governance</span>
          </div>
          <p className="text-sm text-slate-300 mt-1">Monitoring, Audit Trails, Guardrails</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-slate-300" />
        </div>

        {/* Orchestration Layer */}
        <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">Agent Orchestration Engine</span>
          </div>
          <p className="text-sm text-blue-200 mt-1">Planner, Router, Context Manager</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-slate-300" />
        </div>

        {/* Core Services Layer */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Link className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-slate-800">Integration Hub</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">SAP</span>
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">HRIS</span>
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">WhatsApp</span>
            </div>
          </div>

          <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-slate-800">Multi-Modal Interface</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">Voice</span>
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">Chat</span>
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">Avatar</span>
            </div>
          </div>

          <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-slate-800">Knowledge Engine</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">RAG</span>
              <span className="px-2 py-1 bg-white rounded text-xs text-slate-600 border">Parsers</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-slate-300" />
        </div>

        {/* Infrastructure Layer */}
        <div className="bg-slate-700 text-white rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Server className="w-5 h-5" />
            <span className="font-semibold">Infrastructure</span>
          </div>
          <p className="text-sm text-slate-300 mt-1">Multi-Tenant, Security, Scalability</p>
        </div>
      </div>
    </div>
  );
};
