'use client';

import React, { useEffect } from 'react';
import F1ProgressVisualizer from '@/components/arena/F1ProgressVisualizer';
import CodeEditor from '@/components/arena/CodeEditor';
import ProblemPanel from '@/components/arena/ProblemPanel';
import { useArenaStore } from '@/store/useArenaStore';
import { Terminal, Users } from 'lucide-react';

export default function ArenaPage() {
  const initializeMockMatch = useArenaStore(state => state.initializeMockMatch);

  useEffect(() => {
    // Initialize mock data for the demo
    initializeMockMatch();
  }, [initializeMockMatch]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto gap-6">
      
      {/* Header Bar */}
      <header className="flex justify-between items-center glass-panel p-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-neon-green" />
          <h1 className="text-2xl font-black italic tracking-tighter">
            <span className="text-neon-green">CODE</span>
            <span className="text-neon-purple">RACER</span>
            <span className="ml-2 px-2 py-0.5 border border-neon-blue text-neon-blue text-xs rounded uppercase not-italic">Live</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-semibold tracking-wider text-slate-400">
          <span className="flex items-center gap-2 uppercase">
            <Users className="w-4 h-4" /> Multiplayer Live Races <strong className="text-red-500">[LIVE]</strong>
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
        </div>
      </header>

      {/* Top F1 Racing Visualizer */}
      <F1ProgressVisualizer />

      {/* Main Arena Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* Code Editor (Left, takes 2 columns) */}
        <div className="lg:col-span-2">
          <CodeEditor />
        </div>
        
        {/* Problem Panel (Right, takes 1 column) */}
        <div className="lg:col-span-1">
          <ProblemPanel />
        </div>
      </div>
      
    </div>
  );
}
