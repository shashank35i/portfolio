import { LucideIcon, Code2, Terminal, Cpu, Database, LayoutTemplate, Globe, Server, Layers } from "lucide-react";

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
  image: string; // placeholder path
  highlights: string[];
  metrics: string[]; // e.g., "Reduced latency by 40%"
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

export const content = {
  hero: {
    name: "Alex Dev",
    title: "Senior Software Engineer",
    tagline: "Building scalable, high-performance web applications with modern architecture.",
    cta: {
      primary: "View Projects",
      secondary: "Download Resume",
    },
  },
  about: {
    paragraphs: [
      "I'm a product-minded software engineer with a focus on building scalable web applications and intuitive user interfaces. With over 5 years of experience in the JavaScript ecosystem, I bridge the gap between complex backend logic and seamless frontend experiences.",
      "My engineering philosophy is simple: write code that is clean, maintainable, and solves real user problems. I thrive in environments where performance, accessibility, and design details are valued.",
    ],
    now: "Currently exploring WebGL for data visualization and contributing to open-source UI libraries.",
  },
  skills: {
    categories: [
      {
        name: "Frontend",
        skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "Framer Motion", "Three.js"],
        icon: LayoutTemplate
      },
      {
        name: "Backend",
        skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Go", "Docker"],
        icon: Server
      },
      {
        name: "Tools & DevOps",
        skills: ["Git", "AWS", "CI/CD", "Terraform", "Linux", "Vercel"],
        icon: Terminal
      },
      {
        name: "Architecture",
        skills: ["Microservices", "Serverless", "Event-Driven", "REST", "System Design"],
        icon: Layers
      }
    ]
  },
  projects: [
    {
      id: "project-1",
      title: "FinDash Analytics",
      shortDescription: "Real-time financial data visualization platform processing 10k+ events/sec.",
      description: "A comprehensive dashboard for financial analysts to visualize market trends in real-time. Built with performance in mind, it handles high-frequency data updates without UI lag.",
      tags: ["Frontend", "Data"],
      techStack: ["Next.js", "D3.js", "WebSockets", "Redis"],
      role: "Lead Frontend Engineer",
      links: {
        github: "https://github.com/placeholder",
        demo: "https://demo.placeholder.com"
      },
      image: "/assets/project-1.jpg",
      highlights: [
        "Architected the real-time data pipeline using WebSockets and Redis Pub/Sub.",
        "Implemented custom D3.js charts optimized for large datasets.",
      ],
      metrics: ["Reduced load time by 60%", "Handles 10k+ events/sec"],
      caseStudy: {
        problem: "Legacy dashboard was slow and couldn't handle real-time market volatility.",
        approach: "Decoupled the UI from direct API polling, moving to a push-based WebSocket architecture.",
        results: ["Zero-latency updates", "Improved user retention by 25%"],
        learnings: ["Optimizing React rendering cycles is critical for high-frequency data apps."]
      }
    },
    {
      id: "project-2",
      title: "CloudScale CI",
      shortDescription: "Distributed CI/CD pipeline orchestrator reducing build times by 40%.",
      description: "A custom CI/CD orchestration tool designed to run parallel builds across a fleet of ephemeral containers.",
      tags: ["Backend", "DevOps"],
      techStack: ["Go", "Docker", "Kubernetes", "gRPC"],
      role: "Backend Engineer",
      links: {
        github: "https://github.com/placeholder",
      },
      image: "/assets/project-2.jpg",
      highlights: [
        "Designed the scheduling algorithm for distributed build jobs.",
        "Built the CLI tool for developers to interact with the pipeline.",
      ],
      metrics: ["Reduced build times by 40%", "99.9% uptime"],
      caseStudy: {
        problem: "Existing CI solutions were too expensive and slow for our microservices monorepo.",
        approach: "Built a lightweight orchestrator in Go that spins up isolated Docker containers for each build step.",
        results: ["Cut CI costs by 50%", "Developer feedback was overwhelmingly positive"],
        learnings: ["Managing ephemeral state in distributed systems requires robust error handling."]
      }
    },
    {
      id: "project-3",
      title: "HealthCore Mobile",
      shortDescription: "Cross-platform mobile app for patient monitoring and telemedicine.",
      description: "A HIPAA-compliant mobile application allowing patients to track vitals and schedule video consultations with doctors.",
      tags: ["Mobile", "Fullstack"],
      techStack: ["React Native", "Node.js", "WebRTC", "PostgreSQL"],
      role: "Fullstack Engineer",
      links: {
        demo: "https://demo.placeholder.com"
      },
      image: "/assets/project-3.jpg",
      highlights: [
        "Implemented secure video calling using WebRTC.",
        "Ensured full accessibility compliance for elderly patients.",
      ],
      metrics: ["4.8/5 App Store rating", "50k+ active users"],
    },
    {
      id: "project-4",
      title: "NeuraSearch",
      shortDescription: "AI-powered semantic search engine for enterprise documentation.",
      description: "An intelligent search interface that uses vector embeddings to understand query intent and retrieve relevant documentation.",
      tags: ["AI", "Backend"],
      techStack: ["Python", "FastAPI", "OpenAI API", "Pinecone"],
      role: "ML Engineer",
      links: {
        github: "https://github.com/placeholder",
        demo: "https://demo.placeholder.com"
      },
      image: "/assets/project-4.jpg",
      highlights: [
        "Integrated vector database for semantic similarity search.",
        "Built a caching layer to reduce API costs.",
      ],
      metrics: ["90% search relevance accuracy", "Sub-200ms response time"],
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechFlow Systems",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      description: [
        "Leading the frontend infrastructure team, migrating legacy apps to Next.js.",
        "Established design system guidelines used by 20+ developers.",
        "Mentoring junior engineers and conducting code reviews."
      ],
      skills: ["React", "Next.js", "TypeScript", "GraphQL"]
    },
    {
      id: "exp-2",
      company: "DataSphere Inc.",
      role: "Software Engineer",
      period: "2020 - 2022",
      description: [
        "Built and maintained high-throughput API services in Node.js.",
        "Optimized database queries reducing reporting latency by 70%.",
        "Collaborated with product team to launch 3 major features."
      ],
      skills: ["Node.js", "PostgreSQL", "Redis", "Docker"]
    },
    {
      id: "exp-3",
      company: "StartUp Lab",
      role: "Junior Developer",
      period: "2018 - 2020",
      description: [
        "Developed responsive UI components for the main e-commerce platform.",
        "Assisted in migrating the monolith backend to microservices.",
      ],
      skills: ["React", "Redux", "Express", "MongoDB"]
    }
  ],
  contact: {
    email: "hello@alexdev.com",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
};
