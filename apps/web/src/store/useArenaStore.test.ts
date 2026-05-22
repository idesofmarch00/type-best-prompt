import { useArenaStore } from './useArenaStore';

describe('useArenaStore', () => {
  beforeEach(() => {
    // Reset state before each test if necessary (or just set back to initial defaults)
    useArenaStore.setState({
      players: {},
      roomId: null,
      currentInput: '',
    });
  });

  it('should initialize with default states', () => {
    const state = useArenaStore.getState();
    expect(state.roomId).toBeNull();
    expect(state.players).toEqual({});
    expect(state.currentInput).toBe('');
  });

  it('should update room ID when setRoomId is called', () => {
    const { setRoomId } = useArenaStore.getState();
    setRoomId('test-room-123');

    const state = useArenaStore.getState();
    expect(state.roomId).toBe('test-room-123');
  });

  it('should update player progress and accuracy in state', () => {
    const { updatePlayerState } = useArenaStore.getState();
    
    // Update player that doesn't exist (creates it with default fallbacks)
    updatePlayerState('player-1', { username: 'Racer1', progress: 45 });

    let state = useArenaStore.getState();
    expect(state.players['player-1']).toBeDefined();
    expect(state.players['player-1'].username).toBe('Racer1');
    expect(state.players['player-1'].progress).toBe(45);
    expect(state.players['player-1'].accuracy).toBe(100); // from fallback defaults

    // Update existing player's WPM and accuracy
    updatePlayerState('player-1', { wpm: 80, accuracy: 95 });
    
    state = useArenaStore.getState();
    expect(state.players['player-1'].wpm).toBe(80);
    expect(state.players['player-1'].accuracy).toBe(95);
    expect(state.players['player-1'].progress).toBe(45); // retained
  });

  it('should initialize mock match with mock data', () => {
    const { initializeMockMatch } = useArenaStore.getState();
    initializeMockMatch();

    const state = useArenaStore.getState();
    expect(state.roomId).toBe('arena-demo-1');
    expect(Object.keys(state.players)).toHaveLength(2);
    expect(state.players['player-1'].username).toBe('VoidRunner');
    expect(state.players['player-2'].username).toBe('OP-PONENT');
  });
});
