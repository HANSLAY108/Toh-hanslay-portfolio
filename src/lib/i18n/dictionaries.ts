import { Locale } from "@/types/database";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr"];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}

export function localizeField<T extends object>(
  item: T,
  field: keyof T & string,
  locale: Locale
): string {
  const rec = item as Record<string, unknown>;
  if (locale === "fr") {
    const frVal = rec[`${field}_fr`];
    if (typeof frVal === "string" && frVal.trim().length > 0) {
      return frVal;
    }
  }
  const enVal = rec[field];
  return typeof enVal === "string" ? enVal : "";
}

export function localizeList<T extends object>(
  item: T,
  field: keyof T & string,
  locale: Locale
): string[] {
  const rec = item as Record<string, unknown>;
  if (locale === "fr") {
    const frVal = rec[`${field}_fr`];
    if (Array.isArray(frVal) && frVal.length > 0) {
      return frVal as string[];
    }
  }
  const enVal = rec[field];
  return Array.isArray(enVal) ? (enVal as string[]) : [];
}

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      available: "Available",
      bookCall: "Book a call",
      letsTalk: "Let's Talk",
      languageLabel: "Language",
    },
    home: {
      viewWork: "View My Work",
      downloadCv: "Download CV",
      bookCall: "Book a Call",
      yearsExp: "Years Exp.",
      projectsShipped: "Projects Shipped",
      designAwards: "Design Awards",
      modelsDeployed: "Models Deployed",
      featuredWorkEyebrow: "Featured Work",
      selectedProjectsTitle: "Selected Projects",
      viewAllProjects: "View all projects",
      whatIDoEyebrow: "What I Do",
      disciplinesTitle: "Services & Capabilities",
      fromTheJournalEyebrow: "From the Journal",
      latestWritingTitle: "Recent Technical Writing",
      readAllArticles: "Read all articles",
      ctaEyebrow: "Available for Q4 2024 – 2025",
      ctaHeading: "Have an ambitious system or brand to build?",
      ctaBody:
        "Whether you need an autonomous AI pipeline, a resilient full-stack application, or an editorial design system — let's architect it with precision.",
      startConversation: "Start a Conversation",
      scheduleCall: "Book a Call on Cal.com",
    },
    roles: {
      all: "All",
      Software: "Software",
      AI: "AI",
      Design: "Design",
    },
    projects: {
      eyebrow: "Selected Work & Case Studies",
      title: "Engineering & Design Archive",
      description:
        "Production systems, autonomous AI engines, and typographic design systems built with architectural rigor.",
      filterByRole: "Filter by discipline",
      noProjects: "No projects match this filter yet.",
      allProjects: "All Projects",
      client: "Client",
      role: "Role",
      timeline: "Timeline",
      year: "Year",
      liveDemo: "Live Demo",
      sourceCode: "GitHub Source",
      outcomesEyebrow: "Quantified Outcomes",
      outcomesTitle: "Impact & Key Results",
      chapterProblem: "01 / The Problem",
      chapterProcess: "02 / Architecture & Process",
      chapterSolution: "03 / The Solution",
      techStackEyebrow: "System Specifications",
      techStackTitle: "Technology Stack & Tooling",
      deepDiveEyebrow: "Technical Deep Dive",
      nextProject: "Next Case Study",
      readCaseStudy: "Read Case Study",
    },
    about: {
      eyebrow: "Engineering Philosophy & CV",
      downloadResume: "Download Full CV",
      coreValuesEyebrow: "Principles",
      coreValuesTitle: "Engineering & Aesthetic Conviction",
      skillsEyebrow: "Technical Matrix",
      skillsTitle: "Languages, Frameworks & Systems",
      servicesEyebrow: "Advisory & Execution",
      servicesTitle: "Engagement Models",
      deliverables: "Key Deliverables",
    },
    blog: {
      eyebrow: "Technical Writing & Research",
      title: "The Atelier Journal",
      description:
        "Essays and technical notes on distributed systems, multimodal AI agents, state machines, and typographic craft.",
      searchPlaceholder: "Search articles by title or topic…",
      allTopics: "All",
      noArticles: "No articles match your filter.",
      backToJournal: "Back to Journal",
      publishedOn: "Published",
      shareArticle: "Share Article",
    },
    contact: {
      sendMessageTitle: "Send a Direct Message",
      bookCallTitle: "Schedule a Discovery Call",
      bookCallSubtitle:
        "Prefer a live conversation? Pick a time slot directly on my calendar via Cal.com.",
      bookCallButton: "Open Cal.com Scheduler",
      emailLabel: "Email",
      phoneLabel: "Phone / WhatsApp",
      locationLabel: "Location",
      responseTimeLabel: "Response Time",
      currentlyBooked: "Currently Booked",
      bookedDescription:
        "Engagement calendar is currently full. Feel free to reach out for future opportunities.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "Ada Lovelace",
        emailLabel: "Email Address",
        emailPlaceholder: "ada@analytical.engine",
        subjectLabel: "Subject / Project Scope",
        subjectPlaceholder: "AI System Architecture / Full-Stack Product",
        messageLabel: "Project Brief & Timeline",
        messagePlaceholder: "Tell me about your goals, timeline, and technical requirements…",
        submit: "Transmit Message",
        submitting: "Transmitting…",
        successTitle: "Message Received",
        successBody: "Thank you for reaching out. I will review your note and respond within 24–48 hours.",
        sendAnother: "Send another message",
      },
    },
    footer: {
      navigation: "Navigation",
      selectedWork: "Selected Work & Case Studies",
      philosophyCv: "Engineering Philosophy & CV",
      technicalWriting: "Technical Writing & Research",
      initiateConversation: "Initiate a Conversation",
      connectSignals: "Connect & Signals",
      githubDesc: "GitHub — Code Repositories",
      twitterDesc: "X / Twitter — Thoughts & Releases",
      linkedinDesc: "LinkedIn — Professional Network",
      readcvDesc: "Read.cv — Design Portfolio",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      about: "À propos",
      blog: "Journal",
      contact: "Contact",
      available: "Disponible",
      bookCall: "Réserver un appel",
      letsTalk: "Discutons",
      languageLabel: "Langue",
    },
    home: {
      viewWork: "Voir mes projets",
      downloadCv: "Télécharger le CV",
      bookCall: "Réserver un appel",
      yearsExp: "Années d'exp.",
      projectsShipped: "Projets livrés",
      designAwards: "Prix de design",
      modelsDeployed: "Modèles déployés",
      featuredWorkEyebrow: "Réalisations Phares",
      selectedProjectsTitle: "Projets Sélectionnés",
      viewAllProjects: "Voir tous les projets",
      whatIDoEyebrow: "Expertises",
      disciplinesTitle: "Services & Compétences",
      fromTheJournalEyebrow: "Du Journal",
      latestWritingTitle: "Écrits Techniques Récents",
      readAllArticles: "Lire tous les articles",
      ctaEyebrow: "Disponible pour 2024 – 2025",
      ctaHeading: "Vous avez un système ambitieux ou une marque à bâtir ?",
      ctaBody:
        "Qu'il s'agisse d'un pipeline d'IA autonome, d'une application full-stack résiliente ou d'un système de design éditorial — concevons-le avec rigueur.",
      startConversation: "Démarrer une discussion",
      scheduleCall: "Réserver un appel Cal.com",
    },
    roles: {
      all: "Tous",
      Software: "Logiciel",
      AI: "IA",
      Design: "Design",
    },
    projects: {
      eyebrow: "Travaux Sélectionnés & Études de Cas",
      title: "Archives d'Ingénierie & Design",
      description:
        "Systèmes de production, moteurs d'IA autonomes et systèmes typographiques conçus avec rigueur architecturale.",
      filterByRole: "Filtrer par discipline",
      noProjects: "Aucun projet ne correspond à ce filtre pour le moment.",
      allProjects: "Tous les projets",
      client: "Client",
      role: "Rôle",
      timeline: "Durée",
      year: "Année",
      liveDemo: "Démo Live",
      sourceCode: "Code GitHub",
      outcomesEyebrow: "Résultats Quantifiés",
      outcomesTitle: "Impact & Métriques Clés",
      chapterProblem: "01 / Le Problème",
      chapterProcess: "02 / Architecture & Processus",
      chapterSolution: "03 / La Solution",
      techStackEyebrow: "Spécifications Techniques",
      techStackTitle: "Stack Technologique & Outils",
      deepDiveEyebrow: "Analyse Technique Approfondie",
      nextProject: "Étude de Cas Suivante",
      readCaseStudy: "Lire l'étude de cas",
    },
    about: {
      eyebrow: "Philosophie d'Ingénierie & CV",
      downloadResume: "Télécharger le CV Complet",
      coreValuesEyebrow: "Principes",
      coreValuesTitle: "Conviction Technique & Esthétique",
      skillsEyebrow: "Matrice Technique",
      skillsTitle: "Langages, Frameworks & Systèmes",
      servicesEyebrow: "Conseil & Exécution",
      servicesTitle: "Modes d'Intervention",
      deliverables: "Livrables Clés",
    },
    blog: {
      eyebrow: "Écrits Techniques & Recherche",
      title: "Le Journal de l'Atelier",
      description:
        "Essais et notes techniques sur les systèmes distribués, les agents IA multimodaux, les machines à états et l'art typographique.",
      searchPlaceholder: "Rechercher un article par titre ou sujet…",
      allTopics: "Tous",
      noArticles: "Aucun article ne correspond à votre recherche.",
      backToJournal: "Retour au Journal",
      publishedOn: "Publié le",
      shareArticle: "Partager l'article",
    },
    contact: {
      sendMessageTitle: "Envoyer un Message Direct",
      bookCallTitle: "Planifier un Appel Découverte",
      bookCallSubtitle:
        "Vous préférez échanger de vive voix ? Réservez directement un créneau sur mon calendrier via Cal.com.",
      bookCallButton: "Ouvrir le calendrier Cal.com",
      emailLabel: "E-mail",
      phoneLabel: "Téléphone / WhatsApp",
      locationLabel: "Localisation",
      responseTimeLabel: "Délai de réponse",
      currentlyBooked: "Calendrier Complet",
      bookedDescription:
        "Mon calendrier d'intervention est actuellement complet. N'hésitez pas à me contacter pour de futures collaborations.",
      form: {
        nameLabel: "Votre Nom",
        namePlaceholder: "Ada Lovelace",
        emailLabel: "Adresse E-mail",
        emailPlaceholder: "ada@analytical.engine",
        subjectLabel: "Sujet / Périmètre du Projet",
        subjectPlaceholder: "Architecture IA / Produit Full-Stack",
        messageLabel: "Description & Calendrier Souhaité",
        messagePlaceholder: "Décrivez vos objectifs, votre calendrier et vos besoins techniques…",
        submit: "Envoyer le Message",
        submitting: "Envoi en cours…",
        successTitle: "Message Reçu",
        successBody: "Merci pour votre message. Je l'examinerai et vous répondrai sous 24 à 48 heures.",
        sendAnother: "Envoyer un autre message",
      },
    },
    footer: {
      navigation: "Navigation",
      selectedWork: "Travaux Sélectionnés & Études de Cas",
      philosophyCv: "Philosophie d'Ingénierie & CV",
      technicalWriting: "Écrits Techniques & Recherche",
      initiateConversation: "Initier une Conversation",
      connectSignals: "Réseaux & Signaux",
      githubDesc: "GitHub — Dépôts de Code",
      twitterDesc: "X / Twitter — Notes & Publications",
      linkedinDesc: "LinkedIn — Réseau Professionnel",
      readcvDesc: "Read.cv — Portfolio Design",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(locale: Locale = "en") {
  return dictionaries[locale] || dictionaries.en;
}
