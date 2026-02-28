export const portfolioData = {
    hero: {
        name: "Husain Qasim Ali Saif",
        badge: "UAE Golden Visa Holder",
        title: "AI Engineer",
        subtitle: "specializing in LLM Systems & RAG",
        description:
            "",
        location: "Dubai, UAE",
        email: "saifhus365@gmail.com",
        phone: "+971569859353",
        linkedin: "https://www.linkedin.com/in/husain-saif-49582b1a5/",
        github: "https://github.com/saifhus365",
        resumeLink: "/HQAS_CV_26.pdf",
    },
    skills: [
        {
            category: "LLM Systems & Multi-Agent AI",
            icon: "Brain",
            description: "Designing reasoning-focused multi-agent orchestrations, RAG pipelines, and grounded generation engines.",
            tags: [
                { name: "LangChain", icon: "SiLangchain" },
                { name: "LlamaIndex", icon: "SiLlamaindex" },
                { name: "LangGraph", icon: "SiLanggraph" },
                { name: "CrewAI", icon: "TbRobot" },
                { name: "Pinecone", icon: "SiPinecone" },
                { name: "ChromaDB", icon: "SiChroma" },
                { name: "Ollama", icon: "SiLlama" },
            ],
        },
        {
            category: "Machine & Deep Learning ",
            icon: "Microscope",
            description: "Fine-tuning foundational models (LoRA), deep learning architectures, and complex experiment tracking.",
            tags: [
                { name: "PyTorch", icon: "SiPytorch" },
                { name: "Python", icon: "SiPython" },
                { name: "Hugging Face", icon: "SiHuggingface" },
                { name: "OpenCV", icon: "SiOpencv" },
                { name: "W&B", icon: "SiWeightsandbiases" },
                { name: "MLflow", icon: "SiMlflow" },
                { name: "Scikit-Learn", icon: "SiScikitlearn" },
            ],
        },
        {
            category: "Full-Stack & MLOps",
            icon: "Server",
            description: "Taking research out of notebooks and deploying it into blazing-fast, scalable, full-stack web applications.",
            tags: [
                { name: "FastAPI", icon: "SiFastapi" },
                { name: "Docker", icon: "SiDocker" },
                { name: "Next.js", icon: "SiNextdotjs" },
                { name: "React", icon: "SiReact" },
                { name: "Tailwind CSS", icon: "SiTailwindcss" },
                { name: "Google Cloud", icon: "SiGooglecloud" },
                { name: "GitHub Actions", icon: "SiGithubactions" },
            ],
        },
    ],
    experience: [
        {
            role: "AI Research Assistant",
            company: "Max Planck Institute of Geoanthropology",
            location: "Jena, Germany",
            date: "May 2024 – Jan 2026",
            highlights: [
                "Shipped production **RAG system** serving 100K+ climate research papers with **30% faster query response** (<2s latency) using BAAI embeddings.",
                "Deployed **multi-agent LLM system** (LangGraph + Llama-3.1-Nemotron-70B) achieving **37% improvement** in retrieval accuracy through systematic evaluation metrics and ablation testing.",
                "Built React + FastAPI video retrieval interface with ColBERT embeddings for timestamped semantic search; reduced hallucinations **42%** via grounded retrieval validation and custom evaluation harness.",
            ],
        },
        {
            role: "Machine Learning Intern",
            company: "Atrillu Media",
            location: "Bangalore, India",
            date: "Jun 2021 – Sep 2021",
            highlights: [
                "Built a personalized content recommendation model, increasing influencer engagement by **30%**.",
                "Analyzed influencer posting patterns using advanced analytics to optimize scheduling.",
                "Automated influencer-specific app pipelines, reducing manual overhead.",
            ],
        },
    ],
    projects: [
        {
            title: "RetMed",
            subtitle: "Replication and Transformation of Medical Imaging Data",
            description:
                "Applied SOTA Object Detection models (ViT, YOLOv10, DETR) to the VindrCXR dataset for lung abnormality detection, beating top competition scores on Kaggle.",
            tags: ["Python", "PyTorch", "MMDet", "MMYOLO"],
            github: "https://github.com/alexkubl/retmed",
        },
        {
            title: "Illumulus",
            subtitle: "Storytelling AI",
            description:
                "Enhanced storytelling AI using RAG on Wikipedia documents, producing more realistic narratives. Integrated outputs into Stable Diffusion 3 for visual augmentation.",
            tags: ["Python", "LangChain", "Ollama", "PyTorch", "FastAPI", "React"],
            link: "https://www.uni-weimar.de/de/universitaet/aktuell/bauhausjournal-online/titel/leipziger-buchmesse-illumulus-zeigt-wie-ki-gesteuertes-storytelling-gelingt-1/",
        },
    ],
    thesis: {
        title: "Multi-Agent Debate Framework for Scientific Idea Generation",
        badges: ["IJCAI 2026", "Primary Author"],
        description:
            "A novel framework where multiple LLM-powered agents engage in structured debates to collaboratively generate, critique, and refine scientific hypotheses — pushing the boundaries of automated research ideation.",
        stats: [
            { value: "27%", label: "Gain over SoTA" },
            { value: "Multi-Agent", label: "LLM Debate System" },
            { value: "IJCAI", label: "Top AI Conference" },
        ],
        highlights: [
            {
                icon: "Bot",
                text: "Multi-agent debate architecture with role-specialized LLM agents",
            },
            {
                icon: "FlaskConical",
                text: "Automated scientific idea generation, critique, and refinement pipeline",
            },
            {
                icon: "LineChart",
                text: "Systematic evaluation against state-of-the-art baselines",
            },
        ],
        paperLink: "https://downloads.webis.de/theses/papers/saif_2026.pdf",
        githubLink: "https://github.com/saifhus365/scientific_ideation",
        demoLink: "https://scientificideation.streamlit.app/",
    },
    education: [
        {
            degree: "MS in Computer Science for Digital Media",
            university: "Bauhaus Universität Weimar, Germany",
            date: "Oct 2023 – Jan 2026",
            details: [
                "**Grade:** 1.5 (Very Good, Top 10%)",
                "**Thesis:** Multi-agent debate framework for scientific idea generation (IJCAI 2026, primary author), achieving 27% gain over SoTA.",
            ],
        },
        {
            degree: "B.Tech in Computer Engineering",
            university: "Veermata Jijabai Technological Institute, Mumbai, India",
            date: "Sep 2018 – Mar 2022",
            details: [
                "**CGPA:** 7.23/10",
                "**Coursework:** Data Structures, Algorithms, Linear Algebra, Machine Learning, Cryptography.",
            ],
        },
    ],
};
