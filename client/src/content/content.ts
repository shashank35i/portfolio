import {
  LucideIcon,
  LayoutTemplate,
  Server,
  Terminal,
  Layers,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  tags: string[];
  techStack: string[];
  role: string;
  links: {
    github?: string;
    demo?: string;
  };
  image: string;
  highlights: string[];
  metrics: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    architecture?: string;
    results: string[];
    learnings: string[];
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

type SkillCategory = {
  name: string;
  skills: string[];
  icon: LucideIcon;
};

export const content = {
  hero: {
    name: "Shashank Preetham",
    title: "Full-Stack Engineer",
    tagline:
      "I build production-ready web platforms end-to-end: architecture, APIs, data modeling, deployment, and clean UX.",
    cta: {
      primary: "View Projects",
      secondary: "Download Resume",
    },
  },
  about: {
    paragraphs: [
      "I focus on practical full-stack engineering: turning product ideas into shipped systems with reliable backend workflows and professional frontend UX.",
      "My recent work includes multi-role healthcare and ops automation platforms with role-based access, event-driven modules, cloud deployment, and end-to-end integration testing.",
    ],
    now: "Currently improving distributed workflow reliability, platform observability, and enterprise-grade UI systems.",
  },
  skills: {
    categories: [
      {
        name: "Frontend",
        skills: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Framer Motion",
          "Playwright",
        ],
        icon: LayoutTemplate,
      },
      {
        name: "Backend",
        skills: [
          "Node.js",
          "Express",
          "REST APIs",
          "Python",
          "FastAPI",
          "JWT/Auth",
        ],
        icon: Server,
      },
      {
        name: "Data & Infra",
        skills: [
          "MySQL",
          "MongoDB",
          "Redis",
          "Docker",
          "Railway",
          "Cloudflare Pages",
        ],
        icon: Terminal,
      },
      {
        name: "Architecture",
        skills: [
          "Role-Based Access",
          "Event-Driven Flows",
          "Caching Strategy",
          "Schema Design",
          "CI/CD",
          "Performance Tuning",
        ],
        icon: Layers,
      },
    ] as SkillCategory[],
  },
  projects: [
    {
      id: "dentraos",
      title: "DentraOS",
      shortDescription:
        "Multi-role dental clinic platform with appointments, treatment cases, billing, inventory, and agent-assisted operations.",
      description:
        "Built a production-style healthcare workflow system with Admin, Doctor, and Patient portals. Designed schema-aligned backend modules, protected role routing, and integrated agent-like workflows for notifications, events, and clinic operations.",
      tags: ["Full Stack", "Healthcare", "System Design"],
      techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "MySQL",
        "Docker",
        "Railway",
      ],
      role: "Full-Stack Developer",
      links: {
        github: "https://github.com/shashank35i/DentraOS",
      },
      image: "/projects/dentraos-demo.gif",
      highlights: [
        "Implemented multi-role authorization and protected route composition for Admin/Doctor/Patient journeys.",
        "Aligned backend APIs and SQL schema to support appointments, cases, billing, and inventory workflows.",
        "Added operational modules for notifications, event queues, clinic settings, and audit-friendly flows.",
        "Deployed cloud-ready stack and resolved CORS, SMTP, DB connectivity, and environment parity issues.",
      ],
      metrics: [
        "3 role-specific portals",
        "25+ core relational tables",
        "End-to-end deployed on cloud",
      ],
      caseStudy: {
        problem:
          "Manual clinic operations create fragmented patient data, scheduling friction, and weak visibility across teams.",
        approach:
          "I designed a single full-stack platform with a normalized schema, modular APIs, role-scoped UI layouts, and event-based utility modules to centralize clinical operations.",
        results: [
          "Unified appointment-to-billing lifecycle",
          "Role-safe workflows across all portals",
          "Cloud deployment with reproducible setup",
        ],
        learnings: [
          "Schema/API parity is the highest leverage area in full-stack systems.",
          "Operational reliability depends on environment discipline and observability hooks.",
        ],
      },
    },
    {
      id: "opspilot-ai",
      title: "OpsPilot AI",
      shortDescription:
        "Enterprise-style incident command platform with SLA timers, ownership workflows, analytics, and cache-backed API performance.",
      description:
        "Built a modern ops platform for incident triage and response coordination. Implemented incident lifecycle features, search/filter capabilities, role-aware views, health observability, and caching integration with Redis.",
      tags: ["Full Stack", "SaaS", "Operations"],
      techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "Railway",
      ],
      role: "Full-Stack Developer",
      links: {
        github: "https://github.com/shashank35i/OpsPilot-AI",
      },
      image: "/projects/opspilot-demo.mp4",
      highlights: [
        "Implemented SLA-aware incident boards with status, priority, and timeline handling.",
        "Added Redis-backed cache paths and client-side caching to reduce repeated fetch cost.",
        "Created health/debug surface to track service status and runtime diagnostics.",
        "Shipped responsive UI with structured information architecture and production deployment workflow.",
      ],
      metrics: [
        "Sub-second cached responses on repeated views",
        "Mongo + Redis + API orchestration",
        "Railway + Cloudflare deployment workflow",
      ],
      caseStudy: {
        problem:
          "Incident teams need a single command surface for triage, ownership, and SLA visibility, but data and actions are often fragmented.",
        approach:
          "I built a role-aware incident platform with clean domain models, optimized fetch/caching strategy, and an enterprise dashboard UX for high-signal workflows.",
        results: [
          "Single workspace for triage-to-resolution",
          "Improved perceived performance with layered caching",
          "Cloud deploy path ready for recruiter demos",
        ],
        learnings: [
          "Cache strategy is as important as raw query performance for UI responsiveness.",
          "Developer-facing health endpoints speed up deployment debugging significantly.",
        ],
      },
    },
    {
      id: "farmledger-backend",
      title: "FarmLedger Backend",
      shortDescription:
        "Backend service for domain workflows with API modules, data persistence, and deployment-ready service structure.",
      description:
        "Implemented backend modules for business workflows with secure API boundaries, schema operations, environment configuration, and cloud deployment readiness.",
      tags: ["Backend", "API", "Deployment"],
      techStack: ["Node.js", "Express", "MySQL", "Docker", "Railway"],
      role: "Backend Developer",
      links: {
        github: "https://github.com/shashank35i/FarmLedger-Backend",
      },
      image: "/projects/farmledger-demo.mp4",
      highlights: [
        "Modularized API handlers for maintainability and faster iteration.",
        "Added deployment-safe environment configuration and startup validation.",
        "Structured data access logic for predictable behavior under load.",
      ],
      metrics: [
        "Service-first backend architecture",
        "Cloud-deployable runtime",
        "Environment-driven configuration",
      ],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "9X IT Solutions",
      role: "Software Engineer Intern",
      period: "Oct 2025 - Dec 2025",
      description: [
        "Developed and optimized Java-based RESTful microservices handling 1,000+ daily requests.",
        "Reduced average response time by ~25% using payload simplification, pagination, and controller-level improvements.",
        "Improved MySQL query performance by ~15-20% via indexing, query refactors, and join optimization.",
        "Built reusable authentication and authorization modules (token/session checks and role-based access) shared across services.",
      ],
      skills: ["Java", "REST APIs", "MySQL", "AuthN/AuthZ", "Microservices"],
    },
    {
      id: "exp-2",
      company: "Freelance Product Development",
      role: "Full-Stack Developer",
      period: "2024 - Present",
      description: [
        "Built and shipped production-ready web apps including DentraOS and OpsPilot AI.",
        "Designed service boundaries, scalable APIs, and role-based product workflows end-to-end.",
        "Implemented real-time systems with WebSockets and performance-driven frontend architecture.",
        "Handled cloud deployment, environment configuration, and production debugging across full stack.",
      ],
      skills: ["React", "Node.js", "WebSockets", "Cloud Deployment", "System Design"],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.E. in Computer Science and Engineering",
      school: "Saveetha School of Engineering",
      period: "Jul 2022 - Jul 2026",
      details: [
        "CGPA: 8.7 / 10",
        "Coursework: Data Structures & Algorithms, Applied Statistics, Linear Algebra, ML & AI Fundamentals.",
      ],
    },
    {
      id: "edu-2",
      degree: "Intermediate (MPC)",
      school: "Krishnaveni Junior College",
      period: "May 2022",
      details: [
        "CGPA: 9.4 / 10",
      ],
    },
  ],
  recognition: {
    certifications: [
      {
        title: "Oracle Certified Java SE 17 Developer (1Z0-829)",
        issuer: "Oracle",
        year: "2025",
      },
      {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        year: "2025",
      },
    ],
    hackathons: [
      {
        title: "Adobe India Hackathon (Unstop)",
        award: "Round 1 Participant",
        year: "2026",
        summary:
          "Participated as team_alpha in the Online MCQ + Coding round, representing Saveetha Institute of Medical and Technical Sciences.",
      },
      {
        title: "Hack2Hire: AI-Powered Interview Hackathon",
        award: "Participant",
        year: "2026",
        summary:
          "Successfully completed the hackathon organized by UnsaidTalks Education Pvt. Ltd.",
      },
      {
        title: "OfferShield Hackathon",
        award: "Project Participant",
        year: "2026",
        summary:
          "Participated with an OfferShield concept focused on practical hiring and offer-validation workflows.",
      },
    ],
    awards: [
      {
        title: "Complex Systems Builder",
        issuer: "Portfolio Recognition",
        year: "2026",
        summary:
          "Recognized for shipping multi-service, role-based full-stack products with deployment readiness.",
      },
      {
        title: "End-to-End Engineering Focus",
        issuer: "Project Portfolio",
        year: "2025",
        summary:
          "Demonstrated strong ownership from schema design through cloud production deployment.",
      },
    ],
    community: [
      {
        title: "Open Project Maintainer",
        org: "GitHub Portfolio",
        year: "2025 - Present",
        summary:
          "Maintaining and iterating full-stack repositories with deployment docs and architecture notes.",
      },
      {
        title: "Peer Learning Contributor",
        org: "Developer Communities",
        year: "2024 - Present",
        summary:
          "Sharing practical debugging and deployment workflows for Node, React, and cloud hosting.",
      },
    ],
  },
  contact: {
    email: "shashankpendyala3549@gmail.com",
    socials: {
      github: "https://github.com/shashank35i",
      linkedin: "https://www.linkedin.com/in/shashank-preetham",
      twitter: "https://twitter.com/shashank35i",
      leetcode: "https://leetcode.com/shashank35i",
    },
  },
};
