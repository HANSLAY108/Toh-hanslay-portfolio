/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  Cpu,
  Code2,
  Palette,
  Cloud,
  Database,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillLogoProps {
  name: string;
  category?: string;
  className?: string;
}

/**
 * Maps keywords in a skill name to official Devicon / SimpleIcons SVG URLs.
 * Whenever a user adds any language, framework, database, AI library, or design tool,
 * its logo is automatically resolved and displayed.
 */
const TECH_ICON_MAP: Array<{ keywords: string[]; iconUrl: string; label: string }> = [
  // Languages
  {
    keywords: ["typescript", "ts"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    label: "TypeScript",
  },
  {
    keywords: ["javascript", "js", "ecmascript"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    label: "JavaScript",
  },
  {
    keywords: ["rust", "cargo"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    label: "Rust",
  },
  {
    keywords: ["python"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    label: "Python",
  },
  {
    keywords: ["golang", "go "],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
    label: "Go",
  },
  {
    keywords: ["c++", "cpp"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    label: "C++",
  },
  {
    keywords: ["c#", "csharp", ".net", "dotnet"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    label: "C#",
  },
  {
    keywords: ["java"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    label: "Java",
  },
  {
    keywords: ["kotlin"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    label: "Kotlin",
  },
  {
    keywords: ["swift"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    label: "Swift",
  },
  {
    keywords: ["dart", "flutter"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    label: "Flutter",
  },
  {
    keywords: ["php", "laravel"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    label: "PHP",
  },
  {
    keywords: ["ruby", "rails"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
    label: "Ruby",
  },
  {
    keywords: ["solidity", "web3", "ethereum"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg",
    label: "Solidity",
  },
  {
    keywords: ["html", "html5"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    label: "HTML5",
  },
  {
    keywords: ["css", "css3", "sass", "scss"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    label: "CSS3",
  },

  // Frameworks & Runtimes
  {
    keywords: ["next.js", "nextjs", "next "],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    label: "Next.js",
  },
  {
    keywords: ["react", "react.js", "reactjs", "react native"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    label: "React",
  },
  {
    keywords: ["node.js", "nodejs", "node ", "express"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    label: "Node.js",
  },
  {
    keywords: ["vue", "vue.js", "vuejs", "nuxt"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    label: "Vue",
  },
  {
    keywords: ["angular"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
    label: "Angular",
  },
  {
    keywords: ["svelte", "sveltekit"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
    label: "Svelte",
  },
  {
    keywords: ["tailwind", "tailwindcss"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    label: "Tailwind CSS",
  },
  {
    keywords: ["fastapi"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    label: "FastAPI",
  },
  {
    keywords: ["django"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    label: "Django",
  },
  {
    keywords: ["flask"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    label: "Flask",
  },
  {
    keywords: ["graphql", "apollo"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    label: "GraphQL",
  },

  // AI / ML
  {
    keywords: ["pytorch", "torch", "model training", "lora", "transformer"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    label: "PyTorch",
  },
  {
    keywords: ["tensorflow", "keras"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    label: "TensorFlow",
  },
  {
    keywords: ["pandas", "numpy", "scikit", "data science"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    label: "NumPy",
  },
  {
    keywords: ["opencv", "computer vision"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
    label: "OpenCV",
  },

  // Databases & Storage
  {
    keywords: ["postgresql", "postgres", "sql", "distributed db"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    label: "PostgreSQL",
  },
  {
    keywords: ["supabase"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    label: "Supabase",
  },
  {
    keywords: ["mongodb", "mongo"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    label: "MongoDB",
  },
  {
    keywords: ["redis"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    label: "Redis",
  },
  {
    keywords: ["mysql", "mariadb"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    label: "MySQL",
  },
  {
    keywords: ["firebase"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    label: "Firebase",
  },
  {
    keywords: ["prisma"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    label: "Prisma",
  },

  // Cloud, DevOps & Infrastructure
  {
    keywords: ["docker", "container"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    label: "Docker",
  },
  {
    keywords: ["kubernetes", "k8s"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    label: "Kubernetes",
  },
  {
    keywords: ["aws", "amazon web services"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    label: "AWS",
  },
  {
    keywords: ["gcp", "google cloud"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    label: "Google Cloud",
  },
  {
    keywords: ["azure"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    label: "Azure",
  },
  {
    keywords: ["vercel"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    label: "Vercel",
  },
  {
    keywords: ["git", "github", "ci/cd"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    label: "Git",
  },
  {
    keywords: ["linux", "bash", "unix"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    label: "Linux",
  },

  // Design & Creative
  {
    keywords: ["figma", "design systems", "token design", "ui/ux", "prototyping"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    label: "Figma",
  },
  {
    keywords: ["Three.js", "threejs", "webgl"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    label: "Three.js",
  },
  {
    keywords: ["blender", "3d"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
    label: "Blender",
  },
  {
    keywords: ["photoshop", "adobe"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
    label: "Photoshop",
  },
  {
    keywords: ["illustrator"],
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg",
    label: "Illustrator",
  },
];

function resolveLogosFromSkillName(name: string): Array<{ url: string; label: string }> {
  const lower = ` ${name.toLowerCase()} `;
  const matches: Array<{ url: string; label: string }> = [];

  for (const item of TECH_ICON_MAP) {
    if (item.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      if (!matches.some((m) => m.url === item.iconUrl)) {
        matches.push({ url: item.iconUrl, label: item.label });
      }
    }
  }

  // If no explicit match in dictionary, try clean single-word Devicon slug lookup
  if (matches.length === 0) {
    const firstWord = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
    if (firstWord.length >= 2 && firstWord.length <= 16) {
      matches.push({
        url: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${firstWord}/${firstWord}-original.svg`,
        label: name,
      });
    }
  }

  return matches.slice(0, 2);
}

export function SkillLogo({ name, category, className }: SkillLogoProps) {
  const logos = resolveLogosFromSkillName(name);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});

  const validLogos = logos.filter((l) => !failedUrls[l.url]);
  const lowerName = name.toLowerCase();

  // Fallback lucide icon when a skill is conceptual (e.g., "Editorial Typography", "Autonomous Agent Orchestration", "Vector Retrieval & RAG")
  const renderConceptualIcon = () => {
    if (
      lowerName.includes("agent") ||
      lowerName.includes("llm") ||
      lowerName.includes("ai") ||
      lowerName.includes("neural")
    ) {
      return <Sparkles className="w-4 h-4 text-[#7d6657]" />;
    }
    if (
      lowerName.includes("vector") ||
      lowerName.includes("rag") ||
      lowerName.includes("database") ||
      lowerName.includes("sql")
    ) {
      return <Database className="w-4 h-4 text-[#7d6657]" />;
    }
    if (
      lowerName.includes("typography") ||
      lowerName.includes("editorial") ||
      lowerName.includes("design") ||
      category?.includes("Design")
    ) {
      return <Palette className="w-4 h-4 text-[#7d6657]" />;
    }
    if (
      lowerName.includes("cloud") ||
      lowerName.includes("deploy") ||
      category?.includes("Cloud")
    ) {
      return <Cloud className="w-4 h-4 text-[#7d6657]" />;
    }
    if (lowerName.includes("system") || lowerName.includes("architecture")) {
      return <Cpu className="w-4 h-4 text-[#7d6657]" />;
    }
    if (lowerName.includes("layer") || lowerName.includes("stack")) {
      return <Layers className="w-4 h-4 text-[#7d6657]" />;
    }
    if (category?.includes("Core")) {
      return <Terminal className="w-4 h-4 text-[#7d6657]" />;
    }
    return <Code2 className="w-4 h-4 text-[#7d6657]" />;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0 rounded-xl bg-white border border-[#e8e2d9] shadow-xs",
        validLogos.length > 1 ? "px-2 h-9 gap-1.5" : "w-9 h-9",
        className
      )}
      title={name}
    >
      {validLogos.length > 0 ? (
        validLogos.map((logo) => (
          <img
            key={logo.url}
            src={logo.url}
            alt={logo.label}
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain"
            onError={() =>
              setFailedUrls((prev) => ({ ...prev, [logo.url]: true }))
            }
          />
        ))
      ) : (
        renderConceptualIcon()
      )}
    </div>
  );
}

