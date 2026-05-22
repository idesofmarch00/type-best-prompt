'use client';

import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';

export default function ProblemPanel() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold tracking-widest mb-4 flex items-center gap-2 uppercase">
        <Target className="w-5 h-5 text-neon-purple" />
        <span className="text-slate-200">Problem:</span> 
        <span className="neon-text-purple">Binary Search</span>
      </h2>
      
      <div className="prose prose-invert prose-slate flex-grow">
        <p className="text-slate-300 leading-relaxed text-sm">
          Given a sorted array <code className="bg-slate-800 px-1 py-0.5 rounded text-neon-blue">arr</code> and a 
          target value <code className="bg-slate-800 px-1 py-0.5 rounded text-neon-blue">target</code>, write a function 
          to implement Binary Search to find the index of the target. If not found, return <code className="bg-slate-800 px-1 py-0.5 rounded">-1</code>.
        </p>

        <div className="mt-8 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Constraints
          </h3>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
            <li>Time Limit: <strong className="text-neon-green">120s</strong></li>
            <li>Required Accuracy: <strong className="text-neon-green">&gt;95%</strong></li>
            <li>Must be <strong className="text-neon-blue">O(log n)</strong> time complexity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
