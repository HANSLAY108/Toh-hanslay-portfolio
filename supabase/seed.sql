-- ==============================================================================
-- Hanslay Portfolio - Production Seed Data
-- ==============================================================================

-- 1. Profile Seed
delete from public.profiles;
insert into public.profiles (
  id,
  full_name,
  tagline,
  bio,
  hero_photo_url,
  cv_url,
  email,
  location,
  available_for_work,
  socials,
  metrics
) values (
  '00000000-0000-0000-0000-000000000001',
  'Hanslay',
  'Software Engineer, AI Engineer & Graphic Designer',
  'Engineering high-throughput systems, training domain-specific models, and crafting minimalist interfaces. Dedicated to the convergence of technical rigor, cognitive architecture, and typographic purity.',
  '/hanslay-portrait.png',
  '/hanslay-cv.pdf',
  'hanslay@atelier.dev',
  'San Francisco & Remote',
  true,
  '{"github": "https://github.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "readcv": "https://read.cv"}'::jsonb,
  '{"years_experience": 7, "projects_completed": 34, "design_awards": 6, "models_deployed": 18}'::jsonb
);

-- 2. Projects Seed
delete from public.projects;
insert into public.projects (
  id,
  slug,
  title,
  summary,
  category,
  tags,
  cover_image,
  client,
  role,
  year,
  live_url,
  github_url,
  case_study_content,
  featured,
  order_index,
  published
) values
(
  '10000000-0000-0000-0000-000000000001',
  'autonomous-ai-workflow-engine',
  'Autonomous AI Agent Workflow Engine',
  'Distributed task orchestrator coordinating multi-agent LLM teams with sub-second IPC, checkpointing, and dynamic DAG evaluation.',
  'AI Systems',
  array['Rust', 'PyTorch', 'gRPC', 'Next.js', 'Vector DB'],
  '/projects/ai-workflow.png',
  'Atelier AI Labs',
  'Lead Architect & UI Designer',
  '2024',
  'https://example.com/ai-engine',
  'https://github.com/hanslay/agent-orchestrator',
  '## System Architecture & Motivation

Modern multi-agent architectures often degrade under nondeterministic branching, unbounded token budgets, and distributed state desynchronization. The Autonomous AI Agent Workflow Engine was engineered from first principles to resolve these bottlenecks.

### Core Architecture Pillars
1. **Deterministic State Checkpointing**: Utilizing write-ahead event streams with snapshot isolation.
2. **Sub-15ms Inter-Process Dispatch**: Rust-backed actor framework coordinating distributed LLM workers over gRPC.
3. **Typographic & Spatial Telemetry**: An editorial real-time interface built with Next.js App Router, displaying token consumption, DAG depth, and safety boundary evaluations.

```rust
pub async fn dispatch_agent_turn(
    ctx: &ExecutionContext,
    agent_id: AgentId,
    state_vector: &[f32],
) -> Result<AgentTurnResult, EngineError> {
    let memory_ref = ctx.ephemeral_cache.acquire_lease(agent_id).await?;
    let prompt_payload = memory_ref.compile_context_window(state_vector)?;
    ctx.inference_client.evaluate_stream(prompt_payload).await
}
```

### Quantified Results & Impact
- 94% reduction in DAG state reconciliation latency across 100+ concurrent agent subgraphs.
- Sub-50ms end-to-end telemetry streaming from inference nodes to the web dashboard.
- Zero data loss across simulated cluster partition tests.',
  true,
  1,
  true
),
(
  '10000000-0000-0000-0000-000000000002',
  'neural-audio-synthesis-workstation',
  'Neural Audio Synthesis & Waveform Workstation',
  'Real-time diffusion-based audio spatializer and synthesis engine with WebAssembly DSP audio buffers and minimalist visual typography.',
  'AI Systems',
  array['WebAssembly', 'C++', 'Diffusion', 'Audio DSP', 'Tailwind'],
  '/projects/neural-audio.png',
  'Soundform Research',
  'DSP Engineer & Product Designer',
  '2024',
  'https://example.com/neural-audio',
  'https://github.com/hanslay/neural-audio',
  '## Bridging Generative Acoustics with Hardware Latency

A study in low-latency WebAudio worklets paired with high-fidelity latent diffusion audio models. The challenge lay in delivering stutter-free 48kHz audio streams inside web runtimes while generating continuous generative variations.',
  true,
  2,
  true
),
(
  '10000000-0000-0000-0000-000000000003',
  'editorial-fintech-ledger-platform',
  'Editorial Institutional Ledger & Asset Custody',
  'Cryptographic double-entry accounting engine designed for private investment funds, featuring audit logs and high-density financial typography.',
  'Full Stack',
  array['TypeScript', 'PostgreSQL', 'Next.js', 'Docker', 'Tailwind'],
  '/projects/fintech-ledger.png',
  'Veritas Capital Management',
  'Full-Stack Architect',
  '2023',
  'https://example.com/ledger',
  'https://github.com/hanslay/editorial-ledger',
  '## High-Assurance Financial Engineering

Double-entry transactional safety guaranteed via ACID-compliant ledger partitions, verifiable Merkle proofs, and a restrained, paper-like visual layout designed to reduce analyst cognitive fatigue.',
  true,
  3,
  true
),
(
  '10000000-0000-0000-0000-000000000004',
  'monochrome-type-system-identity',
  'Monochrome Typographic & Design System',
  'A unified digital brand identity, bespoke ligature set, and component specification crafted for engineering publications and developer toolkits.',
  'UI/UX Design',
  array['Typography', 'Design Systems', 'Figma', 'Design Tokens', 'CSS'],
  '/projects/design-system.png',
  'Monolith Monospace',
  'Creative Director & Type Designer',
  '2023',
  'https://example.com/type-system',
  null,
  '## The Art of Typographic Restraint

An exploration into proportional scales, editorial grids, and tactile warmth. Avoiding synthetic vibrancy in favor of deliberate contrast, balanced leading, and harmonious brown-spectrum neutrals.',
  true,
  4,
  true
);

-- 3. Blog Posts Seed
delete from public.blog_posts;
insert into public.blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image,
  tags,
  reading_time,
  published,
  published_at
) values
(
  '20000000-0000-0000-0000-000000000001',
  'building-low-latency-multimodal-agents',
  'Building Low-Latency Multimodal Agents with PyTorch and Next.js',
  'Architecting zero-overhead token pipelines between PyTorch inference clusters and browser streaming interfaces through Server-Sent Events and WebSockets.',
  '## The Quest for Imperceptible Latency

When designing human-AI interfaces, perceived latency is the decisive factor between an uncanny mechanical toy and an amplification of human intellect.

Most multimodal systems incur cumulative overhead at three distinct boundaries:
1. **Model Token-Time-to-First (TTFT)**
2. **Serialization and Cross-Network Ingress**
3. **DOM Hydration and Layout Calculation**

```python
class StreamEncoder:
    def __init__(self, tokenizer, max_buffer_tokens: int = 8):
        self.tokenizer = tokenizer
        self.buffer = []
        self.max_buffer = max_buffer_tokens

    def push(self, token_id: int):
        self.buffer.append(token_id)
        if len(self.buffer) >= self.max_buffer:
            return self.flush()
        return None

    def flush(self):
        text = self.tokenizer.decode(self.buffer, skip_special_tokens=True)
        self.buffer.clear()
        return text.encode("utf-8")
```

### Architectural Principles

By establishing streaming TCP connections paired with lightweight edge workers, we achieved a sustained TTFT under **180ms** across globally distributed test clients.',
  '/blog/latency-agents.png',
  array['AI Systems', 'Next.js', 'PyTorch', 'Architecture'],
  '6 min read',
  true,
  '2024-04-12 10:00:00+00'
),
(
  '20000000-0000-0000-0000-000000000002',
  'engineering-with-aesthetic-conviction',
  'Engineering with Aesthetic Conviction: Why Code and Typography Share the Same Soul',
  'Why the finest software systems are built not by indifferent mechanics, but by designers who understand memory layouts, and engineers who revere letterforms.',
  '## Dual Disciplines, Single Purpose

There exists a pervasive myth in technology that rigorous backend engineering and deliberate aesthetic sensitivity are mutually contradictory pursuits.

In truth, both disciplines are governed by the exact same fundamentals:
- **Economy of Means**: In code, avoid unnecessary indirection. In typography, avoid decorative noise.
- **Rhythm and Cadence**: Functions have visual balance; paragraphs have typographic color.
- **Respect for the Reader**: Whether reading an API specification or an editorial case study, cognitive clarity is paramount.',
  '/blog/aesthetic-conviction.png',
  array['Philosophy', 'Design Systems', 'Craftsmanship'],
  '5 min read',
  true,
  '2024-03-28 14:00:00+00'
),
(
  '20000000-0000-0000-0000-000000000003',
  'deterministic-state-machines-in-modern-web',
  'Deterministic State Machines in Modern Web Applications',
  'Eliminating impossible UI states, race conditions, and uncontrolled rerenders through hierarchical finite state automata.',
  '## Eliminating Impossible States

Boolean state flags like isLoading, isError, isSuccess quickly blossom into exponential invalid combinations. Formal statecharts guarantee that transitions only occur along validated edges.',
  '/blog/state-machines.png',
  array['TypeScript', 'Frontend Architecture', 'State Machines'],
  '8 min read',
  true,
  '2024-02-15 09:30:00+00'
);

-- 4. Skills Seed
delete from public.skills;
insert into public.skills (category, name, proficiency_notes, order_index) values
('Core & Systems Architecture', 'TypeScript & Node.js', 'Runtime semantics, compiler ASTs, and high-performance server architectures.', 1),
('Core & Systems Architecture', 'Rust & Systems Programming', 'Concurrent actor engines, low-latency IPC, memory safety, and WebAssembly compilation.', 2),
('Core & Systems Architecture', 'PostgreSQL & Distributed DBs', 'Schema modeling, RLS policies, indexing strategies, vector embeddings, and replication.', 3),
('Artificial Intelligence & ML', 'PyTorch & Model Training', 'Fine-tuning transformer models, LoRA adaptations, custom loss functions, and inference optimization.', 4),
('Artificial Intelligence & ML', 'Autonomous Agent Orchestration', 'Multi-agent graph scheduling, tool-calling pipelines, guardrail synthesis, and state recovery.', 5),
('Artificial Intelligence & ML', 'Vector Retrieval & RAG', 'Hybrid search algorithms, sparse-dense re-ranking, chunking strategies, and semantic routing.', 6),
('Design & Creative Direction', 'Editorial Typography & Layout', 'Vertical rhythm, optical kerning, proportional scale harmonies, and publication design.', 7),
('Design & Creative Direction', 'Design Systems & Token Design', 'Comprehensive component systems, Figma-to-code token pipelines, accessibility.', 8),
('Cloud & Tooling', 'Next.js 14 App Router & React', 'Server Components, streaming SSR, edge middleware, and optimistic caching.', 9),
('Cloud & Tooling', 'Docker, Kubernetes & CI/CD', 'Reproducible container environments, automated test matrices, and Vercel edge deployment.', 10);

-- 5. Services Seed
delete from public.services;
insert into public.services (title, description, deliverables, order_index, active) values
(
  'AI Architecture & Agentic Systems',
  'Designing end-to-end autonomous model pipelines, custom fine-tuning, streaming APIs, and multi-agent DAG execution.',
  array['Custom inference pipelines & tool integrations', 'Benchmarking & safety boundary enforcement', 'Production-ready latency optimization', 'Interactive monitoring dashboards'],
  1,
  true
),
(
  'Full-Stack Web Engineering',
  'Architecting high-performance web applications with Next.js, TypeScript, PostgreSQL, and resilient edge infrastructure.',
  array['Zero-compromise App Router architectures', 'Type-safe database design & migrations', 'Sub-second load times & Core Web Vitals', 'Comprehensive automated testing suites'],
  2,
  true
),
(
  'Digital Product & Design Systems',
  'Crafting minimalist, editorial visual identities, responsive component libraries, and ergonomic user experiences.',
  array['Design tokens & atomic component libraries', 'Typographic systems & spatial hierarchies', 'Figma production assets & prototypes', 'Interactive micro-interactions & motion'],
  3,
  true
);

-- 6. Site Settings Seed
delete from public.site_settings;
insert into public.site_settings (
  site_title,
  meta_description,
  keywords,
  og_image_url,
  contact_email,
  footer_text,
  available_for_work
) values (
  'Hanslay — Software Engineer, AI Engineer & Graphic Designer',
  'Personal portfolio and technical writing of Hanslay. Exploring autonomous AI architectures, distributed systems, and editorial typography.',
  array['Hanslay', 'Software Engineer', 'AI Engineer', 'Graphic Designer', 'Machine Learning', 'Next.js', 'TypeScript', 'Editorial Design'],
  '/og-image.png',
  'hanslay@atelier.dev',
  'Crafted with architectural precision, cognitive depth, and typographic conviction.',
  true
);
