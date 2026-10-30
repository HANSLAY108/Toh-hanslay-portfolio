import { Profile, Project, BlogPost, Skill, Service, SiteSettings } from "@/types/database";

export const initialProfile: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  full_name: "Hanslay",
  tagline: "Software Engineer, AI Engineer & Graphic Designer",
  tagline_fr: "Ingénieur Logiciel, Ingénieur IA & Designer Graphique",
  bio: "Engineering high-throughput systems, training domain-specific models, and crafting minimalist interfaces. Dedicated to the convergence of technical rigor, cognitive architecture, and typographic purity.",
  bio_fr:
    "Conception de systèmes distribués à haut débit, entraînement de modèles d'IA spécialisés et création d'interfaces minimalistes. Dédié à la convergence de la rigueur technique, de l'architecture cognitive et de la pureté typographique.",
  hero_photo_url: "/hanslay-portrait.png",
  cv_url: "/hanslay-cv.pdf",
  email: "hanslay@atelier.dev",
  location: "San Francisco & Remote",
  location_fr: "San Francisco & À distance",
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
    title_fr: "Moteur de Workflows d'Agents IA Autonomes",
    summary:
      "Distributed task orchestrator coordinating multi-agent LLM teams with sub-second IPC, checkpointing, and dynamic DAG evaluation.",
    summary_fr:
      "Orchestrateur distribué coordonnant des équipes d'agents LLM avec communication inter-processus ultra-rapide, points de sauvegarde et évaluation dynamique de graphes.",
    category: "AI Systems",
    roles: ["AI", "Software"],
    tags: ["Rust", "PyTorch", "gRPC", "Next.js", "Vector DB"],
    tech_stack: ["Rust", "PyTorch", "Next.js", "TypeScript", "PostgreSQL", "Docker"],
    cover_image: "/projects/ai-workflow.png",
    client: "Atelier AI Labs",
    role: "Lead Architect & UI Designer",
    role_fr: "Architecte Principal & Designer UI",
    timeline: "14 Weeks · Q1–Q2 2024",
    timeline_fr: "14 Semaines · T1–T2 2024",
    year: "2024",
    live_url: "https://example.com/ai-engine",
    github_url: "https://github.com/hanslay/agent-orchestrator",
    problem:
      "Enterprise multi-agent pipelines suffered from cascading hallucinations, unbounded token consumption, and state loss whenever a single worker node timed out during complex 20+ step reasoning chains.",
    problem_fr:
      "Les pipelines multi-agents d'entreprise souffraient d'hallucinations en cascade, d'une consommation de jetons non bornée et de pertes d'état lorsqu'un nœud expirait.",
    process:
      "We designed a deterministic DAG execution protocol in Rust paired with write-ahead snapshot isolation. Each agent turn is validated against strict JSON schemas and budget guardrails before state commits.",
    process_fr:
      "Nous avons conçu un protocole d'exécution DAG déterministe en Rust couplé à une isolation par instantanés. Chaque étape d'agent est validée avant l'engagement d'état.",
    solution:
      "A zero-copy Rust actor runtime communicating with PyTorch inference workers over gRPC, paired with an editorial Next.js 14 observability console streaming token telemetry in real time.",
    solution_fr:
      "Un runtime d'acteurs Rust communiquant avec des workers PyTorch via gRPC, accompagné d'une console d'observabilité Next.js 14 en temps réel.",
    results: [
      { value: "-94%", label: "DAG State Reconciliation Latency", label_fr: "Latence de réconciliation DAG" },
      { value: "< 15ms", label: "Inter-Agent Dispatch Overhead", label_fr: "Surcharge de routage inter-agents" },
      { value: "99.98%", label: "Pipeline Completion Reliability", label_fr: "Fiabilité d'exécution des pipelines" },
      { value: "3.4×", label: "Token Budget Efficiency", label_fr: "Efficacité du budget de tokens" },
    ],
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
    title_fr: "Station de Synthèse Audio Neurale & Formes d'Onde",
    summary:
      "Real-time diffusion-based audio spatializer and synthesis engine with WebAssembly DSP audio buffers and minimalist visual typography.",
    summary_fr:
      "Spatialiseur audio temps réel basé sur la diffusion avec tampons DSP WebAssembly et typographie visuelle minimaliste.",
    category: "AI Systems",
    roles: ["AI", "Software", "Design"],
    tags: ["WebAssembly", "C++", "Diffusion", "Audio DSP", "Tailwind"],
    tech_stack: ["C++", "Rust", "React", "TypeScript", "Tailwind", "PyTorch"],
    cover_image: "/projects/neural-audio.png",
    client: "Soundform Research",
    role: "DSP Engineer & Product Designer",
    role_fr: "Ingénieur DSP & Designer Produit",
    timeline: "10 Weeks · Q4 2023",
    timeline_fr: "10 Semaines · T4 2023",
    year: "2024",
    live_url: "https://example.com/neural-audio",
    github_url: "https://github.com/hanslay/neural-audio",
    problem:
      "Generative audio models required heavy cloud GPU roundtrips that broke creative flow for sound designers needing sub-20ms tactile feedback inside browser-based workstations.",
    problem_fr:
      "Les modèles audio génératifs nécessitaient des allers-retours GPU cloud lourds qui brisaient le flux créatif des designers sonores.",
    process:
      "We quantized latent diffusion decoders for hybrid WebGPU + WebAssembly AudioWorklet execution, separating spectral synthesis from real-time convolution DSP.",
    process_fr:
      "Nous avons quantifié les décodeurs de diffusion latente pour une exécution hybride WebGPU + WebAssembly AudioWorklet.",
    solution:
      "A lock-free ring-buffer audio workstation running at 48kHz in the browser with hardware-inspired rotary controls and high-contrast waveform inspection.",
    solution_fr:
      "Une station audio sans verrouillage fonctionnant à 48kHz dans le navigateur avec des contrôles matériels précis.",
    results: [
      { value: "48 kHz", label: "Zero-Dropout Audio Stream", label_fr: "Flux audio sans perte" },
      { value: "11.4 ms", label: "DSP Buffer Roundtrip Latency", label_fr: "Latence tampon DSP" },
      { value: "-62%", label: "Browser Memory Footprint", label_fr: "Empreinte mémoire navigateur" },
    ],
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
    title_fr: "Grand Livre Institutionnel & Conservation d'Actifs",
    summary:
      "Cryptographic double-entry accounting engine designed for private investment funds, featuring audit logs and high-density financial typography.",
    summary_fr:
      "Moteur comptable cryptographique en partie double conçu pour les fonds d'investissement privés, avec journaux d'audit et typographie financière haute densité.",
    category: "Full Stack",
    roles: ["Software", "Design"],
    tags: ["TypeScript", "PostgreSQL", "Next.js", "Docker", "Tailwind"],
    tech_stack: ["TypeScript", "PostgreSQL", "Next.js", "Node.js", "Docker", "Tailwind"],
    cover_image: "/projects/fintech-ledger.png",
    client: "Veritas Capital Management",
    role: "Full-Stack Architect",
    role_fr: "Architecte Full-Stack",
    timeline: "16 Weeks · 2023",
    timeline_fr: "16 Semaines · 2023",
    year: "2023",
    live_url: "https://example.com/ledger",
    github_url: "https://github.com/hanslay/editorial-ledger",
    problem:
      "Legacy fund administration portals were plagued by race-condition balance discrepancies, opaque audit trails, and cluttered spreadsheet-like interfaces.",
    problem_fr:
      "Les portails d'administration de fonds existants souffraient d'écarts de solde liés aux conditions de concurrence et d'interfaces surchargées.",
    process:
      "We modeled every transaction as an immutable append-only ledger entry with serializable PostgreSQL isolation, cryptographic Merkle proofs, and tabular-numeral typographic grids.",
    process_fr:
      "Nous avons modélisé chaque transaction comme une entrée de journal immuable avec isolation PostgreSQL sérialisable et preuves de Merkle.",
    solution:
      "An institutional-grade treasury and ledger platform capable of processing 12,000+ concurrent ledger entries per second with instant cryptographic audit verification.",
    solution_fr:
      "Une plateforme de trésorerie institutionnelle traitant plus de 12 000 écritures par seconde avec vérification d'audit instantanée.",
    results: [
      { value: "12,400/s", label: "Verified Ledger Writes", label_fr: "Écritures comptables vérifiées" },
      { value: "100%", label: "Audit Trail Determinism", label_fr: "Déterminisme de la piste d'audit" },
      { value: "-47%", label: "Analyst Reconciliation Time", label_fr: "Temps de réconciliation analyste" },
    ],
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
    title_fr: "Système Typographique & Design Monochrome",
    summary:
      "A unified digital brand identity, bespoke ligature set, and component specification crafted for engineering publications and developer toolkits.",
    summary_fr:
      "Une identité de marque numérique unifiée, un jeu de ligatures sur mesure et une spécification de composants conçus pour les publications d'ingénierie.",
    category: "UI/UX Design",
    roles: ["Design", "Software"],
    tags: ["Typography", "Design Systems", "Figma", "Design Tokens", "CSS"],
    tech_stack: ["Figma", "React", "TypeScript", "CSS", "Tailwind"],
    cover_image: "/projects/design-system.png",
    client: "Monolith Monospace",
    role: "Creative Director & Type Designer",
    role_fr: "Directeur Créatif & Designer Typographique",
    timeline: "8 Weeks · 2023",
    timeline_fr: "8 Semaines · 2023",
    year: "2023",
    live_url: "https://example.com/type-system",
    github_url: "https://github.com/hanslay/monochrome-design-system",
    problem:
      "Product teams across four developer tools lacked visual cohesion, shipping inconsistent spacing scales, inaccessible contrast ratios, and fragmented UI components.",
    problem_fr:
      "Les équipes produit manquaient de cohésion visuelle, livrant des échelles d'espacement incohérentes et des composants fragmentés.",
    process:
      "We established a mathematical modular scale rooted in classical Swiss editorial grids, paired with automated Figma-to-CSS token synchronization and accessible warm-neutral palettes.",
    process_fr:
      "Nous avons établi une échelle modulaire mathématique inspirée des grilles éditoriales suisses, avec synchronisation automatique des tokens Figma vers CSS.",
    solution:
      "A 64-component accessible design system and typographic specimen adopted across 4 flagship engineering products with zero runtime CSS overhead.",
    solution_fr:
      "Un système de design accessible de 64 composants adopté sur 4 produits phares sans surcharge CSS au runtime.",
    results: [
      { value: "64+", label: "Accessible UI Primitives", label_fr: "Primitives UI accessibles" },
      { value: "AAA", label: "WCAG Contrast Compliance", label_fr: "Conformité contraste WCAG" },
      { value: "2.8×", label: "Frontend Shipping Velocity", label_fr: "Vélocité de livraison frontend" },
    ],
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
    title_fr: "Concevoir des Agents Multimodaux à Faible Latence avec PyTorch et Next.js",
    excerpt:
      "Architecting zero-overhead token pipelines between PyTorch inference clusters and browser streaming interfaces through Server-Sent Events and WebSockets.",
    excerpt_fr:
      "Architecture de pipelines de tokens sans surcharge entre des clusters d'inférence PyTorch et des interfaces navigateur en streaming.",
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
    reading_time_fr: "6 min de lecture",
    published: true,
    published_at: "2024-04-12",
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    slug: "engineering-with-aesthetic-conviction",
    title: "Engineering with Aesthetic Conviction: Why Code and Typography Share the Same Soul",
    title_fr: "L'Ingénierie avec Conviction Esthétique : Pourquoi le Code et la Typographie Partagent la Même Âme",
    excerpt:
      "Why the finest software systems are built not by indifferent mechanics, but by designers who understand memory layouts, and engineers who revere letterforms.",
    excerpt_fr:
      "Pourquoi les meilleurs systèmes logiciels sont conçus par des ingénieurs qui comprennent la typographie et des designers qui respectent l'architecture système.",
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
    reading_time_fr: "5 min de lecture",
    published: true,
    published_at: "2024-03-28",
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    slug: "deterministic-state-machines-in-modern-web",
    title: "Deterministic State Machines in Modern Web Applications",
    title_fr: "Machines à États Déterministes dans les Applications Web Modernes",
    excerpt:
      "Eliminating impossible UI states, race conditions, and uncontrolled rerenders through hierarchical finite state automata.",
    excerpt_fr:
      "Éliminer les états d'interface impossibles et les conditions de concurrence grâce aux automates à états finis hiérarchiques.",
    content: `## Eliminating Impossible States

Boolean state flags like \`isLoading\`, \`isError\`, \`isSuccess\` quickly blossom into $2^n$ invalid combinations. Formal statecharts guarantee that transitions only occur along validated edges.
`,
    cover_image: "/blog/state-machines.png",
    tags: ["TypeScript", "Frontend Architecture", "State Machines"],
    reading_time: "8 min read",
    reading_time_fr: "8 min de lecture",
    published: true,
    published_at: "2024-02-15",
  },
];

export const initialSkills: Skill[] = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    category: "Core & Systems Architecture",
    category_fr: "Architecture Système & Fondations",
    name: "TypeScript & Node.js",
    proficiency_notes: "Deep knowledge of runtime semantics, compiler ASTs, and high-performance server architectures.",
    proficiency_notes_fr: "Connaissance approfondie de l'exécution, des AST de compilateur et des architectures serveur haute performance.",
    order_index: 1,
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    category: "Core & Systems Architecture",
    category_fr: "Architecture Système & Fondations",
    name: "Rust & Systems Programming",
    proficiency_notes: "Concurrent actor engines, low-latency IPC, memory safety, and WebAssembly compilation.",
    proficiency_notes_fr: "Moteurs d'acteurs concurrents, IPC à faible latence, sûreté mémoire et compilation WebAssembly.",
    order_index: 2,
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    category: "Core & Systems Architecture",
    category_fr: "Architecture Système & Fondations",
    name: "PostgreSQL & Distributed DBs",
    proficiency_notes: "Schema modeling, RLS policies, indexing strategies, vector embeddings, and replication.",
    proficiency_notes_fr: "Modélisation de schémas, politiques RLS, stratégies d'indexation, embeddings vectoriels et réplication.",
    order_index: 3,
  },
  {
    id: "30000000-0000-0000-0000-000000000004",
    category: "Artificial Intelligence & ML",
    category_fr: "Intelligence Artificielle & ML",
    name: "PyTorch & Model Training",
    proficiency_notes: "Fine-tuning transformer models, LoRA adaptations, custom loss functions, and inference optimization.",
    proficiency_notes_fr: "Fine-tuning de modèles Transformer, adaptations LoRA et optimisation d'inférence.",
    order_index: 4,
  },
  {
    id: "30000000-0000-0000-0000-000000000005",
    category: "Artificial Intelligence & ML",
    category_fr: "Intelligence Artificielle & ML",
    name: "Autonomous Agent Orchestration",
    proficiency_notes: "Multi-agent graph scheduling, tool-calling pipelines, guardrail synthesis, and state recovery.",
    proficiency_notes_fr: "Ordonnancement de graphes multi-agents, appels d'outils, garde-fous et récupération d'état.",
    order_index: 5,
  },
  {
    id: "30000000-0000-0000-0000-000000000006",
    category: "Artificial Intelligence & ML",
    category_fr: "Intelligence Artificielle & ML",
    name: "Vector Retrieval & RAG",
    proficiency_notes: "Hybrid search algorithms, sparse-dense re-ranking, chunking strategies, and semantic routing.",
    proficiency_notes_fr: "Algorithmes de recherche hybride, re-ranking dense/épars et routage sémantique.",
    order_index: 6,
  },
  {
    id: "30000000-0000-0000-0000-000000000007",
    category: "Design & Creative Direction",
    category_fr: "Design & Direction Créative",
    name: "Editorial Typography & Layout",
    proficiency_notes: "Vertical rhythm, optical kerning, proportional scale harmonies, and publication design.",
    proficiency_notes_fr: "Rythme vertical, crénage optique, harmonies d'échelles proportionnelles et design éditorial.",
    order_index: 7,
  },
  {
    id: "30000000-0000-0000-0000-000000000008",
    category: "Design & Creative Direction",
    category_fr: "Design & Direction Créative",
    name: "Design Systems & Token Design",
    proficiency_notes: "Comprehensive component systems, Figma-to-code token pipelines, accessibility.",
    proficiency_notes_fr: "Systèmes de composants complets, pipelines de tokens Figma-vers-code et accessibilité.",
    order_index: 8,
  },
  {
    id: "30000000-0000-0000-0000-000000000009",
    category: "Cloud & Tooling",
    category_fr: "Cloud & Outillage",
    name: "Next.js 14 App Router & React",
    proficiency_notes: "Server Components, streaming SSR, edge middleware, and optimistic caching.",
    proficiency_notes_fr: "Server Components, SSR en streaming, middleware edge et mise en cache optimiste.",
    order_index: 9,
  },
  {
    id: "30000000-0000-0000-0000-000000000010",
    category: "Cloud & Tooling",
    category_fr: "Cloud & Outillage",
    name: "Docker, Kubernetes & CI/CD",
    proficiency_notes: "Reproducible container environments, automated test matrices, and Vercel edge deployment.",
    proficiency_notes_fr: "Environnements conteneurisés reproductibles, tests automatisés et déploiement edge.",
    order_index: 10,
  },
];

export const initialServices: Service[] = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    title: "AI Architecture & Agentic Systems",
    title_fr: "Architecture IA & Systèmes Agentiques",
    description:
      "Designing end-to-end autonomous model pipelines, custom fine-tuning, streaming APIs, and multi-agent DAG execution.",
    description_fr:
      "Conception de pipelines de modèles autonomes de bout en bout, fine-tuning sur mesure, APIs en streaming et exécution multi-agents.",
    deliverables: [
      "Custom inference pipelines & tool integrations",
      "Benchmarking & safety boundary enforcement",
      "Production-ready latency optimization",
      "Interactive monitoring dashboards",
    ],
    deliverables_fr: [
      "Pipelines d'inférence sur mesure & intégrations d'outils",
      "Benchmarking & garde-fous de sécurité",
      "Optimisation de latence en production",
      "Tableaux de bord de supervision interactifs",
    ],
    order_index: 1,
    active: true,
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    title: "Full-Stack Web Engineering",
    title_fr: "Ingénierie Web Full-Stack",
    description:
      "Architecting high-performance web applications with Next.js, TypeScript, PostgreSQL, and resilient edge infrastructure.",
    description_fr:
      "Architecture d'applications web haute performance avec Next.js, TypeScript, PostgreSQL et infrastructure edge résiliente.",
    deliverables: [
      "Zero-compromise App Router architectures",
      "Type-safe database design & migrations",
      "Sub-second load times & Core Web Vitals",
      "Comprehensive automated testing suites",
    ],
    deliverables_fr: [
      "Architectures App Router sans compromis",
      "Conception de bases de données typées & migrations",
      "Temps de chargement sub-seconde & Core Web Vitals",
      "Suites de tests automatisés complètes",
    ],
    order_index: 2,
    active: true,
  },
  {
    id: "40000000-0000-0000-0000-000000000003",
    title: "Digital Product & Design Systems",
    title_fr: "Produits Numériques & Systèmes de Design",
    description:
      "Crafting minimalist, editorial visual identities, responsive component libraries, and ergonomic user experiences.",
    description_fr:
      "Création d'identités visuelles éditoriales minimalistes, de bibliothèques de composants responsives et d'expériences ergonomiques.",
    deliverables: [
      "Design tokens & atomic component libraries",
      "Typographic systems & spatial hierarchies",
      "Figma production assets & prototypes",
      "Interactive micro-interactions & motion",
    ],
    deliverables_fr: [
      "Tokens de design & bibliothèques de composants",
      "Systèmes typographiques & hiérarchies spatiales",
      "Assets de production Figma & prototypes",
      "Micro-interactions & animations fluides",
    ],
    order_index: 3,
    active: true,
  },
];

export const initialSiteSettings: SiteSettings = {
  id: "50000000-0000-0000-0000-000000000001",
  site_title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
  site_title_fr: "Hanslay — Ingénieur Logiciel, Ingénieur IA & Designer Graphique",
  meta_description:
    "Personal portfolio and technical writing of Hanslay. Exploring autonomous AI architectures, distributed systems, and editorial typography.",
  meta_description_fr:
    "Portfolio personnel et écrits techniques de Hanslay. Exploration des architectures IA autonomes, des systèmes distribués et de la typographie éditoriale.",
  keywords: [
    "Hanslay",
    "Software Engineer",
    "AI Engineer",
    "Graphic Designer",
    "Machine Learning",
    "Next.js",
    "TypeScript",
    "Editorial Design",
  ],
  og_image_url: "/og-image.png",
  contact_email: "hanslay@atelier.dev",
  cal_com_url: process.env.NEXT_PUBLIC_CAL_COM_URL || "https://cal.com/hanslay/30min",
  footer_text: "Crafted with architectural precision, cognitive depth, and typographic conviction.",
  footer_text_fr: "Conçu avec précision architecturale, profondeur cognitive et conviction typographique.",
  available_for_work: true,
  contact_eyebrow: "Open for Work",
  contact_eyebrow_fr: "Disponible pour Projets",
  contact_heading: "Let's Build Together",
  contact_heading_fr: "Construisons Ensemble",
  contact_description:
    "Whether you have a complex AI system to architect, a full-stack product to build, or a design identity to create — every great collaboration starts with a single message.",
  contact_description_fr:
    "Que vous ayez un système d'IA complexe à architecturer, un produit full-stack à bâtir ou une identité visuelle à créer — chaque grande collaboration commence par un message.",
  contact_phone: "",
  contact_location: "San Francisco & Remote",
  response_time: "Within 24–48 hours",
  response_time_fr: "Sous 24 à 48 heures",
  availability_headline: "Available for Select Projects",
  availability_headline_fr: "Disponible pour des Missions Sélectionnées",
  availability_description:
    "I'm taking on new collaborations for Q4 2024 — AI architecture, full-stack builds, and editorial design commissions.",
  availability_description_fr:
    "J'accepte de nouvelles collaborations — architecture IA, développement full-stack et direction artistique éditoriale.",
  footer_version: "v2.4",
  footer_location: "SF & Remote • Pacific Standard Time",
  footer_copyright: "All rights reserved. Editorial Minimalist Architecture.",
  footer_copyright_fr: "Tous droits réservés. Architecture Minimaliste Éditoriale.",
  footer_tech_stack: "Next.js 14 · Supabase · Tailwind",
};
