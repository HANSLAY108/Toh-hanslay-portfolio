import { Profile, Project, BlogPost, Skill, Service, SiteSettings } from "@/types/database";

export const initialProfile: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  full_name: "Hanslay",
  tagline: "Software Engineer, AI Engineer & Graphic Designer",
  bio: "Engineering high-throughput systems, training domain-specific models, and crafting minimalist interfaces. Dedicated to the convergence of technical rigor, cognitive architecture, and typographic purity.",
  hero_photo_url: "/hanslay-portrait.png",
  cv_url: "/hanslay-cv.pdf",
  email: "hanslay@atelier.dev",
  location: "San Francisco & Remote",
  available_for_work: true,
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    readcv: "https://read.cv",
  },
  metrics: {
    years_experience: 7,
    projects_completed: 34,
    design_awards: 6,
    models_deployed: 18,
  },
};

export const initialProjects: Project[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    slug: "autonomous-ai-workflow-engine",
    title: "Autonomous AI Agent Workflow Engine",
    summary: "Distributed task orchestrator coordinating multi-agent LLM teams with sub-second IPC, checkpointing, and dynamic DAG evaluation.",
    category: "AI Systems",
    tags: ["Rust", "PyTorch", "gRPC", "Next.js", "Vector DB"],
    cover_image: "/projects/ai-workflow.png",
    client: "Atelier AI Labs",
    role: "Lead Architect & UI Designer",
    year: "2024",
    live_url: "https://example.com/ai-engine",
    github_url: "https://github.com/hanslay/agent-orchestrator",
    featured: true,
    order_index: 1,
    published: true,
    case_study_content: `## System Architecture & Motivation

Modern multi-agent architectures often degrade under nondeterministic branching, unbounded token budgets, and distributed state desynchronization. The **Autonomous AI Agent Workflow Engine** was engineered from first principles to resolve these bottlenecks.

### Core Architecture Pillars

1. **Deterministic State Checkpointing**: Utilizing write-ahead event streams with snapshot isolation.
2. **Sub-15ms Inter-Process Dispatch**: Rust-backed actor framework coordinating distributed LLM workers over gRPC.
3. **Typographic & Spatial Telemetry**: An editorial real-time interface built with Next.js App Router, displaying token consumption, DAG depth, and safety boundary evaluations.

\`\`\`rust
// Zero-copy actor dispatcher for agent intent synthesis
pub async fn dispatch_agent_turn(
    ctx: &ExecutionContext,
    agent_id: AgentId,
    state_vector: &[f32],
) -> Result<AgentTurnResult, EngineError> {
    let memory_ref = ctx.ephemeral_cache.acquire_lease(agent_id).await?;
    let prompt_payload = memory_ref.compile_context_window(state_vector)?;
    
    // Asynchronous non-blocking inference trigger
    ctx.inference_client.evaluate_stream(prompt_payload).await
}
\`\`\`

### Quantified Results & Impact

- **94% reduction** in DAG state reconciliation latency across 100+ concurrent agent subgraphs.
- **Sub-50ms** end-to-end telemetry streaming from inference nodes to the web dashboard.
- Zero data loss across simulated cluster partition tests.
`,
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    slug: "neural-audio-synthesis-workstation",
    title: "Neural Audio Synthesis & Waveform Workstation",
    summary: "Real-time diffusion-based audio spatializer and synthesis engine with WebAssembly DSP audio buffers and minimalist visual typography.",
    category: "AI Systems",
    tags: ["WebAssembly", "C++", "Diffusion", "Audio DSP", "Tailwind"],
    cover_image: "/projects/neural-audio.png",
    client: "Soundform Research",
    role: "DSP Engineer & Product Designer",
    year: "2024",
    live_url: "https://example.com/neural-audio",
    github_url: "https://github.com/hanslay/neural-audio",
    featured: true,
    order_index: 2,
    published: true,
    case_study_content: `## Bridging Generative Acoustics with Hardware Latency

A study in low-latency WebAudio worklets paired with high-fidelity latent diffusion audio models. The challenge lay in delivering stutter-free 48kHz audio streams inside web runtimes while generating continuous generative variations.
`,
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    slug: "editorial-fintech-ledger-platform",
    title: "Editorial Institutional Ledger & Asset Custody",
    summary: "Cryptographic double-entry accounting engine designed for private investment funds, featuring audit logs and high-density financial typography.",
    category: "Full Stack",
    tags: ["TypeScript", "PostgreSQL", "Next.js", "Docker", "Tailwind"],
    cover_image: "/projects/fintech-ledger.png",
    client: "Veritas Capital Management",
    role: "Full-Stack Architect",
    year: "2023",
    live_url: "https://example.com/ledger",
    github_url: "https://github.com/hanslay/editorial-ledger",
    featured: true,
    order_index: 3,
    published: true,
    case_study_content: `## High-Assurance Financial Engineering

Double-entry transactional safety guaranteed via ACID-compliant ledger partitions, verifiable Merkle proofs, and a restrained, paper-like visual layout designed to reduce analyst cognitive fatigue.
`,
  },
  {
    id: "10000000-0000-0000-0000-000000000004",
    slug: "monochrome-type-system-identity",
    title: "Monochrome Typographic & Design System",
    summary: "A unified digital brand identity, bespoke ligature set, and component specification crafted for engineering publications and developer toolkits.",
    category: "UI/UX Design",
    tags: ["Typography", "Design Systems", "Figma", "Design Tokens", "CSS"],
    cover_image: "/projects/design-system.png",
    client: "Monolith Monospace",
    role: "Creative Director & Type Designer",
    year: "2023",
    live_url: "https://example.com/type-system",
    featured: true,
    order_index: 4,
    published: true,
    case_study_content: `## The Art of Typographic Restraint

An exploration into proportional scales, editorial grids, and tactile warmth. Avoiding synthetic vibrancy in favor of deliberate contrast, balanced leading, and harmonious brown-spectrum neutrals.
`,
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    slug: "building-low-latency-multimodal-agents",
    title: "Building Low-Latency Multimodal Agents with PyTorch and Next.js",
    excerpt: "Architecting zero-overhead token pipelines between PyTorch inference clusters and browser streaming interfaces through Server-Sent Events and WebSockets.",
    content: `## The Quest for Imperceptible Latency

When designing human-AI interfaces, perceived latency is the decisive factor between an uncanny mechanical toy and an amplification of human intellect.

Most multimodal systems incur cumulative overhead at three distinct boundaries:
1. **Model Token-Time-to-First (TTFT)**
2. **Serialization and Cross-Network Ingress**
3. **DOM Hydration and Layout Calculation**

\`\`\`python
# Streaming chunk encoder with minimal memory allocation
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
        return text.encode('utf-8')
\`\`\`

### Architectural Principles

By establishing streaming TCP connections paired with lightweight edge workers, we achieved a sustained TTFT under **180ms** across globally distributed test clients.

### Typography and Interface Elegance

Notice how data is presented: instead of frenetic loading spinners, the interface preserves layout stability through skeleton lines rendered in warm sand hues, honoring the reader's visual focus.
`,
    cover_image: "/blog/latency-agents.png",
    tags: ["AI Systems", "Next.js", "PyTorch", "Architecture"],
    reading_time: "6 min read",
    published: true,
    published_at: "2024-04-12",
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    slug: "engineering-with-aesthetic-conviction",
    title: "Engineering with Aesthetic Conviction: Why Code and Typography Share the Same Soul",
    excerpt: "Why the finest software systems are built not by indifferent mechanics, but by designers who understand memory layouts, and engineers who revere letterforms.",
    content: `## Dual Disciplines, Single Purpose

There exists a pervasive myth in technology that rigorous backend engineering and deliberate aesthetic sensitivity are mutually contradictory pursuits.

In truth, both disciplines are governed by the exact same fundamentals:
- **Economy of Means**: In code, avoid unnecessary indirection. In typography, avoid decorative noise.
- **Rhythm and Cadence**: Functions have visual balance; paragraphs have typographic color.
- **Respect for the Reader**: Whether reading an API specification or an editorial case study, cognitive clarity is paramount.
`,
    cover_image: "/blog/aesthetic-conviction.png",
    tags: ["Philosophy", "Design Systems", "Craftsmanship"],
    reading_time: "5 min read",
    published: true,
    published_at: "2024-03-28",
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    slug: "deterministic-state-machines-in-modern-web",
    title: "Deterministic State Machines in Modern Web Applications",
    excerpt: "Eliminating impossible UI states, race conditions, and uncontrolled rerenders through hierarchical finite state automata.",
    content: `## Eliminating Impossible States

Boolean state flags like \`isLoading\`, \`isError\`, \`isSuccess\` quickly blossom into $2^n$ invalid combinations. Formal statecharts guarantee that transitions only occur along validated edges.
`,
    cover_image: "/blog/state-machines.png",
    tags: ["TypeScript", "Frontend Architecture", "State Machines"],
    reading_time: "8 min read",
    published: true,
    published_at: "2024-02-15",
  },
];

export const initialSkills: Skill[] = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    category: "Core & Systems Architecture",
    name: "TypeScript & Node.js",
    proficiency_notes: "Deep knowledge of runtime semantics, compiler ASTs, and high-performance server architectures.",
    order_index: 1,
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    category: "Core & Systems Architecture",
    name: "Rust & Systems Programming",
    proficiency_notes: "Concurrent actor engines, low-latency IPC, memory safety, and WebAssembly compilation.",
    order_index: 2,
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    category: "Core & Systems Architecture",
    name: "PostgreSQL & Distributed DBs",
    proficiency_notes: "Schema modeling, RLS policies, indexing strategies, vector embeddings, and replication.",
    order_index: 3,
  },
  {
    id: "30000000-0000-0000-0000-000000000004",
    category: "Artificial Intelligence & ML",
    name: "PyTorch & Model Training",
    proficiency_notes: "Fine-tuning transformer models, LoRA adaptations, custom loss functions, and inference optimization.",
    order_index: 4,
  },
  {
    id: "30000000-0000-0000-0000-000000000005",
    category: "Artificial Intelligence & ML",
    name: "Autonomous Agent Orchestration",
    proficiency_notes: "Multi-agent graph scheduling, tool-calling pipelines, guardrail synthesis, and state recovery.",
    order_index: 5,
  },
  {
    id: "30000000-0000-0000-0000-000000000006",
    category: "Artificial Intelligence & ML",
    name: "Vector Retrieval & RAG",
    proficiency_notes: "Hybrid search algorithms, sparse-dense re-ranking, chunking strategies, and semantic routing.",
    order_index: 6,
  },
  {
    id: "30000000-0000-0000-0000-000000000007",
    category: "Design & Creative Direction",
    name: "Editorial Typography & Layout",
    proficiency_notes: "Vertical rhythm, optical kerning, proportional scale harmonies, and publication design.",
    order_index: 7,
  },
  {
    id: "30000000-0000-0000-0000-000000000008",
    category: "Design & Creative Direction",
    name: "Design Systems & Token Design",
    proficiency_notes: "Comprehensive component systems, Figma-to-code token pipelines, accessibility.",
    order_index: 8,
  },
  {
    id: "30000000-0000-0000-0000-000000000009",
    category: "Cloud & Tooling",
    name: "Next.js 14 App Router & React",
    proficiency_notes: "Server Components, streaming SSR, edge middleware, and optimistic caching.",
    order_index: 9,
  },
  {
    id: "30000000-0000-0000-0000-000000000010",
    category: "Cloud & Tooling",
    name: "Docker, Kubernetes & CI/CD",
    proficiency_notes: "Reproducible container environments, automated test matrices, and Vercel edge deployment.",
    order_index: 10,
  },
];

export const initialServices: Service[] = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    title: "AI Architecture & Agentic Systems",
    description: "Designing end-to-end autonomous model pipelines, custom fine-tuning, streaming APIs, and multi-agent DAG execution.",
    deliverables: [
      "Custom inference pipelines & tool integrations",
      "Benchmarking & safety boundary enforcement",
      "Production-ready latency optimization",
      "Interactive monitoring dashboards",
    ],
    order_index: 1,
    active: true,
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    title: "Full-Stack Web Engineering",
    description: "Architecting high-performance web applications with Next.js, TypeScript, PostgreSQL, and resilient edge infrastructure.",
    deliverables: [
      "Zero-compromise App Router architectures",
      "Type-safe database design & migrations",
      "Sub-second load times & Core Web Vitals",
      "Comprehensive automated testing suites",
    ],
    order_index: 2,
    active: true,
  },
  {
    id: "40000000-0000-0000-0000-000000000003",
    title: "Digital Product & Design Systems",
    description: "Crafting minimalist, editorial visual identities, responsive component libraries, and ergonomic user experiences.",
    deliverables: [
      "Design tokens & atomic component libraries",
      "Typographic systems & spatial hierarchies",
      "Figma production assets & prototypes",
      "Interactive micro-interactions & motion",
    ],
    order_index: 3,
    active: true,
  },
];

export const initialSiteSettings: SiteSettings = {
  id: "50000000-0000-0000-0000-000000000001",
  site_title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
  meta_description: "Personal portfolio and technical writing of Hanslay. Exploring autonomous AI architectures, distributed systems, and editorial typography.",
  keywords: ["Hanslay", "Software Engineer", "AI Engineer", "Graphic Designer", "Machine Learning", "Next.js", "TypeScript", "Editorial Design"],
  og_image_url: "/og-image.png",
  contact_email: "hanslay@atelier.dev",
  footer_text: "Crafted with architectural precision, cognitive depth, and typographic conviction.",
  available_for_work: true,
  contact_eyebrow: "Open for Work",
  contact_heading: "Let's Build Together",
  contact_description: "Whether you have a complex AI system to architect, a full-stack product to build, or a design identity to create — every great collaboration starts with a single message.",
  contact_phone: "",
  contact_location: "San Francisco & Remote",
  response_time: "Within 24–48 hours",
  availability_headline: "Available for Select Projects",
  availability_description: "I'm taking on new collaborations for Q4 2024 — AI architecture, full-stack builds, and editorial design commissions.",
  footer_version: "v2.4",
  footer_location: "SF & Remote • Pacific Standard Time",
  footer_copyright: "All rights reserved. Editorial Minimalist Architecture.",
  footer_tech_stack: "Next.js 14 · Supabase · Tailwind",
};
