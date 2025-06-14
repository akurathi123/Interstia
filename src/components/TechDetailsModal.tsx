
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Briefcase, Lightbulb, X, TrendingUp, Code, Users, Globe, Star, Clock } from "lucide-react";

interface TechDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

const techData = {
  "React": {
    description: "A JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. React allows developers to create reusable UI components and manage application state efficiently.",
    currentTrends: [
      "React 18.3 brings automatic batching and improved concurrent features",
      "Server Components are revolutionizing React architecture",
      "React DevTools now supports time-travel debugging",
      "Remix and Next.js 13+ driving React adoption in enterprise",
      "React Native 0.72 introduces new architecture improvements"
    ],
    news: [
      {
        title: "React 18.3 Performance Optimizations Released",
        content: "Latest update includes significant performance improvements with automatic batching and enhanced concurrent rendering capabilities.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Meta Announces React Compiler",
        content: "Revolutionary compiler that automatically optimizes React applications, reducing the need for manual memoization.",
        date: "Nov 2024", 
        importance: "high"
      },
      {
        title: "React DevTools 5.0 with Enhanced Profiler",
        content: "New profiler features include component flamegraphs and improved performance monitoring tools.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Frontend React Developer",
        salary: "$70,000 - $120,000",
        experience: "1-3 years",
        skills: ["React Hooks", "JSX", "State Management", "CSS/Tailwind"],
        demand: "Very High"
      },
      {
        role: "Senior React Engineer", 
        salary: "$120,000 - $180,000",
        experience: "4-7 years",
        skills: ["Advanced React Patterns", "Performance Optimization", "Team Leadership"],
        demand: "High"
      },
      {
        role: "Full Stack React Developer",
        salary: "$90,000 - $150,000", 
        experience: "2-5 years",
        skills: ["React", "Node.js", "Database Design", "API Development"],
        demand: "Very High"
      },
      {
        role: "React Native Developer",
        salary: "$85,000 - $140,000",
        experience: "2-5 years", 
        skills: ["React Native", "Mobile Development", "Native Modules"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Getting Started",
        items: [
          "Master JavaScript ES6+ features before diving deep into React",
          "Understand the Virtual DOM concept and how React optimizes rendering",
          "Start with Create React App or Vite for quick project setup",
          "Practice with functional components and hooks (useState, useEffect)"
        ]
      },
      {
        category: "Intermediate Skills", 
        items: [
          "Learn state management with Context API or Redux Toolkit",
          "Master React Router for single-page application navigation",
          "Understand component lifecycle and optimization techniques",
          "Practice custom hooks for reusable logic"
        ]
      },
      {
        category: "Advanced Techniques",
        items: [
          "Implement performance optimizations with React.memo and useMemo",
          "Learn React testing with Jest and React Testing Library",
          "Explore Next.js for production-ready applications",
          "Understand Concurrent Features and Suspense for better UX"
        ]
      }
    ],
    usage: {
      industries: ["E-commerce", "Social Media", "Financial Services", "Healthcare", "Education", "Entertainment"],
      companies: ["Facebook", "Netflix", "Airbnb", "Uber", "WhatsApp", "Instagram", "Dropbox"],
      applications: [
        "Single Page Applications (SPAs)",
        "Progressive Web Apps (PWAs)", 
        "Mobile apps with React Native",
        "Desktop applications with Electron",
        "Server-side rendered websites",
        "Component libraries and design systems"
      ]
    },
    statistics: {
      githubStars: "220k+",
      npmDownloads: "20M+ weekly",
      jobPostings: "50,000+ active",
      stackoverflow: "350k+ questions",
      marketShare: "40.14%"
    },
    learningPath: [
      "JavaScript Fundamentals",
      "React Basics & JSX",
      "Components & Props", 
      "State & Lifecycle",
      "Event Handling",
      "Forms & Controlled Components",
      "React Hooks",
      "Context API",
      "React Router",
      "Testing",
      "Performance Optimization"
    ]
  },
  "AI/ML": {
    description: "Artificial Intelligence and Machine Learning represent the cutting edge of computer science, enabling machines to learn, reason, and make decisions. This field combines mathematics, statistics, and computer science to create intelligent systems.",
    currentTrends: [
      "Large Language Models (LLMs) like GPT-4 and Claude revolutionizing AI",
      "Generative AI transforming creative industries and content creation",
      "Edge AI bringing machine learning to mobile and IoT devices",
      "MLOps practices becoming standard for production ML systems",
      "Responsible AI and ethical considerations gaining prominence"
    ],
    news: [
      {
        title: "GPT-4 Turbo with Vision Capabilities",
        content: "OpenAI releases enhanced model with improved reasoning, vision understanding, and reduced costs for API usage.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Google's Gemini Pro Surpasses GPT-4",
        content: "Google's latest multimodal AI model demonstrates superior performance across text, code, audio, image, and video understanding.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Meta's Code Llama 2 Open Source Release",
        content: "Advanced code generation model available for commercial use, supporting 16 programming languages.",
        date: "Nov 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Machine Learning Engineer",
        salary: "$100,000 - $160,000",
        experience: "2-5 years",
        skills: ["Python", "TensorFlow/PyTorch", "MLOps", "Statistics"],
        demand: "Very High"
      },
      {
        role: "Data Scientist",
        salary: "$95,000 - $150,000",
        experience: "1-4 years", 
        skills: ["Python/R", "Statistical Analysis", "Data Visualization", "SQL"],
        demand: "High"
      },
      {
        role: "AI Research Scientist",
        salary: "$140,000 - $250,000",
        experience: "PhD + 2-5 years",
        skills: ["Deep Learning", "Research", "Mathematics", "Publications"],
        demand: "High"
      },
      {
        role: "MLOps Engineer",
        salary: "$110,000 - $170,000",
        experience: "3-6 years",
        skills: ["DevOps", "Cloud Platforms", "ML Pipelines", "Monitoring"],
        demand: "Very High"
      }
    ],
    tips: [
      {
        category: "Mathematics Foundation",
        items: [
          "Master linear algebra, calculus, and statistics fundamentals",
          "Understand probability theory and Bayesian thinking",
          "Learn optimization techniques and gradient descent",
          "Practice with mathematical notation and proofs"
        ]
      },
      {
        category: "Programming Skills",
        items: [
          "Master Python with NumPy, Pandas, and Scikit-learn",
          "Learn TensorFlow or PyTorch for deep learning",
          "Understand data preprocessing and feature engineering",
          "Practice with Jupyter notebooks and data visualization"
        ]
      },
      {
        category: "Practical Experience",
        items: [
          "Work on end-to-end projects from data to deployment",
          "Participate in Kaggle competitions for real-world experience",
          "Build a portfolio showcasing different ML techniques",
          "Contribute to open-source ML projects and communities"
        ]
      }
    ],
    usage: {
      industries: ["Healthcare", "Finance", "Autonomous Vehicles", "Retail", "Manufacturing", "Entertainment"],
      companies: ["Google", "Tesla", "OpenAI", "NVIDIA", "Microsoft", "Amazon", "DeepMind"],
      applications: [
        "Natural Language Processing (ChatGPT, translation)",
        "Computer Vision (image recognition, medical imaging)",
        "Recommendation Systems (Netflix, Amazon, Spotify)",
        "Autonomous Systems (self-driving cars, drones)",
        "Fraud Detection and Risk Assessment",
        "Drug Discovery and Medical Diagnosis"
      ]
    },
    statistics: {
      marketSize: "$136B by 2025",
      jobGrowth: "31% (2019-2029)",
      salaryGrowth: "15% year-over-year",
      researchPapers: "50,000+ annually",
      ventureInvestment: "$13.8B in 2023"
    },
    learningPath: [
      "Python Programming",
      "Statistics & Mathematics",
      "Data Analysis with Pandas",
      "Machine Learning Algorithms",
      "Deep Learning Basics",
      "Neural Networks",
      "Computer Vision/NLP",
      "MLOps & Deployment",
      "Advanced Research Topics"
    ]
  },
  "Web3": {
    description: "Web3 represents the next evolution of the internet, built on blockchain technology to create a decentralized web where users own their data, digital assets, and participate in governance of protocols.",
    currentTrends: [
      "Layer 2 solutions like Arbitrum and Optimism scaling Ethereum",
      "Real World Assets (RWA) tokenization gaining institutional adoption",
      "Account Abstraction making crypto more user-friendly",
      "DeFi 2.0 protocols focusing on sustainability and real yield",
      "Web3 social platforms challenging traditional social media"
    ],
    news: [
      {
        title: "Ethereum's Dencun Upgrade Reduces L2 Costs",
        content: "Major upgrade introduces blob transactions, significantly reducing costs for Layer 2 solutions like Arbitrum and Polygon.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Bitcoin ETFs Reach $50B in Assets",
        content: "Institutional adoption accelerates as Bitcoin ETFs see unprecedented inflows from traditional finance.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "Solana Mobile Saga 2 Pre-orders Exceed 100k",
        content: "Second generation Web3 phone shows growing demand for crypto-native mobile experiences.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Blockchain Developer",
        salary: "$90,000 - $150,000",
        experience: "1-4 years",
        skills: ["Solidity", "Web3.js", "Smart Contracts", "DApp Development"],
        demand: "Very High"
      },
      {
        role: "Smart Contract Auditor",
        salary: "$120,000 - $200,000",
        experience: "3-6 years",
        skills: ["Security Auditing", "Solidity", "DeFi Protocols", "Testing"],
        demand: "Extremely High"
      },
      {
        role: "DeFi Protocol Engineer",
        salary: "$130,000 - $220,000",
        experience: "2-5 years",
        skills: ["DeFi Mechanics", "Tokenomics", "Smart Contracts", "Mathematics"],
        demand: "Very High"
      },
      {
        role: "Web3 Product Manager",
        salary: "$110,000 - $180,000",
        experience: "3-7 years",
        skills: ["Product Strategy", "Tokenomics", "Community Building", "DeFi"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Blockchain Fundamentals",
        items: [
          "Understand how blockchain works: blocks, mining, consensus mechanisms",
          "Learn about different blockchain networks (Ethereum, Solana, Polygon)",
          "Grasp concepts of decentralization, immutability, and trustlessness",
          "Study tokenomics and different token standards (ERC-20, ERC-721, ERC-1155)"
        ]
      },
      {
        category: "Development Skills",
        items: [
          "Master Solidity for Ethereum smart contract development",
          "Learn Hardhat or Foundry for smart contract testing and deployment",
          "Understand Web3.js or Ethers.js for frontend integration",
          "Practice with testnets before deploying to mainnet"
        ]
      },
      {
        category: "DeFi & Security",
        items: [
          "Study major DeFi protocols: Uniswap, Aave, Compound, MakerDAO",
          "Learn about common smart contract vulnerabilities and security best practices",
          "Understand gas optimization techniques for cost-effective contracts",
          "Follow security audits and learn from past exploits"
        ]
      }
    ],
    usage: {
      industries: ["Finance", "Gaming", "Real Estate", "Supply Chain", "Identity", "Entertainment"],
      companies: ["Coinbase", "Binance", "Uniswap", "OpenSea", "Chainlink", "Polygon", "ConsenSys"],
      applications: [
        "Decentralized Finance (DeFi) - lending, borrowing, trading",
        "Non-Fungible Tokens (NFTs) - digital art, collectibles, gaming",
        "Decentralized Autonomous Organizations (DAOs)",
        "Decentralized Identity and Authentication",
        "Supply Chain Transparency and Tracking",
        "Play-to-Earn Gaming and Virtual Worlds"
      ]
    },
    statistics: {
      totalValueLocked: "$50B+ in DeFi",
      dailyTransactions: "1.2M+ on Ethereum",
      developers: "18,000+ active monthly",
      ventureCapital: "$9.2B invested in 2023",
      walletUsers: "120M+ unique addresses"
    },
    learningPath: [
      "Blockchain Basics",
      "Cryptocurrency Fundamentals", 
      "Ethereum & Smart Contracts",
      "Solidity Programming",
      "DApp Development",
      "DeFi Protocols",
      "Security & Auditing",
      "Advanced Topics (L2s, DAOs)",
      "Real-world Projects"
    ]
  },
  "DevOps": {
    description: "A set of practices that combines software development and IT operations to shorten development lifecycle and provide continuous delivery with high software quality.",
    currentTrends: [
      "Kubernetes 1.28 introduces new security features and enhanced scalability",
      "GitOps practices becoming standard in enterprise DevOps workflows",
      "AI-powered monitoring tools gaining traction for predictive analytics"
    ],
    news: [
      {
        title: "Kubernetes 1.28 Security Enhancements",
        content: "New features include enhanced security features, improved resource management, and support for multi-cluster deployments.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "GitOps Adoption in Large Enterprises",
        content: "More organizations are adopting GitOps practices to streamline CI/CD pipelines and improve collaboration.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "AI Monitoring Tools for DevOps",
        content: "AI-powered monitoring tools are becoming more prevalent in DevOps environments to automate and optimize monitoring processes.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "DevOps Engineer",
        salary: "$85,000 - $140,000",
        experience: "1-3 years",
        skills: ["Containerization", "CI/CD Pipelines", "Cloud Platforms", "Infrastructure as Code"],
        demand: "Very High"
      },
      {
        role: "Site Reliability Engineer",
        salary: "$100,000 - $160,000",
        experience: "2-5 years",
        skills: ["Monitoring", "Logging", "Automated Testing", "Performance Optimization"],
        demand: "High"
      },
      {
        role: "Cloud Architect",
        salary: "$120,000 - $180,000",
        experience: "3-7 years",
        skills: ["Cloud Infrastructure Design", "Cloud Security", "Multi-cloud Strategy"],
        demand: "Very High"
      },
      {
        role: "Platform Engineer",
        salary: "$110,000 - $170,000",
        experience: "2-5 years",
        skills: ["Infrastructure as Code", "Monitoring", "Automation", "Platform Design"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Containerization",
        items: [
          "Master Docker and Kubernetes concepts for container orchestration",
          "Learn container orchestration tools like Helm and Kustomize",
          "Understand container lifecycle management and best practices",
          "Practice with container security and optimization techniques"
        ]
      },
      {
        category: "CI/CD Pipelines",
        items: [
          "Learn CI/CD tools like Jenkins, GitLab CI, GitHub Actions",
          "Understand best practices for automated testing and deployment",
          "Practice with containerized applications and microservices",
          "Implement proper branching strategies and release management"
        ]
      },
      {
        category: "Cloud Platforms & Infrastructure",
        items: [
          "Master major cloud platforms: AWS, Azure, and GCP services",
          "Learn Infrastructure as Code with Terraform or CloudFormation",
          "Understand cloud security best practices and compliance",
          "Practice with multi-cloud and hybrid cloud architectures"
        ]
      }
    ],
    usage: {
      industries: ["Technology", "Finance", "Healthcare", "E-commerce", "Gaming", "Telecommunications"],
      companies: ["Google", "Amazon", "Microsoft", "Netflix", "Spotify", "Uber", "Slack"],
      applications: [
        "Continuous Integration and Deployment",
        "Infrastructure Automation and Management",
        "Monitoring and Logging Systems",
        "Container Orchestration and Microservices",
        "Cloud Infrastructure and Migration",
        "Security and Compliance Automation"
      ]
    },
    statistics: {
      marketGrowth: "24.2% CAGR (2021-2028)",
      jobPostings: "45,000+ active",
      averageSalary: "$115,000 annually",
      toolsAdoption: "85% enterprises use CI/CD",
      cloudMigration: "78% workloads in cloud"
    },
    learningPath: [
      "Linux & Command Line",
      "Version Control (Git)",
      "Containerization (Docker)",
      "Container Orchestration (Kubernetes)",
      "Cloud Platforms (AWS/Azure/GCP)",
      "Infrastructure as Code",
      "CI/CD Pipelines",
      "Monitoring & Logging",
      "Security & Compliance"
    ]
  },
  "Design": {
    description: "User Experience and User Interface design focused on creating intuitive, accessible, and visually appealing digital products that solve real user problems.",
    currentTrends: [
      "Design systems becoming crucial for large organizations and consistency",
      "AI tools like Midjourney and Figma AI revolutionizing design workflows",
      "Accessibility standards getting stricter globally with WCAG 2.2"
    ],
    news: [
      {
        title: "Design Systems Adoption in Large Enterprises",
        content: "More organizations are adopting design systems to streamline design processes and improve consistency across projects.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "AI Tools for Design Automation",
        content: "AI tools like Midjourney and Figma AI are becoming more prevalent in design workflows to automate repetitive tasks.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "WCAG 2.2 Accessibility Standards Update",
        content: "New accessibility guidelines are being developed globally to ensure digital products are accessible to all users.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "UX Designer",
        salary: "$70,000 - $120,000",
        experience: "1-3 years",
        skills: ["User Research", "Usability Testing", "Design Tools", "Information Architecture"],
        demand: "Very High"
      },
      {
        role: "UI Designer",
        salary: "$65,000 - $110,000",
        experience: "1-2 years",
        skills: ["UI Design Principles", "Color Theory", "Typography", "Prototyping"],
        demand: "High"
      },
      {
        role: "Product Designer",
        salary: "$90,000 - $140,000",
        experience: "2-5 years",
        skills: ["Product Strategy", "User Experience", "Design Systems", "Cross-functional Collaboration"],
        demand: "Very High"
      },
      {
        role: "Design Systems Lead",
        salary: "$110,000 - $160,000",
        experience: "3-7 years",
        skills: ["Design Systems Architecture", "Team Leadership", "Documentation", "Component Libraries"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "User Research & Testing",
        items: [
          "Master user research methods like interviews, surveys, and usability testing",
          "Understand user personas, journey mapping, and user flows",
          "Practice with user testing tools like UserTesting, Hotjar, and Maze",
          "Learn to analyze and synthesize user feedback into actionable insights"
        ]
      },
      {
        category: "Design Tools & Skills",
        items: [
          "Master design tools like Figma, Sketch, Adobe Creative Suite",
          "Understand design principles: hierarchy, contrast, alignment, repetition",
          "Practice with design prototyping and animation tools",
          "Learn the fundamentals of color theory, typography, and grid systems"
        ]
      },
      {
        category: "Accessibility & Standards",
        items: [
          "Understand accessibility guidelines (WCAG) and inclusive design",
          "Practice with accessibility testing tools like Axe and Lighthouse",
          "Build accessible design systems and component libraries",
          "Learn about assistive technologies and diverse user needs"
        ]
      }
    ],
    usage: {
      industries: ["Technology", "E-commerce", "Healthcare", "Finance", "Education", "Entertainment"],
      companies: ["Apple", "Google", "Airbnb", "Spotify", "Adobe", "Figma", "Dribbble"],
      applications: [
        "Web and Mobile App Design",
        "Design Systems and Component Libraries",
        "User Experience Research and Testing",
        "Brand Identity and Visual Design",
        "Product Strategy and Information Architecture",
        "Accessibility and Inclusive Design"
      ]
    },
    statistics: {
      jobGrowth: "13% (2020-2030)",
      averageSalary: "$95,000 annually",
      designToolsMarket: "$15.6B by 2028",
      companiesWithDesignSystems: "73% of enterprises",
      roiOfDesign: "228% ROI per dollar invested"
    },
    learningPath: [
      "Design Fundamentals",
      "User Research Methods",
      "Design Tools (Figma/Sketch)",
      "UI Design Principles",
      "UX Design Process",
      "Prototyping & Testing",
      "Accessibility & Inclusive Design",
      "Design Systems",
      "Advanced Product Design"
    ]
  },
  "Startup": {
    description: "Early-stage companies focused on developing scalable business models and innovative solutions to market problems with high growth potential.",
    currentTrends: [
      "Venture capital funding reaching record levels in AI and deep tech",
      "Remote-first startups showing higher productivity and global talent access",
      "AI startups attracting major investment rounds and enterprise adoption"
    ],
    news: [
      {
        title: "Venture Capital Funding Reaches New Heights",
        content: "Venture capital funding in tech reaches record levels, supporting a growing number of AI and deep tech startups.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Remote-First Startup Success Stories",
        content: "Remote-first startups are showing higher productivity and efficiency compared to traditional office-based teams.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "AI Startups Dominate Investment Landscape",
        content: "AI startups are attracting major investment rounds, demonstrating the potential for AI-driven innovation and disruption.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Startup Founder",
        salary: "Variable equity-based compensation",
        experience: "1-5 years",
        skills: ["Business Strategy", "Product Development", "Fundraising", "Team Building"],
        demand: "Very High"
      },
      {
        role: "Product Manager",
        salary: "$80,000 - $130,000 + equity",
        experience: "2-5 years",
        skills: ["Product Management", "Market Research", "Agile Methodologies", "Data Analysis"],
        demand: "High"
      },
      {
        role: "Growth Hacker",
        salary: "$70,000 - $120,000 + equity",
        experience: "1-3 years",
        skills: ["Digital Marketing", "SEO/SEM", "Analytics", "A/B Testing"],
        demand: "Very High"
      },
      {
        role: "Venture Capital Analyst",
        salary: "$90,000 - $140,000",
        experience: "2-5 years",
        skills: ["Investment Analysis", "Market Research", "Financial Modeling", "Due Diligence"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Business Strategy & Validation",
        items: [
          "Validate your idea before building the product through customer interviews",
          "Focus on solving real problems for real customers with strong pain points",
          "Build an MVP to test market assumptions quickly and iterate based on feedback",
          "Understand your target market and competition thoroughly"
        ]
      },
      {
        category: "Product Development & Growth",
        items: [
          "Master lean startup methodology and agile development practices",
          "Focus on product-market fit before scaling marketing and sales",
          "Build a strong product roadmap and prioritize features based on user value",
          "Implement data-driven decision making and user analytics"
        ]
      },
      {
        category: "Fundraising & Networking",
        items: [
          "Build a strong network of industry professionals, mentors, and advisors",
          "Understand different funding stages and investor expectations",
          "Create compelling pitch decks and financial projections",
          "Participate in startup communities, accelerators, and industry events"
        ]
      }
    ],
    usage: {
      industries: ["Technology", "FinTech", "HealthTech", "EdTech", "CleanTech", "E-commerce"],
      companies: ["Y Combinator", "Techstars", "500 Startups", "Andreessen Horowitz", "Sequoia Capital", "First Round"],
      applications: [
        "Disruptive Technology Innovation",
        "New Business Model Development",
        "Market Gap Solutions",
        "Scalable Product Development",
        "Venture Capital and Investment",
        "Entrepreneurial Ecosystem Building"
      ]
    },
    statistics: {
      globalStartups: "305M+ startups worldwide",
      successRate: "10% reach Series A",
      averageExit: "$242M acquisition value",
      vcInvestment: "$344B globally in 2023",
      jobCreation: "3M+ jobs annually"
    },
    learningPath: [
      "Business Fundamentals",
      "Market Research & Validation",
      "Lean Startup Methodology",
      "Product Development",
      "Financial Planning & Modeling",
      "Marketing & Growth Hacking",
      "Fundraising & Investment",
      "Team Building & Leadership",
      "Scaling & Operations"
    ]
  },
  "Gaming": {
    description: "Interactive entertainment industry encompassing video game development, esports, mobile gaming, and emerging technologies like VR/AR gaming.",
    currentTrends: [
      "Cloud gaming services expanding globally with 5G infrastructure",
      "VR/AR gaming showing promising growth with new hardware releases",
      "Indie games gaining mainstream recognition and commercial success"
    ],
    news: [
      {
        title: "Cloud Gaming Market Expansion",
        content: "Cloud gaming services are expanding globally, offering more accessible and convenient ways to play high-quality games.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "VR/AR Gaming Hardware Breakthrough",
        content: "New VR/AR hardware releases are showing promising growth in immersive gaming experiences and user adoption.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "Indie Games Commercial Success",
        content: "Independent games are gaining mainstream recognition with several indie titles achieving major commercial success.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Game Developer",
        salary: "$70,000 - $120,000",
        experience: "1-3 years",
        skills: ["Game Programming", "Unity/Unreal Engine", "Game Design", "Version Control"],
        demand: "Very High"
      },
      {
        role: "Game Designer",
        salary: "$65,000 - $110,000",
        experience: "1-2 years",
        skills: ["Game Design Principles", "Player Psychology", "Storytelling", "Prototyping"],
        demand: "High"
      },
      {
        role: "3D Artist",
        salary: "$60,000 - $100,000",
        experience: "2-5 years",
        skills: ["3D Modeling", "Texturing", "Animation", "Maya/Blender"],
        demand: "Very High"
      },
      {
        role: "Esports Manager",
        salary: "$50,000 - $90,000",
        experience: "1-3 years",
        skills: ["Esports Strategy", "Event Management", "Team Coordination", "Marketing"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Game Development Fundamentals",
        items: [
          "Learn game engines like Unity or Unreal Engine for different project types",
          "Understand game design principles, mechanics, and player psychology",
          "Practice with small projects before tackling larger, complex games",
          "Study successful games to understand what makes them engaging"
        ]
      },
      {
        category: "Art & Technical Skills",
        items: [
          "Master 3D modeling and texturing techniques using industry-standard tools",
          "Learn game sound design and audio implementation",
          "Understand game optimization for different platforms and devices",
          "Practice with game art pipelines and asset creation workflows"
        ]
      },
      {
        category: "Industry & Business",
        items: [
          "Build a strong portfolio with playable game demos and projects",
          "Understand game monetization models and business strategies",
          "Network within the gaming community and attend industry events",
          "Stay updated with gaming trends, platforms, and emerging technologies"
        ]
      }
    ],
    usage: {
      industries: ["Entertainment", "Education", "Healthcare", "Military Training", "Marketing", "Simulation"],
      companies: ["Epic Games", "Unity", "Electronic Arts", "Activision Blizzard", "Ubisoft", "Nintendo", "Valve"],
      applications: [
        "Console and PC Gaming",
        "Mobile Gaming Applications",
        "Virtual and Augmented Reality Games",
        "Educational and Training Simulations",
        "Esports and Competitive Gaming",
        "Serious Games for Healthcare and Therapy"
      ]
    },
    statistics: {
      marketSize: "$321B global revenue (2023)",
      playerBase: "3.38B+ gamers worldwide",
      jobGrowth: "11% (2021-2031)",
      mobileGaming: "50% of total gaming revenue",
      esportsRevenue: "$1.72B annually"
    },
    learningPath: [
      "Programming Fundamentals",
      "Game Engine Basics (Unity/Unreal)",
      "Game Design Principles",
      "3D Modeling & Animation",
      "Game Physics & Mathematics",
      "Audio & Visual Effects",
      "Platform-Specific Development",
      "Game Testing & Optimization",
      "Publishing & Marketing"
    ]
  },
  "Tech News": {
    description: "Latest developments, trends, and innovations in the technology industry covering emerging technologies, market analysis, and digital transformation.",
    currentTrends: [
      "Quantum computing breakthroughs in error correction and practical applications",
      "5G rollout accelerating globally with new use cases in IoT and edge computing",
      "Cybersecurity threats evolving with AI-powered attacks and defense systems"
    ],
    news: [
      {
        title: "Quantum Computing Error Correction Milestone",
        content: "Major breakthrough in quantum error correction enables more stable quantum computers for practical applications.",
        date: "Dec 2024",
        importance: "high"
      },
      {
        title: "Global 5G Infrastructure Expansion",
        content: "5G networks expanding globally with new applications in autonomous vehicles, smart cities, and industrial IoT.",
        date: "Nov 2024",
        importance: "high"
      },
      {
        title: "AI-Powered Cybersecurity Evolution",
        content: "Cybersecurity landscape evolving with AI-powered threats requiring advanced AI-driven defense systems.",
        date: "Oct 2024",
        importance: "medium"
      }
    ],
    career: [
      {
        role: "Tech Journalist",
        salary: "$45,000 - $80,000",
        experience: "1-3 years",
        skills: ["Technical Writing", "Research", "Communication", "Industry Knowledge"],
        demand: "Very High"
      },
      {
        role: "Technology Analyst",
        salary: "$70,000 - $120,000",
        experience: "2-5 years",
        skills: ["Market Research", "Data Analysis", "Technology Trends", "Report Writing"],
        demand: "High"
      },
      {
        role: "Tech Content Creator",
        salary: "$40,000 - $100,000",
        experience: "1-3 years",
        skills: ["Content Creation", "SEO", "Social Media", "Video Production"],
        demand: "Very High"
      },
      {
        role: "Industry Research Specialist",
        salary: "$80,000 - $130,000",
        experience: "3-7 years",
        skills: ["Research Methodology", "Market Analysis", "Competitive Intelligence", "Strategic Planning"],
        demand: "High"
      }
    ],
    tips: [
      {
        category: "Writing & Research Skills",
        items: [
          "Develop strong technical writing skills for complex technology topics",
          "Master research methodologies and fact-checking for accurate reporting",
          "Stay updated with multiple tech news sources and industry publications",
          "Learn to translate technical concepts for different audience levels"
        ]
      },
      {
        category: "Industry Knowledge & Networking",
        items: [
          "Build expertise in specific technology domains like AI, blockchain, or cybersecurity",
          "Develop a strong network of industry professionals and sources",
          "Attend technology conferences, events, and product launches",
          "Follow key technology leaders and companies on social media"
        ]
      },
      {
        category: "Content Creation & Distribution",
        items: [
          "Master different content formats: articles, videos, podcasts, newsletters",
          "Understand SEO and content optimization for digital platforms",
          "Build a personal brand and thought leadership in technology topics",
          "Learn analytics and measurement tools for content performance"
        ]
      }
    ],
    usage: {
      industries: ["Media & Publishing", "Technology", "Finance", "Consulting", "Marketing", "Education"],
      companies: ["TechCrunch", "The Verge", "Wired", "Ars Technica", "Gartner", "Forrester", "Bloomberg"],
      applications: [
        "Technology News Reporting and Analysis",
        "Market Research and Industry Reports",
        "Technology Investment Analysis",
        "Digital Transformation Consulting",
        "Technology Education and Training",
        "Product Launch and Marketing Support"
      ]
    },
    statistics: {
      newsConsumption: "78% read tech news daily",
      influencerReach: "45M+ tech news followers",
      reportingSpeed: "News cycles under 4 hours",
      marketImpact: "25% stock movement on major tech news",
      globalReach: "195+ countries tech news coverage"
    },
    learningPath: [
      "Journalism & Writing Fundamentals",
      "Technology Industry Overview",
      "Research & Fact-Checking Methods",
      "Digital Content Creation",
      "SEO & Content Marketing",
      "Data Analysis & Visualization",
      "Social Media & Community Building",
      "Industry Networking & Source Development",
      "Specialized Technology Domains"
    ]
  }
};

const TechDetailsModal = ({ isOpen, onClose, topic }: TechDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const data = techData[topic as keyof typeof techData];

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-4xl font-bold text-orange-500">{topic}</DialogTitle>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{Object.values(data.statistics)[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Updated Dec 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-gray-300 text-lg mt-4 leading-relaxed">{data.description}</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Career
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="usage">
              <Users className="h-4 w-4 mr-1" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Market Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(data.statistics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-green-400">{String(value)}</div>
                        <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Learning Path</h3>
                  <div className="space-y-2">
                    {data.learningPath.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-gray-200">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Top Companies Using {topic}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {data.usage.companies.map((company, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-lg text-center font-medium">
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Key Applications</h3>
                  <div className="space-y-3">
                    {data.usage.applications.map((app, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Current Trends</h3>
                <div className="grid gap-3">
                  {data.currentTrends.map((trend, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{trend}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-6">
                {data.news.map((item, index) => (
                  <div key={index} className={`bg-gray-800 p-6 rounded-xl border-l-4 ${
                    item.importance === 'high' ? 'border-red-500' : 'border-yellow-500'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.importance === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.importance.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">{item.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="career" className="mt-6">
            <div className="grid gap-6">
              {data.career.map((job, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{job.role}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>Experience: {job.experience}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          job.demand === 'Extremely High' ? 'bg-red-500/20 text-red-400' :
                          job.demand === 'Very High' ? 'bg-orange-500/20 text-orange-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {job.demand} Demand
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{job.salary}</div>
                      <div className="text-sm text-gray-400">Annual Salary</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-semibold text-orange-400 mb-2">Required Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            <div className="space-y-6">
              {data.tips.map((section, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">{section.category}</h3>
                  <div className="space-y-3">
                    {section.items.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                          {tipIndex + 1}
                        </div>
                        <p className="text-gray-200 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Industries</h3>
                <div className="grid grid-cols-2 gap-3">
                  {data.usage.industries.map((industry, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-lg text-center">
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Real-World Applications</h3>
                <div className="space-y-3">
                  {data.usage.applications.map((app, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-200">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 p-6 rounded-xl border border-orange-500/20">
              <h3 className="text-2xl font-semibold mb-6 text-orange-400">Latest Trends & Developments</h3>
              <div className="space-y-4">
                {data.currentTrends.map((trend, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-200 leading-relaxed">{trend}</p>
                        <div className="mt-2 text-xs text-gray-400">Impact: High • Relevance: Current</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TechDetailsModal;
