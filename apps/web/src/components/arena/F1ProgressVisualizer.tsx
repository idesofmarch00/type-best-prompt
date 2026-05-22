'use client';

import React from 'react';
import { useArenaStore, PlayerState } from '@/store/useArenaStore';
import { Flag, Timer } from 'lucide-react';

const PlayerTrack = ({ player }: { player: PlayerState }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between items-center text-sm font-semibold tracking-wider">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">
            {player.isCurrentPlayer ? 'P1' : 'P2'}
          </span>
          <span style={{ color: player.carColor }} className="uppercase">
            {player.username}
          </span>
        </div>
        <div className="flex gap-4 text-slate-400">
          <span>WPM: <strong className="text-slate-200">{player.wpm}</strong></span>
          <span>ACC: <strong className="text-slate-200">{player.accuracy}%</strong></span>
        </div>
      </div>
      
      <div className="relative w-full h-8 bg-slate-800/50 rounded-full border border-slate-700/50 overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300 ease-out flex items-center justify-end pr-2"
          style={{ 
            width: `${Math.max(5, player.progress)}%`,
            backgroundColor: `${player.carColor}33`, // 20% opacity
            borderRight: `2px solid ${player.carColor}`,
            boxShadow: `0 0 10px ${player.carColor}80`
          }}
        >
          {/* Race Car Icon (Abstract) */}
          <div 
            className="w-12 h-4 rounded-sm relative"
            style={{ backgroundColor: player.carColor }}
          >
            <div className="absolute -top-1 left-2 w-4 h-6 bg-slate-900 rounded-sm opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function F1ProgressVisualizer() {
  const players = useArenaStore((state) => state.players);
  const playerList = Object.values(players);

  return (
    <div className="glass-panel p-6 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700/50 pb-4">
        <h2 className="text-xl font-bold tracking-widest text-slate-200 uppercase flex items-center gap-2">
          <Flag className="w-5 h-5 text-neon-blue" />
          F1 Racing Progress
        </h2>
        <div className="flex items-center gap-2 text-neon-blue">
          <Timer className="w-5 h-5" />
          <span className="font-mono font-bold">01:28</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Checkpoint markers */}
        <div className="absolute top-10 left-0 w-full flex justify-between px-2 text-slate-600 text-xs">
          <span>Start</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Finish</span>
        </div>
        
        {playerList.map(player => (
          <PlayerTrack key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
