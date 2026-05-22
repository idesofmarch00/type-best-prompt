import { create } from 'zustand';

export interface PlayerState {
  id: string;
  username: string;
  progress: number; // 0 to 100
  wpm: number;
  accuracy: number;
  isCurrentPlayer: boolean;
  carColor: string; // Hex color for the UI
}

interface ArenaStore {
  players: Record<string, PlayerState>;
  roomId: string | null;
  targetCode: string;
  currentInput: string;
  
  // Actions
  setRoomId: (id: string) => void;
  updateInput: (input: string) => void;
  updatePlayerState: (id: string, state: Partial<PlayerState>) => void;
  initializeMockMatch: () => void;
}

export const useArenaStore = create<ArenaStore>((set) => ({
  players: {},
  roomId: null,
  targetCode: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  currentInput: '',
  
  setRoomId: (id) => set({ roomId: id }),
  updateInput: (input) => set({ currentInput: input }),
  updatePlayerState: (id, state) => set((prev) => {
    const existing = prev.players[id] || {
      id,
      username: 'Unknown',
      progress: 0,
      wpm: 0,
      accuracy: 100,
      isCurrentPlayer: false,
      carColor: '#3b82f6',
    };
    return {
      players: {
        ...prev.players,
        [id]: {
          ...existing,
          ...state,
          id // ensure ID is preserved
        }
      }
    };
  }),
  
  initializeMockMatch: () => set({
    roomId: 'arena-demo-1',
    players: {
      'player-1': {
        id: 'player-1',
        username: 'VoidRunner',
        progress: 78,
        wpm: 89,
        accuracy: 98,
        isCurrentPlayer: true,
        carColor: '#10b981' // Emerald/Green
      },
      'player-2': {
        id: 'player-2',
        username: 'OP-PONENT',
        progress: 65,
        wpm: 72,
        accuracy: 94,
        isCurrentPlayer: false,
        carColor: '#d946ef' // Fuchsia/Purple
      }
    }
  })
}));
