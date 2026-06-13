# Universal Agentic Engineering Rules

These rules represent the core, universal methodology for building production-grade software using autonomous AI agents. They combine the **JSM Agent Skills System** with advanced paradigms designed to eliminate AI drift, context pollution, and "vibe coding" errors.

---

## 1. The Core Interaction Rules

> [!IMPORTANT]
> **Read Before Every Task:** The agent must read all `.md` files in the `/context` folder line-by-line before writing any code or proposing any action.
> 
> **Token Compacting (200k Threshold):** When the active session context grows near **200,000 tokens**, the agent must pause, run `/remember save` to preserve state, and instruct the developer to end the chat and restore in a clean session via `/remember restore`.
> 
> **DAG-Based Task Execution:** Do not attempt to complete multiple phases or features at once. Divide issues into a **Directed Acyclic Graph (DAG)** of independent, atomic sub-tasks. Independent tasks should be built in parallel where possible using git worktrees.

---

## 2. Advanced Engineering Paradigms

### A. Separation of Sessions (Prompt vs. Work)
- **The Prompt/Metadata Session:** An isolated agent session devoted solely to creating, editing, and managing system prompts, rules, and `.md` context files.
- **The Work Session:** A separate, restricted agent session that performs the actual implementation tasks. The Work agent must strictly obey the prompt files and is forbidden from modifying its own rules.

### B. "Grill Me" Phase (Interactive Architecture Interview)
- Instead of immediately drafting an implementation plan, the agent must start with an active **"Grill Me"** interview.
- The agent asks **40 to 100 deep technical and design questions** (one by one, or in logically grouped lists with suggested recommendations) to surface edge cases, structural constraints, design tokens, and API boundaries.
- The plan and context files are created *only* after the Grill phase is concluded and confirmed.

### C. Vertical Feature Slicing
- Do not build layer-by-layer (e.g., all database tables first, then all routes, then all UI).
- Instead, develop features in **vertical slices** (database schema + API endpoint + frontend UI component + state integration) in a single, focused task.
- Slicing horizontally side-by-side allows end-to-end testing immediately, catching integration bugs at step 1 instead of step 4.

### D. Tool and Library Mapping
- **Always SDK/Library for App Logic:** Database queries, authentication, state management, and file storage must always be done via the application SDK.
- **Always MCP for Infrastructure:** Database migrations, server actions, script executions, bucket creations, and host deployments must go through MCP tools.

---

## 3. The Five Agentic Skills (JSM Standard)

```
       /architect  →  Build  →  /review  →  Ship
                        ↓
       /imprint   (UI styling harvesting)
       /remember  (session save/restore)
       /recover   (on compilation/runtime error)
```

### `/architect`
- **When to run:** Before starting any complex feature or system integrations.
- **What it does:** Reads context, runs the Grill Me interview, aligns on terminology, and outputs a concrete implementation plan containing product summary, vocabulary, decisions made, and build steps.

### `/remember`
- **When to run:** At the start and end of every session.
- **`/remember save`:** Summarizes what was built, decisions made, problems solved, current state, next steps, and open questions into `memory.md`.
- > [!CAUTION]
  > **Security Boundary:** Absolutely no raw credentials, passwords, private keys, or API tokens must be saved. Use redact place-holders like `[REDACTED_API_KEY]`.
- **`/remember restore`:** Loads `memory.md` at the start of a fresh session, presenting a quick check to the developer before execution continues.

### `/imprint`
- **When to run:** After building any new UI component or page.
- **What it does:** Extracts visual styles (backgrounds, borders, border-radius, font sizing, padding, hover/focus states) and appends or updates them in `ui-registry.md`.
- **`/imprint audit`:** Scans the codebase to detect styling conflicts and generate a fix-list.

### `/recover`
- **When to run:** When compilation or runtime tests break after one failed attempt at fixing.
- **What it does:** Classifies the error into one of three failure modes:
  1. **Targeted Fix:** A specific, isolated bug. Find the root cause, explain it, and fix it precisely.
  2. **Hard Reset:** The session context is polluted with patches. Write a Reset Note, terminate the session, and start fresh.
  3. **Rethink:** The architectural foundation or assumption was wrong. Re-diagnose with the developer before writing code.

### `/review`
- **When to run:** After completing any feature.
- **What it does:** Audits the code across three layers:
  1. **Plan Alignment:** Does it match the `/architect` blueprint?
  2. **System Integrity:** Does it violate architectural boundaries or code standards?
  3. **Production Readiness:** Are error boundaries, empty states, and loading states handled?
- **Reporting:** Reports bugs with severity labels (**Critical**, **Important**, **Minor**) without auto-fixing, waiting for the developer to prioritize.
