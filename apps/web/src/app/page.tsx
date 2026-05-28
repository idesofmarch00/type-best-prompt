'use client';

import React, { useEffect, useState } from 'react';
import F1ProgressVisualizer from '@/components/arena/F1ProgressVisualizer';
import CodeEditor from '@/components/arena/CodeEditor';
import ProblemPanel from '@/components/arena/ProblemPanel';
import { useArenaStore } from '@/store/useArenaStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Users, Zap, LogOut, Settings } from 'lucide-react';

type View = 'lobby' | 'arena';

export default function HomePage() {
  const [view, setView] = useState<View>('lobby');
  const initializeMockMatch = useArenaStore(state => state.initializeMockMatch);
  const players = useArenaStore(state => state.players);

  const handleEnterArena = () => {
    initializeMockMatch();
    setView('arena');
  };

  if (view === 'arena') {
    return <ArenaView onExit={() => setView('lobby')} />;
  }

  return <LobbyView onEnter={handleEnterArena} />;
}

/* ─────────────────────────────────────────────
   LOBBY VIEW — Premium Landing Screen
───────────────────────────────────────────── */
function LobbyView({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="glass-panel m-4 mb-0 px-6 py-3 flex items-center justify-between rounded-xl">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-neon-green" aria-hidden />
          <span className="font-black italic tracking-tighter text-xl">
            <span className="text-neon-green">CODE</span>
            <span className="text-neon-purple">RACER</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="live">● LIVE</Badge>
          <Badge variant="muted">
            <Users className="w-3 h-3" /> 247 Online
          </Badge>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <Badge variant="blue" className="mb-6 text-xs px-4 py-1.5">
          <Zap className="w-3 h-3" />
          Real-time multiplayer · Sub-50ms sync
        </Badge>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
          <span className="gradient-text-racing">Race to </span>
          <br />
          <span className="text-[hsl(var(--foreground))]">Perfect Syntax</span>
        </h1>

        <p className="text-[hsl(var(--foreground-muted))] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Compete head-to-head in real-time keystroke duels. Write flawless code faster
          than your opponent. Every character counts.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            id="enter-arena-btn"
            size="lg"
            variant="neon"
            onClick={onEnter}
            className="min-w-48"
          >
            <Zap className="w-4 h-4" />
            Enter Arena
          </Button>
          <Button size="lg" variant="ghost" className="min-w-48">
            View Leaderboard
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
          {[
            { label: 'Avg WPM', value: '94', color: 'text-neon-green' },
            { label: 'Races Today', value: '1.2K', color: 'text-neon-blue' },
            { label: 'Top Players', value: '500+', color: 'text-neon-purple' },
          ].map(stat => (
            <div key={stat.label} className="glass-panel p-4 text-center">
              <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-[hsl(var(--foreground-muted))] uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-[hsl(var(--foreground-subtle))]">
        CodeRacer — Multiplayer Keystroke Arena
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ARENA VIEW — Live Race Screen
───────────────────────────────────────────── */
function ArenaView({ onExit }: { onExit: () => void }) {
  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col max-w-7xl mx-auto gap-4">
      {/* Header */}
      <header
        id="arena-header"
        className="glass-panel px-5 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-neon-green" aria-hidden />
          <h1 className="text-xl font-black italic tracking-tighter">
            <span className="text-neon-green">CODE</span>
            <span className="text-neon-purple">RACER</span>
          </h1>
          <Badge variant="live">● LIVE</Badge>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="muted">
            <Users className="w-3 h-3" /> Multiplayer
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            aria-label="Exit arena"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </Button>
        </div>
      </header>

      {/* F1 Racing Progress */}
      <F1ProgressVisualizer />

      {/* Main Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow">
        <div className="lg:col-span-2">
          <CodeEditor />
        </div>
        <div className="lg:col-span-1">
          <ProblemPanel />
        </div>
      </div>
    </div>
  );
}
