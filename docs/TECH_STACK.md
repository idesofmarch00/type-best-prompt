# 💻 PROMPT BLITZ - Tech Stack

## Frontend (Client Engine)
- **Framework**: TanStack Start / Next.js (Web-native)
- **UI & Styling**: Tailwind CSS, strict design tokens, F1 racing visual themes
- **State Management**: Zustand (for high-speed client keystroke state) / TanStack Query
- **WebSocket Client**: Socket.io Client

## Backend (Compute & Sync Engine)
- **Runtime Environment**: Node.js (Express / Fastify)
- **Real-time WebSockets**: Socket.io Server
- **In-Memory Cache & Rooms**: Redis (for matchmaking & low-latency room state)
- **Database**: PostgreSQL
- **ORM**: Prisma or Drizzle ORM
- **Authentication**: Google OAuth 2.0 via Lucia Auth or Auth.js

## AI & Prompt Evaluation Suite
- **Inference APIs**: DeepSeek-R1, OpenAI o1/o3, Llama 3 (via Groq API)
- **Scoring Engines**: `promptfoo` and/or `autoevals`
- **Execution**: Sandboxed JS execution for running model-generated code against unit tests.

## Open Source Inspirations / Forks
The project architecture and specific modules will draw heavy inspiration from mature open-source repositories:
- `8tp / typeduel`: For WebSockets PvP combat and keystroke UI state.
- `anasm266 / typing-race`: For lightweight Edge-based room coordination packets.
- `cwklurks / codesprint`: For tracking complex code control blocks (`{`, `}`, `\t`) natively.
- `syamsasi99 / prompt-evaluator`: For LLM output schema scoring.
- `promptfoo / promptfoo`: Standard CI/CD prompt verification integration.
