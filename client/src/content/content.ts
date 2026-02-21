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

export interface AndroidProject {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  accent: string;
  screens: string[];
  links?: {
    repo?: string;
    demo?: string;
  };
  featured?: boolean;
}

type SkillCategory = {
  name: string;
  skills: string[];
  icon: LucideIcon;
};

export const content = {
  hero: {
    name: "Shashank Preetham",
    title: "Software Engineer",
    tagline:
      "I build production-ready web platforms end-to-end: architecture, APIs, data modeling, deployment, and clean UX.",
    cta: {
      primary: "View Projects",
      secondary: "Download Resume",
    },
  },
  about: {
    paragraphs: [
      "I build production-grade software systems end-to-end, from product thinking and system design to APIs, data models, deployment, and polished user interfaces.",
      "My core strength is shipping multi-role platforms where backend correctness, role-safe workflows, and frontend clarity must all work together under real constraints.",
      "Recent projects span healthcare, operations, and mobile ecosystems with secure auth, event-driven modules, payment integration, observability surfaces, and cloud-ready architecture.",
    ],
    now: "Currently focused on resilient workflow engines, scalable API contracts, and enterprise UX systems that stay fast and reliable under growth.",
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
        demo: "https://dentraos.pages.dev/",
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
        demo: "https://opspilot-ai.pages.dev/",
      },
      image: "/projects/opspilot-demo.gif",
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
    
  ],
  androidProjects: [
    {
      id: "criticall",
      title: "CritiCall",
      category: "Mobile App",
      description:
        "Multi-role healthcare platform for appointments, consultations, and pharmacy workflows.",
      highlights: [
        "Role-based journeys for Patient, Doctor, Pharmacist, and Admin",
        "Appointment lifecycle with payments, status updates, and consult links",
        "Pharmacy inventory + prescription handling with notifications",
      ],
      tags: ["ANDROID", "KOTLIN", "PHP", "MYSQL", "RAZORPAY"],
      accent: "#0f7f5c",
      screens: [
        "/projects/android/criticall-1.jpeg",
        "/projects/android/criticall-2.jpeg",
        "/projects/android/criticall-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/criticall",
      },
      featured: true,
    },
    {
      id: "docnest",
      title: "DocNest",
      category: "Mobile App",
      description:
        "Local-first document vault with OCR, reminders, and secure sharing.",
      highlights: [
        "Scan/import docs with on-device OCR and category organization",
        "Expiry, warranty, and bill reminders with filters",
        "PIN/biometric lock, auto-lock, and screenshot protection",
      ],
      tags: ["ANDROID", "KOTLIN", "OCR", "CAMERAX", "MATERIAL 3"],
      accent: "#1a6eea",
      screens: [
        "/projects/android/docnest-1.jpeg",
        "/projects/android/docnest-2.jpeg",
        "/projects/android/docnest-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/docnest-android",
      },
    },
    {
      id: "signalfence",
      title: "SignalFence AI",
      category: "Mobile App",
      description:
        "Privacy-first SMS firewall with on-device AI scoring and quarantine.",
      highlights: [
        "Default SMS app with real-time spam/phishing detection",
        "On-device XGBoost + heuristics, no cloud data sharing",
        "Clean Inbox/Blocked separation with feedback loops",
      ],
      tags: ["ANDROID", "KOTLIN", "ONNX", "XGBOOST", "SQLITE"],
      accent: "#2457d6",
      screens: [
        "/projects/android/signalfence-1.jpeg",
        "/projects/android/signalfence-2.jpeg",
        "/projects/android/signalfence-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/signalfence-ai-android",
      },
    },
    {
      id: "farmledger",
      title: "FarmLedger",
      category: "Mobile App",
      description:
        "QR-first traceability app for farm-to-shelf custody tracking.",
      highlights: [
        "Role-based flows for Farmer, Distributor, Retailer, Consumer",
        "QR scan + verification with tamper-evident hash trail",
        "Custody handoff tracking with timestamps and location",
      ],
      tags: ["ANDROID", "KOTLIN", "PHP", "HARDHAT", "QR"],
      accent: "#0ea34a",
      screens: [
        "/projects/android/farmledger-1.jpeg",
        "/projects/android/farmledger-2.jpeg",
        "/projects/android/farmledger-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/FarmLedger",
      },
    },
    {
      id: "harborfresh",
      title: "HarborFresh",
      category: "Mobile App",
      description:
        "Multi-role seafood commerce app with onboarding, ordering, and tracking.",
      highlights: [
        "Customer, Seller, Admin flows with KYC onboarding",
        "Catalog, cart, checkout, and delivery slot management",
        "Real-time order tracking and fulfillment updates",
      ],
      tags: ["ANDROID", "KOTLIN", "RETROFIT", "RAZORPAY", "MAPS"],
      accent: "#118ab2",
      screens: [
        "/projects/android/harborfresh-1.jpeg",
        "/projects/android/harborfresh-2.jpeg",
        "/projects/android/harborfresh-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/harborfresh-android",
      },
    },
    {
      id: "nourishnest",
      title: "NourishNest",
      category: "Mobile App",
      description:
        "Baby meal planner with recipes, grocery lists, and feeding guidance.",
      highlights: [
        "Child profile onboarding with age and allergy filters",
        "Daily meal plans with recipe details and nutrition tips",
        "Auto-generated grocery lists and offline recipe cache",
      ],
      tags: ["ANDROID", "JAVA", "FIREBASE", "MATERIAL 3", "LOTTIE"],
      accent: "#f06b4f",
      screens: [
        "/projects/android/nourishnest-1.jpeg",
        "/projects/android/nourishnest-2.jpeg",
        "/projects/android/nourishnest-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/nourishnest-android",
      },
    },
    {
      id: "pulsegrid",
      title: "PulseGrid",
      category: "Mobile App",
      description:
        "Multi-role healthcare app with real-time clinical workflows.",
      highlights: [
        "Role-based flows for Admin, Doctor, Lab Tech, Patient",
        "Firebase RTDB sync for assignments, alerts, and status",
        "Payments + AI utilities with secure data handling",
      ],
      tags: ["ANDROID", "FIREBASE", "TFLITE", "RAZORPAY", "FCM"],
      accent: "#7a5cff",
      screens: [
        "/projects/android/pulsegrid-1.jpeg",
        "/projects/android/pulsegrid-2.jpeg",
        "/projects/android/pulsegrid-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/pulsegrid-android",
      },
    },
    {
      id: "routepulse",
      title: "RoutePulse",
      category: "Mobile App",
      description:
        "Traffic intelligence app with live routing and fuel discovery.",
      highlights: [
        "Live maps with route alternatives and delay summaries",
        "Nearby fuel discovery and alerts feed",
        "Firebase identity + profile with cached routes",
      ],
      tags: ["ANDROID", "JAVA", "MAPS API", "FIREBASE", "DIRECTIONS"],
      accent: "#f59e0b",
      screens: [
        "/projects/android/routepulse-1.jpeg",
        "/projects/android/routepulse-2.jpeg",
        "/projects/android/routepulse-3.jpeg",
      ],
      links: {
        repo: "https://github.com/shashank35i/routepulse-android",
      },
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
      linkedin: "https://www.linkedin.com/in/shashank35i/",
      leetcode: "https://leetcode.com/u/shashank3549/",
    },
  },
};
