import React from 'react';
import { Calendar, Video, MessageSquare, FileCheck, UserCheck, Shield } from 'lucide-react';

export const AIInterviewPage: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 4</div>
        <h1 className="text-2xl font-bold text-slate-800">AI Interview on Google Meet</h1>
        <p className="text-slate-500 text-sm mt-1">Simplified view of how AI interviews work</p>
      </div>

      <div className="px-10 py-8">
        {/* Interview Flow */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Scheduling */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-semibold text-slate-800">Interview Scheduling</div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Candidates receive personalized interview links via email</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Self-scheduling within a defined time window</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Automatic reminders before interview</span>
              </li>
            </ul>
          </div>

          {/* Execution */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Video className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="font-semibold text-slate-800">Interview Execution</div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <span>AI interviewer joins Google Meet automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <span>Audio-based interview (video optional in future)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <span>AI asks structured, role-specific questions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                <span>Candidate responds naturally in conversation</span>
              </li>
            </ul>
          </div>

          {/* Evaluation */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-violet-600" />
              </div>
              <div className="font-semibold text-slate-800">AI Evaluation</div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <span>AI generates comprehensive interview summary</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <span>Scores communication skills objectively</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <span>Evaluates sales readiness and role fit</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <span>Provides transcript for review</span>
              </li>
            </ul>
          </div>

          {/* Human Handoff */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="font-semibold text-slate-800">Human Handoff</div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Hiring manager reviews AI summary</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Access to full transcript if needed</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Final interview conducted by human</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>Human makes all hiring decisions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Candidate-Friendly Experience
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-medium text-slate-800 text-sm mb-1">No Pressure</div>
              <p className="text-slate-600 text-xs">
                Candidates can reschedule if needed. Flexible time windows.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-medium text-slate-800 text-sm mb-1">No Bias-Based Rejection</div>
              <p className="text-slate-600 text-xs">
                AI evaluates objectively. No auto-rejection without human review.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="font-medium text-slate-800 text-sm mb-1">Full Transparency</div>
              <p className="text-slate-600 text-xs">
                Clear evaluation criteria. Explainable scoring system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          AI Interview Process — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};
