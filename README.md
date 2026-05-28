# 🏁 CodeRacer - Multiplayer Keystroke & Syntax Optimization Arena

CodeRacer is a highly concurrent, real-time multiplayer developer training platform. Developers compete in high-stakes visual speed duels to write flawless syntax, execute complex CLI commands from memory, and construct highly structured data-schema specifications that satisfy strict deterministic verification suites.

The platform combines the low-latency socket synchronization of an esports racing game (like TypeRacer/MonkeyType) with a robust computational engine for sandbox validation and automated execution.

---

## 🏛️ Monorepo Architecture

Built as a scalable **Turborepo Monorepo** utilizing **NPM Workspaces**:

*   **`apps/web`**: Next.js Client Engine (Frontend). A high-tech esports dashboard using Zustand state syncing and responsive racing progress tracks.
*   **`apps/server`**: Node.js/Express Real-time Coordination Engine (Backend). Syncs player keystrokes, coordinates room matchmaking, and runs validator checkpoints.
*   **`packages/tsconfig`**: Shared TypeScript settings.
*   **`packages/eslint-config`**: Shared linting standards.
*   **`packages/tailwind-config`**: Core esports styling tokens.
*   **`packages/ui`**: Shared UI design components.

---

## ⚡ Key Gameplay Features

1.  **Speed Arena (Keystroke PvP)**: Race head-to-head in real-time, matching complex code structures. Key stats (WPM, accuracy) are synced and visualized instantly via F1-style racecar bars.
2.  **Syntax Duel (Validation Sandbox)**: Write precise logic blocks and structured schemas under strict time constraints. The server executes and scores correctness against built-in unit tests.

---

## 🧪 Comprehensive Verification Suites

The codebase includes standard test automation pipelines inside `apps/web`:

*   **Unit Tests (Jest & React Testing Library)**: Rapid state-management and logic checks leveraging Next.js's SWC compiler.
*   **End-to-End Tests (Playwright)**: Browser automation tests executing Chromium, Firefox, and WebKit to verify multiplayer room hydration and client layouts.

---

## 🚀 Getting Started

### 1. Installation
Install workspace dependencies from the monorepo root:
```bash
npm install
```

### 2. Run Locally
Launch the Next.js client (port `3000`) and the WebSocket server (port `3001`) concurrently:
```bash
npm run dev
```

### 3. Production Build
Compile and typecheck all packages and workspaces:
```bash
npm run build
```

### 4. Run Test Suites
Execute unit and browser integration tests:
```bash
# Run Jest unit tests
npm run test

# Run Playwright E2E browser tests
npm run test:e2e
```
