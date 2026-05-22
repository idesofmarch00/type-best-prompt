'use client';

import React, { useEffect, useRef } from 'react';
import { useArenaStore } from '@/store/useArenaStore';
import { Code2 } from 'lucide-react';

export default function CodeEditor() {
  const { targetCode, currentInput, updateInput } = useArenaStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInput(e.target.value);
    
    // In a real implementation, this is where we calculate progress, wpm, etc.
    // based on comparing e.target.value with targetCode
    const progress = Math.min(100, (e.target.value.length / targetCode.length) * 100);
    useArenaStore.getState().updatePlayerState('player-1', { progress });
  };

  // Render the syntax-highlighted code where typed characters are colorized
  const renderTypedCode = () => {
    const targetChars = targetCode.split('');
    const inputChars = currentInput.split('');
    
    return targetChars.map((char, index) => {
      let className = "text-slate-500"; // Untyped
      
      if (index < inputChars.length) {
        if (inputChars[index] === char) {
          className = "text-neon-green"; // Correct
        } else {
          className = "text-red-500 bg-red-500/20"; // Incorrect
        }
      } else if (index === inputChars.length) {
        // Cursor position
        className = "bg-slate-700 animate-pulse border-b-2 border-neon-green text-slate-300";
      }

      return (
        <span key={index} className={className}>
          {char === '\\n' ? '\\n' : char}
        </span>
      );
    });
  };

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-700/50">
        <h2 className="text-xl font-bold tracking-widest text-slate-200 uppercase flex items-center gap-2">
          <Code2 className="w-5 h-5 text-neon-green" />
          Code Editor
        </h2>
        <div className="flex gap-4 text-sm font-mono text-slate-400">
          <span>Mistakes: <strong className="text-red-400">0</strong></span>
        </div>
      </div>

      <div className="relative flex-grow font-mono text-base lg:text-lg leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 overflow-hidden">
        {/* Hidden textarea to capture input but maintain mobile keyboard support */}
        <textarea
          ref={inputRef}
          value={currentInput}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 w-full h-full cursor-default resize-none z-10"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        {/* Visual Code Display */}
        <div className="absolute inset-0 p-4 pointer-events-none whitespace-pre overflow-y-auto">
          {renderTypedCode()}
        </div>
      </div>
    </div>
  );
}
