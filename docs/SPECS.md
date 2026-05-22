# 🛠️ PROMPT BLITZ - Technical Specifications (SPECS)

## 1. System Architecture
The application follows a distributed web-native architecture designed for low-latency state synchronization and high-throughput LLM API integrations.

### Architecture Diagram
```
+-------------------------------------------------------------------+
|                        PROMPT BLITZ ARCHITECTURE                  |
+-------------------------------------------------------------------+
|     [ CLIENT ENGINE ]               |     [ COMPUTE BACKEND ]     |
|                                     |                             |
|  +-----------------------+          |      +-------------------+  |
|  |     TanStack Start    |          |      |   Node.js Server  |  |
|  |   (Unified UI State)  |          |      |   (Express Core)  |  |
|  +-----------------------+          |      +-------------------+  |
|              |                      |                |            |
|              v                      |                v            |
|  +-----------------------+          |      +-------------------+  |
|  |   Socket.io Client    | <==============>| Socket.io Engine  |  |
|  | (Realtime F1 Match UI)|  [WebSockets]   | (Redis Room Store)|  |
|  +-----------------------+          |      +-------------------+  |
|                                     |                |            |
|                                     |                v            |
|  +-----------------------+          |      +-------------------+  |
|  |   Google OAuth 2.0    |          |      | PostgreSQL Layer  |  |
|  |   (Lucia / Auth.js)   |          |      | (Drizzle / Prisma)|  |
|  +-----------------------+          |      +-------------------+  |
+-------------------------------------------------------------------+
```

## 2. Multiplayer Matchmaking & Rooms
- **Mechanism**: Players create a room, generating a URL-friendly cryptographic string hash.
- **State Store**: Active room states and participant progression arrays are stored in a high-speed Redis Cache Layer.
- **Sync Logic**: Socket.io handles bidirectional event distribution. When a player inputs a sequence correctly, a packet (`{ roomId, playerId, progress }`) is streamed to the server and broadcasted to update F1 car visualizations in real-time.

## 3. The Judgment & Automated Evaluation System
For real-time gamified prompt evaluation, the system employs dual deterministic evaluation paths:

### Path A: Assertion & Test-Driven Validation
- Used for Prompt Strategy Mode.
- Prompt text is fired to an ultra-fast inference layer (e.g., Llama 3 via Groq).
- Output is run through Structural Assertions (e.g. `JSON.parse()`) and Sandbox Unit-Testing (code executed against stored database test drivers).

### Path B: Reasoning Engine & Heuristic Pattern Scoring
- Used for Reasoning & Deconstruction Mode.
- Sent to reasoning models (DeepSeek-R1 / OpenAI o1).
- Integrates with `promptfoo` or similar evaluation suites in the Node.js backend.
- Verifies exact substring matches (`contains`) and uses `llm-rubric` to evaluate Chain-of-Thought (CoT) correctness.

## 4. Keystroke Tracking & Racing UI
- **Engine**: Natively handles brackets, indentations, and special symbol tracking (`{`, `}`, `=>`, `\t`) without dropping rendering frames. 
- **Inspiration**: Code components to be inspired by/forked from `codesprint` and `typeduel`. State will be handled with Zustand or TanStack for ultra-fast client-side updates.

## 5. Security & Authentication
- Google OAuth (via Lucia or Auth.js).
- Protected room creation and protected leaderboard submission routes.
- Sanitization of LLM inputs to prevent injection into promptfoo evaluators.
