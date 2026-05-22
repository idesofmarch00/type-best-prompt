# 🤖 PROMPT BLITZ - Agents & AI Pipelines (AGENTS.md)

## 1. Game Mode Evaluator Agents

### 1.1 Fast Inference Agent (Groq / Llama 3)
- **Role**: Immediate parsing and code generation.
- **Usage**: Used primarily in *Mode 1 (Prompt Strategy Mode)*.
- **Workflow**: Takes the user's 30-second prompt, executes it as fast as possible to generate a response (JSON or Code), which is then parsed by the sandbox evaluation engine.

### 1.2 The Reasoning Agent (DeepSeek-R1 / OpenAI o-series)
- **Role**: Complex logical deduction and Chain-of-Thought (CoT) execution.
- **Usage**: Used in *Mode 4 (Reasoning & Deconstruction Mode)*.
- **Workflow**: Native generation of `<thinking>` blocks. The evaluator specifically inspects the presence of rigorous step-by-step reasoning (e.g., differential diagnosis in NEET-MBBS mode or formula derivation in JEE mode) before asserting the final answer.

## 2. Automated Scoring Systems (The Judges)

### 2.1 The Code Test Driver (Sandboxed Execution)
- Runs locally in an isolated Node.js environment or via a secure execution container.
- Compares AI-generated output strings against predefined Unit Tests fetched from the PostgreSQL `EvaluationChallenge` table.

### 2.2 Promptfoo Integration Matrix
- Parses the prompt evaluation rules without human intervention.
- Performs assertions (`contains`, `not-contains`, `is-json`).
- Utilizes `llm-rubric` based grading for nuanced compliance tracking (e.g. "Did the user prompt successfully constrain the AI to output ONLY a markdown table?").

## 3. Future Expansion: Sub-Agent Orchestration
As the platform expands, successful user prompts will move beyond string-evaluation and begin driving real, multi-container script setups via tools like **OpenClaw** or **LangGraph**. The system is architected to allow winning prompts to transition directly into execution loops inside a local cluster.
