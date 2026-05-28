'use client';

import React, { useEffect, useState } from 'react';
import { useArenaStore, PlayerState } from '@/store/useArenaStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag, Timer, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────
   Single Player Race Track Row
───────────────────────────────────────────── */
function PlayerTrack({ player }: { player: PlayerState }) {
  return (
    <div className="flex flex-col gap-2 mb-5 last:mb-0">
      {/* Player info row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5">
          <span
            className="px-2 py-0.5 rounded text-xs font-black font-mono border"
            style={{
              borderColor: player.carColor,
              color: player.carColor,
              backgroundColor: `${player.carColor}1a`,
            }}
          >
            {player.isCurrentPlayer ? 'YOU' : 'OPP'}
          </span>
          <span
            className="font-bold tracking-wide uppercase text-sm"
            style={{ color: player.carColor, textShadow: `0 0 8px ${player.carColor}80` }}
          >
            {player.username}
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-[hsl(var(--foreground-muted))]">
            WPM{' '}
            <strong className="text-[hsl(var(--foreground))]">{player.wpm}</strong>
          </span>
          <span className="text-[hsl(var(--foreground-muted))]">
            ACC{' '}
            <strong className="text-[hsl(var(--foreground))]">{player.accuracy}%</strong>
          </span>
          <span
            className="font-bold"
            style={{ color: player.carColor }}
          >
            {player.progress}%
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div
        className="relative w-full h-7 rounded-full overflow-hidden"
        style={{
          background: `hsl(var(--background-elevated))`,
          border: `1px solid ${player.carColor}40`,
        }}
        role="progressbar"
        aria-valuenow={player.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${player.username} progress`}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-300 ease-out flex items-center justify-end pr-1"
          style={{
            width: `${Math.max(4, player.progress)}%`,
            background: `linear-gradient(90deg, ${player.carColor}30, ${player.carColor}60)`,
            borderRight: `2px solid ${player.carColor}`,
            boxShadow: `0 0 12px ${player.carColor}80, inset 0 0 8px ${player.carColor}20`,
          }}
        >
          {/* Car */}
          <div
            className="flex items-center gap-0.5 mr-0.5 opacity-90"
            aria-hidden
          >
            <Zap className="w-3 h-3" style={{ color: player.carColor }} />
          </div>
        </div>

        {/* Checkpoint markers */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute inset-y-0 w-px bg-[hsl(var(--border))] opacity-40"
            style={{ left: `${pct}%` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Race Timer Hook
───────────────────────────────────────────── */
function useRaceTimer(initialSeconds = 120) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return { display: `${mins}:${secs}`, isUrgent: seconds <= 15, seconds };
}

/* ─────────────────────────────────────────────
   Main Visualizer
───────────────────────────────────────────── */
export default function F1ProgressVisualizer() {
  const players = useArenaStore((state) => state.players);
  const playerList = Object.values(players);
  const timer = useRaceTimer(120);

  return (
    <Card id="f1-progress-track">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-[hsl(var(--foreground))]">
            <Flag className="w-4 h-4 text-neon-blue" />
            Race Track
          </CardTitle>

          <div className="flex items-center gap-3">
            {/* Checkpoint labels */}
            <div className="hidden md:flex items-center gap-4 text-[hsl(var(--foreground-subtle))] text-xs font-mono mr-2">
              <span>Start</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>Finish</span>
            </div>

            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1 rounded-md border ${
                timer.isUrgent
                  ? 'border-red-500/50 text-red-400 bg-red-500/10 animate-pulse-neon'
                  : 'border-[hsl(var(--neon-blue)/0.4)] text-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue)/0.1)]'
              }`}
              aria-label={`Time remaining: ${timer.display}`}
            >
              <Timer className="w-3.5 h-3.5" aria-hidden />
              {timer.display}
            </div>

            <Badge variant="live">● LIVE</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {playerList.length === 0 ? (
          <div className="text-center py-8 text-[hsl(var(--foreground-muted))] text-sm animate-pulse">
            Waiting for players to join...
          </div>
        ) : (
          playerList.map((player) => (
            <PlayerTrack key={player.id} player={player} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
