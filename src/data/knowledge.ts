// ============================================================
// KNOWLEDGE DATA FILE
// ============================================================
// Each point represents a skill/concept you know.
// Points in the same category will cluster together in 3D.
//
// Coordinate layout (semantic):
//
//   X-axis: AI/Research <-------> Engineering/Systems
//   Y-axis: High-level/Applied <-------> Low-level/Foundational
//   Z-axis: Language/Text <-------> Vision/Spatial
//
// Category positions (rough):
//   LLM & Agents         [-0.65,  0.45,  0.20]   far AI, high-level, text
//   NLP & Retrieval      [-0.45,  0.20,  0.30]   AI, mid, text-heavy
//   Research & Methods   [-0.55,  0.60,  0.05]   AI pole, most abstract/meta
//   ML & Deep Learning   [-0.35,  0.05,  0.00]   AI, mid-level, general
//   Computer Vision      [-0.30, -0.10, -0.45]   AI, mid, vision
//   VR & Spatial         [-0.05, -0.10, -0.60]   bridge, spatial/3D
//   Data & Fundamentals  [ 0.05, -0.50,  0.05]   center, foundational
//   Software Engineering [ 0.45, -0.25,  0.05]   Eng pole, lower-level
//   Full-Stack           [ 0.50,  0.10,  0.20]   Eng pole, applied, text-facing
//   DevOps & Cloud       [ 0.55,  0.30,  0.00]   Eng pole, operational
// ============================================================

export interface KnowledgePoint {
    id: string;
    label: string;
    category: KnowledgeCategory;
    description: string;
    x: number;
    y: number;
    z: number;
    relatedProjects: string[];
    relatedWork: string;
    tags: string[];
}

export type KnowledgeCategory =
    | "LLM & Agents"
    | "ML & Deep Learning"
    | "NLP & Retrieval"
    | "Full-Stack"
    | "DevOps & Cloud"
    | "Research & Methods"
    | "Data & Fundamentals"
    | "Computer Vision & Graphics"
    | "VR & Spatial Computing"
    | "Software Engineering";

export const categoryColors: Record<KnowledgeCategory, string> = {
    "LLM & Agents": "#0D9488",
    "ML & Deep Learning": "#E17A5E",
    "NLP & Retrieval": "#6366F1",
    "Full-Stack": "#10B981",
    "DevOps & Cloud": "#F59E0B",
    "Research & Methods": "#F43F5E",
    "Data & Fundamentals": "#64748B",
    "Computer Vision & Graphics": "#A855F7",
    "VR & Spatial Computing": "#22D3EE",
    "Software Engineering": "#84CC16",
};

// Semantically arranged centers:
//   X: negative = AI/Research pole, positive = Engineering/Systems pole
//   Y: positive = high-level/applied, negative = low-level/foundational
//   Z: positive = language/text oriented, negative = vision/spatial oriented
const centers: Record<KnowledgeCategory, [number, number, number]> = {
    "LLM & Agents": [-0.65, 0.45, 0.20],
    "NLP & Retrieval": [-0.45, 0.20, 0.30],
    "Research & Methods": [-0.55, 0.60, 0.05],
    "ML & Deep Learning": [-0.35, 0.05, 0.00],
    "Computer Vision & Graphics": [-0.30, -0.10, -0.45],
    "VR & Spatial Computing": [-0.05, -0.10, -0.60],
    "Data & Fundamentals": [0.05, -0.50, 0.05],
    "Software Engineering": [0.45, -0.25, 0.05],
    "Full-Stack": [0.50, 0.10, 0.20],
    "DevOps & Cloud": [0.55, 0.30, 0.00],
};

function near(cat: KnowledgeCategory, dx: number, dy: number, dz: number): { x: number; y: number; z: number } {
    const [cx, cy, cz] = centers[cat];
    return { x: cx + dx, y: cy + dy, z: cz + dz };
}

export const knowledgePoints: KnowledgePoint[] = [

    // ── LLM & Agents ──────────────────────────────────────
    {
        id: "langchain-rag",
        label: "LangChain RAG",
        category: "LLM & Agents",
        description: "Building retrieval-augmented generation pipelines with LangChain for grounded LLM responses.",
        ...near("LLM & Agents", 0.00, -0.08, 0.10),
        relatedProjects: ["Max Planck RAG System", "Illumulus"],
        relatedWork: "Built production RAG system serving 100K+ climate research papers with <2s latency at Max Planck Institute.",
        tags: ["langchain", "rag", "retrieval", "llm", "generation"],
    },
    {
        id: "multi-agent-debate",
        label: "Multi-Agent Debate",
        category: "LLM & Agents",
        description: "Orchestrating multiple LLM agents in structured debate for scientific idea generation.",
        ...near("LLM & Agents", -0.08, 0.08, -0.05),
        relatedProjects: ["IJCAI Thesis"],
        relatedWork: "Primary author of IJCAI 2026 paper achieving 27% gain over SoTA using multi-agent debate framework.",
        tags: ["multi-agent", "debate", "scientific", "ideation", "langgraph"],
    },
    {
        id: "langgraph",
        label: "LangGraph",
        category: "LLM & Agents",
        description: "Designing stateful, cyclic agent workflows with LangGraph for complex multi-step reasoning.",
        ...near("LLM & Agents", 0.08, 0.05, 0.00),
        relatedProjects: ["Max Planck RAG System", "IJCAI Thesis"],
        relatedWork: "Deployed multi-agent LLM system using LangGraph + Llama-3.1-Nemotron-70B achieving 37% improvement in retrieval accuracy.",
        tags: ["langgraph", "agent", "workflow", "state-machine", "reasoning"],
    },
    {
        id: "prompt-engineering",
        label: "Prompt Engineering",
        category: "LLM & Agents",
        description: "Crafting and optimizing prompts for LLMs including chain-of-thought, few-shot, and system prompts.",
        ...near("LLM & Agents", -0.05, -0.05, 0.08),
        relatedProjects: ["Max Planck RAG System", "Illumulus", "IJCAI Thesis"],
        relatedWork: "Designed role-specialized prompts for multi-agent debate system and RAG query decomposition.",
        tags: ["prompt", "engineering", "cot", "few-shot", "llm"],
    },
    {
        id: "crewai",
        label: "CrewAI",
        category: "LLM & Agents",
        description: "Building collaborative multi-agent systems with role-based task delegation using CrewAI.",
        ...near("LLM & Agents", 0.10, -0.05, -0.08),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Explored CrewAI for agent orchestration patterns in research automation workflows.",
        tags: ["crewai", "multi-agent", "collaboration", "delegation"],
    },
    {
        id: "ollama",
        label: "Ollama / Local LLMs",
        category: "LLM & Agents",
        description: "Running and fine-tuning open-source LLMs locally using Ollama for privacy-first AI applications.",
        ...near("LLM & Agents", 0.05, 0.10, 0.05),
        relatedProjects: ["Illumulus"],
        relatedWork: "Integrated Ollama-served models into Illumulus storytelling AI for local inference without cloud dependency.",
        tags: ["ollama", "local", "llm", "open-source", "inference"],
    },
    {
        id: "llamaindex",
        label: "LlamaIndex",
        category: "LLM & Agents",
        description: "Data framework for connecting custom data to LLMs with indexing and retrieval capabilities.",
        ...near("LLM & Agents", -0.10, -0.10, 0.05),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Explored LlamaIndex for structured document indexing in early RAG prototyping phase.",
        tags: ["llamaindex", "index", "data", "llm", "retrieval"],
    },

    // ── NLP & Retrieval ───────────────────────────────────
    {
        id: "semantic-search",
        label: "Semantic Search",
        category: "NLP & Retrieval",
        description: "Building vector-based semantic search systems that go beyond keyword matching.",
        ...near("NLP & Retrieval", -0.05, 0.08, 0.05),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Engineered semantic search over 100K+ climate papers with BAAI embeddings for sub-2s retrieval.",
        tags: ["semantic", "search", "vector", "embedding", "similarity"],
    },
    {
        id: "vector-databases",
        label: "Vector Databases",
        category: "NLP & Retrieval",
        description: "Working with Pinecone, ChromaDB, and FAISS for high-performance vector storage and retrieval.",
        ...near("NLP & Retrieval", 0.08, -0.05, 0.08),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Deployed Pinecone-backed vector store for production RAG system with low-latency retrieval.",
        tags: ["pinecone", "chromadb", "faiss", "vector-db", "storage"],
    },
    {
        id: "colbert-embeddings",
        label: "ColBERT Embeddings",
        category: "NLP & Retrieval",
        description: "Late-interaction retrieval models for fine-grained token-level matching in document search.",
        ...near("NLP & Retrieval", -0.08, 0.00, 0.10),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Built React + FastAPI video retrieval interface with ColBERT embeddings for timestamped semantic search.",
        tags: ["colbert", "late-interaction", "retrieval", "token-level", "embedding"],
    },
    {
        id: "baai-embeddings",
        label: "BAAI Embeddings",
        category: "NLP & Retrieval",
        description: "Using BAAI/bge embedding models for state-of-the-art text representation and retrieval.",
        ...near("NLP & Retrieval", 0.05, 0.05, -0.05),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Shipped production RAG system using BAAI embeddings with 30% faster query response.",
        tags: ["baai", "bge", "embedding", "text-representation"],
    },
    {
        id: "query-decomposition",
        label: "Query Decomposition",
        category: "NLP & Retrieval",
        description: "Breaking complex user queries into sub-queries for improved retrieval coverage and accuracy.",
        ...near("NLP & Retrieval", -0.05, -0.08, 0.00),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Implemented multi-step query decomposition to improve retrieval accuracy by 37% in climate research system.",
        tags: ["query", "decomposition", "sub-query", "retrieval", "accuracy"],
    },

    // ── Research & Methods ────────────────────────────────
    {
        id: "scientific-ideation",
        label: "Scientific Ideation",
        category: "Research & Methods",
        description: "Automated generation, critique, and refinement of scientific hypotheses using AI agents.",
        ...near("Research & Methods", -0.08, 0.05, 0.08),
        relatedProjects: ["IJCAI Thesis"],
        relatedWork: "Developed novel multi-agent debate framework for automated scientific idea generation, accepted at IJCAI 2026.",
        tags: ["scientific", "ideation", "hypothesis", "generation", "research"],
    },
    {
        id: "ablation-testing",
        label: "Ablation Studies",
        category: "Research & Methods",
        description: "Systematic evaluation methodology removing components to measure individual contributions.",
        ...near("Research & Methods", 0.08, 0.00, -0.05),
        relatedProjects: ["IJCAI Thesis", "Max Planck RAG System"],
        relatedWork: "Conducted systematic ablation testing across multi-agent configurations and RAG pipeline components.",
        tags: ["ablation", "evaluation", "systematic", "methodology", "components"],
    },
    {
        id: "evaluation-metrics",
        label: "Evaluation Metrics",
        category: "Research & Methods",
        description: "Designing custom evaluation harnesses and metrics for LLM and retrieval system assessment.",
        ...near("Research & Methods", 0.05, -0.08, 0.05),
        relatedProjects: ["Max Planck RAG System", "IJCAI Thesis"],
        relatedWork: "Built custom evaluation harness that reduced hallucinations by 42% via grounded retrieval validation.",
        tags: ["evaluation", "metrics", "harness", "assessment", "llm"],
    },
    {
        id: "paper-writing",
        label: "Academic Paper Writing",
        category: "Research & Methods",
        description: "Writing and publishing research papers at top-tier AI conferences with rigorous methodology.",
        ...near("Research & Methods", -0.05, 0.08, -0.08),
        relatedProjects: ["IJCAI Thesis"],
        relatedWork: "Primary author of IJCAI 2026 paper with structured academic writing and peer review process.",
        tags: ["paper", "writing", "academic", "publication", "conference"],
    },

    // ── ML & Deep Learning ────────────────────────────────
    {
        id: "pytorch",
        label: "PyTorch",
        category: "ML & Deep Learning",
        description: "Deep learning framework for training neural networks, custom architectures, and GPU-accelerated research.",
        ...near("ML & Deep Learning", 0.05, 0.08, 0.05),
        relatedProjects: ["RetMed", "Illumulus", "Deep Learning CV Course"],
        relatedWork: "Applied PyTorch for training ViT and YOLOv10 on VindrCXR dataset for lung abnormality detection.",
        tags: ["pytorch", "deep-learning", "neural-network", "gpu", "training"],
    },
    {
        id: "object-detection",
        label: "Object Detection",
        category: "ML & Deep Learning",
        description: "SOTA detection architectures including YOLOv10, DETR, Faster R-CNN, and ViT for medical imaging and beyond.",
        ...near("ML & Deep Learning", 0.00, -0.05, -0.10),
        relatedProjects: ["RetMed", "Deep Learning CV Course"],
        relatedWork: "Beat top competition scores on Kaggle VindrCXR using ViT, YOLOv10, and DETR. Also trained Faster R-CNN on custom university dataset.",
        tags: ["yolo", "detr", "vit", "faster-rcnn", "detection", "computer-vision"],
    },
    {
        id: "lora-finetuning",
        label: "LoRA Fine-tuning",
        category: "ML & Deep Learning",
        description: "Parameter-efficient fine-tuning of foundation models using Low-Rank Adaptation (LoRA).",
        ...near("ML & Deep Learning", -0.08, 0.08, 0.08),
        relatedProjects: ["IJCAI Thesis"],
        relatedWork: "Applied LoRA techniques for adapting large language models to scientific domain tasks.",
        tags: ["lora", "fine-tuning", "peft", "adaptation", "foundation-model"],
    },
    {
        id: "transformers",
        label: "Transformer Architectures",
        category: "ML & Deep Learning",
        description: "Deep understanding of attention mechanisms, encoder-decoder architectures, and modern transformer variants.",
        ...near("ML & Deep Learning", -0.05, 0.10, 0.00),
        relatedProjects: ["RetMed", "IJCAI Thesis"],
        relatedWork: "Leveraged Vision Transformers for medical imaging and language model architectures for scientific ideation.",
        tags: ["transformer", "attention", "encoder", "decoder", "architecture"],
    },
    {
        id: "huggingface",
        label: "Hugging Face",
        category: "ML & Deep Learning",
        description: "Using Hugging Face ecosystem for model hosting, tokenizers, datasets, and inference pipelines.",
        ...near("ML & Deep Learning", -0.10, 0.05, 0.08),
        relatedProjects: ["Max Planck RAG System", "RetMed"],
        relatedWork: "Used Hugging Face models and BAAI embeddings for semantic search across 100K+ research papers.",
        tags: ["huggingface", "models", "tokenizer", "datasets", "inference"],
    },
    {
        id: "experiment-tracking",
        label: "Experiment Tracking",
        category: "ML & Deep Learning",
        description: "Systematic ML experiment tracking with Weights & Biases and MLflow for reproducible research.",
        ...near("ML & Deep Learning", 0.10, 0.05, -0.02),
        relatedProjects: ["RetMed", "IJCAI Thesis", "Deep Learning CV Course"],
        relatedWork: "Tracked ablation experiments and model comparisons using W&B throughout thesis research and coursework.",
        tags: ["wandb", "mlflow", "experiment", "tracking", "reproducibility"],
    },
    {
        id: "stable-diffusion",
        label: "Stable Diffusion",
        category: "ML & Deep Learning",
        description: "Text-to-image generation using Stable Diffusion models for visual content creation.",
        ...near("ML & Deep Learning", -0.05, -0.03, -0.08),
        relatedProjects: ["Illumulus"],
        relatedWork: "Integrated Stable Diffusion 3 outputs into Illumulus for AI-driven visual storytelling augmentation.",
        tags: ["stable-diffusion", "image-generation", "diffusion", "text-to-image"],
    },
    {
        id: "opencv",
        label: "OpenCV",
        category: "ML & Deep Learning",
        description: "Computer vision library for image processing, video analysis, and visual feature extraction.",
        ...near("ML & Deep Learning", 0.05, -0.08, -0.08),
        relatedProjects: ["RetMed", "Deep Learning CV Course"],
        relatedWork: "Used OpenCV for medical image preprocessing, augmentation, and in the university object detection pipeline.",
        tags: ["opencv", "computer-vision", "image-processing", "video"],
    },
    {
        id: "recommendation-systems",
        label: "Recommendation Systems",
        category: "ML & Deep Learning",
        description: "Building personalized content and product recommendation engines using collaborative and content-based filtering.",
        ...near("ML & Deep Learning", 0.10, 0.00, 0.10),
        relatedProjects: ["Atrillu Media"],
        relatedWork: "Built personalized content recommendation model increasing influencer engagement by 30% at Atrillu Media.",
        tags: ["recommendation", "collaborative-filtering", "personalization", "content-based"],
    },
    {
        id: "mmdetection",
        label: "MMDetection",
        category: "ML & Deep Learning",
        description: "Open-source object detection toolbox built on PyTorch with modular design for rapid experimentation.",
        ...near("ML & Deep Learning", 0.08, -0.10, -0.08),
        relatedProjects: ["Deep Learning CV Course"],
        relatedWork: "Used MMDetection framework to train and evaluate detection models on a custom university-curated dataset.",
        tags: ["mmdetection", "object-detection", "pytorch", "toolbox", "cv"],
    },
    {
        id: "pgm-deep-learning",
        label: "Probabilistic Generative Models",
        category: "ML & Deep Learning",
        description: "Probabilistic Generative Models for image generation taks based on prompts.",
        ...near("ML & Deep Learning", -0.10, -0.08, 0.00),
        relatedProjects: ["Deep Learning CV Course"],
        relatedWork: "Studied PGMs as part of the advanced deep learning for computer vision curriculum at Bauhaus-Universität Weimar.",
        tags: ["pgm", "probabilistic", "graphical-model", "uncertainty", "structured-prediction"],
    },
    {
        id: "point-cloud-dl",
        label: "Deep Learning on Point Clouds",
        category: "ML & Deep Learning",
        description: "Applying deep learning to 3D point cloud data for scene understanding and 3D object recognition.",
        ...near("ML & Deep Learning", 0.00, -0.10, -0.12),
        relatedProjects: ["Deep Learning CV Course"],
        relatedWork: "Studied deep learning methods for 3D point cloud processing in advanced computer vision coursework.",
        tags: ["point-cloud", "3d", "scene-understanding", "deep-learning"],
    },

    // ── Computer Vision & Graphics ────────────────────────
    {
        id: "image-analysis",
        label: "Image Analysis Algorithms",
        category: "Computer Vision & Graphics",
        description: "Classical image analysis from pixel-level manipulation to feature detection and Viola-Jones face detection.",
        ...near("Computer Vision & Graphics", 0.00, 0.08, 0.08),
        relatedProjects: ["Image Analysis Course"],
        relatedWork: "Implemented classical CV algorithms from scratch in MATLAB — pixel operations, filtering, edge detection, and Viola-Jones cascade classifier.",
        tags: ["image-analysis", "viola-jones", "feature-detection", "classical-cv", "matlab"],
    },
    {
        id: "photogrammetry",
        label: "Photogrammetric Computer Vision",
        category: "Computer Vision & Graphics",
        description: "Camera projection models, homographies, epipolar geometry, and 3D reconstruction from images.",
        ...near("Computer Vision & Graphics", -0.08, 0.00, -0.05),
        relatedProjects: ["Photogrammetric CV Course"],
        relatedWork: "Studied and implemented projection models, homography estimation, and camera calibration algorithms in MATLAB.",
        tags: ["photogrammetry", "homography", "projection", "3d-reconstruction", "camera-calibration"],
    },
    {
        id: "image-formation",
        label: "Imaging Physics & Radiometry",
        category: "Computer Vision & Graphics",
        description: "Physics of light, radiometric quantities (flux, radiance, irradiance), color theory, and the human visual system.",
        ...near("Computer Vision & Graphics", -0.10, -0.05, 0.05),
        relatedProjects: ["Computer Graphics Course"],
        relatedWork: "Studied the complete imaging pipeline from light physics through biological vision to digital image formation at Bauhaus-Universität.",
        tags: ["radiometry", "light-physics", "irradiance", "radiance", "color-theory", "imaging"],
    },
    {
        id: "jpeg-compression",
        label: "JPEG Compression",
        category: "Computer Vision & Graphics",
        description: "Manual implementation of JPEG compression pipeline including DCT, quantization, and entropy coding.",
        ...near("Computer Vision & Graphics", -0.05, -0.08, 0.08),
        relatedProjects: ["Computer Graphics Course"],
        relatedWork: "Implemented the full JPEG compression and decompression pipeline from scratch in Python as part of computer graphics coursework.",
        tags: ["jpeg", "dct", "compression", "quantization", "entropy-coding", "python"],
    },
    {
        id: "deep-point-matching",
        label: "Deep Feature Matching",
        category: "Computer Vision & Graphics",
        description: "Learning-based correspondence estimation between images using deep neural networks.",
        ...near("Computer Vision & Graphics", 0.08, 0.05, -0.08),
        relatedProjects: ["Deep Learning CV Course"],
        relatedWork: "Studied deep learning point matching models for robust image correspondences in advanced computer vision coursework.",
        tags: ["feature-matching", "correspondence", "deep-learning", "keypoints"],
    },
    {
        id: "gis-qgis",
        label: "QGIS & Geospatial Analysis",
        category: "Computer Vision & Graphics",
        description: "Creating and analyzing geographic maps using QGIS with vector and raster data layers.",
        ...near("Computer Vision & Graphics", 0.10, -0.08, -0.05),
        relatedProjects: ["GIS Course"],
        relatedWork: "Used QGIS to produce maps from vector shapefiles and raster datasets, and studied coordinate reference systems and map projections.",
        tags: ["qgis", "gis", "geospatial", "mapping", "raster", "vector"],
    },
    {
        id: "map-projections",
        label: "Map Projections & Rasterization",
        category: "Computer Vision & Graphics",
        description: "Understanding different cartographic projections, rasterization methods, and spatial data representations.",
        ...near("Computer Vision & Graphics", 0.08, -0.10, -0.10),
        relatedProjects: ["GIS Course"],
        relatedWork: "Studied rasterization of real-world geography, coordinate systems, and multiple map projection types (conformal, equal-area, equidistant).",
        tags: ["map-projection", "rasterization", "cartography", "coordinate-systems", "gis"],
    },

    // ── VR & Spatial Computing ────────────────────────────
    {
        id: "unity-vr",
        label: "Unity & C# for VR",
        category: "VR & Spatial Computing",
        description: "Building VR experiences in Unity using C#, managing scene hierarchies, and VR rendering techniques.",
        ...near("VR & Spatial Computing", 0.10, 0.05, 0.00),
        relatedProjects: ["Bauhaus VR Course"],
        relatedWork: "Developed VR applications in Unity using C# scripting, learned how object hierarchies change in XR contexts and how VR visuals are computed.",
        tags: ["unity", "c#", "vr", "xr", "scene-management"],
    },
    {
        id: "vr-rendering",
        label: "VR Rendering Principles",
        category: "VR & Spatial Computing",
        description: "Stereoscopic rendering, reprojection, foveated rendering, and performance optimization for VR headsets.",
        ...near("VR & Spatial Computing", -0.08, 0.05, -0.05),
        relatedProjects: ["Bauhaus VR Course"],
        relatedWork: "Studied the history, current implementations, and future directions of VR rendering and display technology at Bauhaus-Universität.",
        tags: ["stereoscopic", "rendering", "reprojection", "foveated", "vr-performance"],
    },
    {
        id: "social-vr-networking",
        label: "Social VR & Network Serialization",
        category: "VR & Spatial Computing",
        description: "Networking techniques for social VR: state synchronization, network serialization, and multi-user XR environments.",
        ...near("VR & Spatial Computing", 0.05, -0.08, -0.05),
        relatedProjects: ["Bauhaus VR Course"],
        relatedWork: "Learned how network serialization enables social VR experiences with multiple users in different physical locations sharing the same virtual space.",
        tags: ["social-vr", "networking", "serialization", "multiplayer", "synchronization"],
    },

    // ── Data & Fundamentals ───────────────────────────────
    {
        id: "python",
        label: "Python",
        category: "Data & Fundamentals",
        description: "Core programming language for ML, data science, API development, and scripting.",
        ...near("Data & Fundamentals", -0.08, 0.05, 0.05),
        relatedProjects: ["Max Planck RAG System", "RetMed", "Illumulus", "IJCAI Thesis"],
        relatedWork: "Primary language across all projects — from research prototyping to production systems.",
        tags: ["python", "programming", "scripting", "core"],
    },
    {
        id: "linear-algebra",
        label: "Linear Algebra",
        category: "Data & Fundamentals",
        description: "Mathematical foundations for ML: matrices, eigenvalues, SVD, and vector spaces.",
        ...near("Data & Fundamentals", -0.05, -0.05, -0.05),
        relatedProjects: ["RetMed", "IJCAI Thesis"],
        relatedWork: "Applied linear algebra concepts in embedding spaces, attention mechanisms, and LoRA decomposition.",
        tags: ["linear-algebra", "math", "matrices", "vectors", "svd"],
    },
    {
        id: "data-structures",
        label: "Data Structures & Algorithms",
        category: "Data & Fundamentals",
        description: "Efficient data organization and algorithmic problem-solving for scalable systems.",
        ...near("Data & Fundamentals", 0.08, -0.05, 0.08),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Optimized data pipeline structures for efficient document processing and retrieval at scale.",
        tags: ["data-structures", "algorithms", "optimization", "efficiency"],
    },
    {
        id: "scikit-learn",
        label: "Scikit-Learn",
        category: "Data & Fundamentals",
        description: "Classical ML algorithms, preprocessing, model selection, and evaluation pipelines.",
        ...near("Data & Fundamentals", -0.08, 0.00, 0.08),
        relatedProjects: ["Atrillu Media"],
        relatedWork: "Built personalized content recommendation model at Atrillu Media using scikit-learn pipelines.",
        tags: ["scikit-learn", "sklearn", "ml", "classification", "regression"],
    },
    {
        id: "matlab",
        label: "MATLAB",
        category: "Data & Fundamentals",
        description: "Scientific computing and algorithm implementation in MATLAB for image processing and photogrammetry.",
        ...near("Data & Fundamentals", 0.00, -0.08, -0.08),
        relatedProjects: ["Image Analysis Course", "Photogrammetric CV Course"],
        relatedWork: "Implemented image analysis algorithms (from pixel manipulation to Viola-Jones) and photogrammetric projections in MATLAB for university coursework.",
        tags: ["matlab", "scientific-computing", "algorithm", "numerical"],
    },

    // ── Software Engineering ──────────────────────────────
    {
        id: "agile-waterfall",
        label: "Agile & Waterfall Methodologies",
        category: "Software Engineering",
        description: "Software development process frameworks including Agile (Scrum, Kanban) and Waterfall lifecycle models.",
        ...near("Software Engineering", 0.00, 0.10, 0.05),
        relatedProjects: ["Software Engineering Course"],
        relatedWork: "Studied and applied Agile and Waterfall methodologies in a group C++ project, presenting our process choices and trade-offs.",
        tags: ["agile", "scrum", "waterfall", "sdlc", "kanban", "process"],
    },
    {
        id: "software-testing",
        label: "Black-Box & White-Box Testing",
        category: "Software Engineering",
        description: "Systematic software testing strategies including black-box (functional) and white-box (structural) test design.",
        ...near("Software Engineering", -0.08, 0.05, 0.00),
        relatedProjects: ["Software Engineering Course"],
        relatedWork: "Designed and implemented black-box and white-box test suites for a group C++ software project at Bauhaus-Universität.",
        tags: ["testing", "black-box", "white-box", "unit-testing", "test-design"],
    },
    {
        id: "cpp-development",
        label: "C++ Development",
        category: "Software Engineering",
        description: "Systems programming in C++ with emphasis on OOP, memory management, and collaborative group development.",
        ...near("Software Engineering", 0.08, -0.05, 0.05),
        relatedProjects: ["Software Engineering Course"],
        relatedWork: "Developed a group software project in C++ as part of the software engineering course, applying SE principles throughout.",
        tags: ["c++", "oop", "systems-programming", "memory-management"],
    },
    {
        id: "formal-verification",
        label: "Formal Verification",
        category: "Software Engineering",
        description: "Mathematically rigorous verification of software correctness using model checking and theorem proving.",
        ...near("Software Engineering", -0.10, -0.05, -0.05),
        relatedProjects: ["Formal Methods Course"],
        relatedWork: "Studied formal verification and validation techniques including model checking with NuXMV at Bauhaus-Universität.",
        tags: ["formal-verification", "model-checking", "correctness", "nuxmv", "safety"],
    },
    {
        id: "sat-smt-solvers",
        label: "SAT & SMT Solvers",
        category: "Software Engineering",
        description: "Boolean Satisfiability and Satisfiability Modulo Theories solvers for automated reasoning and verification.",
        ...near("Software Engineering", -0.08, -0.10, -0.08),
        relatedProjects: ["Formal Methods Course"],
        relatedWork: "Used SAT and SMT solvers as part of formal methods coursework for automated constraint solving and program verification.",
        tags: ["sat", "smt", "solver", "automated-reasoning", "constraints"],
    },
    {
        id: "design-patterns",
        label: "Design Patterns & Architecture",
        category: "Software Engineering",
        description: "Classical software design patterns (SOLID, GoF) and architectural patterns for maintainable, scalable systems.",
        ...near("Software Engineering", 0.05, 0.08, -0.05),
        relatedProjects: ["Software Engineering Course"],
        relatedWork: "Applied software architecture and design patterns principles in the group C++ project and SE coursework at Bauhaus-Universität.",
        tags: ["design-patterns", "solid", "architecture", "oop", "maintainability"],
    },
    {
        id: "requirements-engineering",
        label: "Requirements Engineering",
        category: "Software Engineering",
        description: "Eliciting, documenting, and managing software requirements through use cases, user stories, and specification.",
        ...near("Software Engineering", 0.10, 0.05, 0.08),
        relatedProjects: ["Software Engineering Course"],
        relatedWork: "Practiced requirements elicitation and specification as part of the full software engineering lifecycle in coursework.",
        tags: ["requirements", "use-cases", "user-stories", "specification", "elicitation"],
    },

    // ── Full-Stack ────────────────────────────────────────
    {
        id: "react",
        label: "React",
        category: "Full-Stack",
        description: "Building component-driven user interfaces with React, hooks, and modern state management.",
        ...near("Full-Stack", -0.05, 0.05, 0.10),
        relatedProjects: ["Max Planck RAG System", "Portfolio Website"],
        relatedWork: "Built React frontend for video retrieval interface and personal portfolio with Three.js integration.",
        tags: ["react", "frontend", "hooks", "components", "ui"],
    },
    {
        id: "nextjs",
        label: "Next.js",
        category: "Full-Stack",
        description: "Server-side rendering, static generation, and full-stack React applications with Next.js.",
        ...near("Full-Stack", -0.08, 0.08, 0.05),
        relatedProjects: ["Portfolio Website"],
        relatedWork: "Built this portfolio website using Next.js 16 with static export for GitHub Pages deployment.",
        tags: ["nextjs", "ssr", "static", "fullstack", "react"],
    },
    {
        id: "fastapi",
        label: "FastAPI",
        category: "Full-Stack",
        description: "High-performance Python APIs with automatic OpenAPI docs, async support, and type validation.",
        ...near("Full-Stack", 0.05, -0.05, 0.08),
        relatedProjects: ["Max Planck RAG System", "Illumulus"],
        relatedWork: "Built FastAPI backend for RAG system and video retrieval interface serving production traffic.",
        tags: ["fastapi", "python", "api", "rest", "backend"],
    },
    {
        id: "tailwindcss",
        label: "Tailwind CSS",
        category: "Full-Stack",
        description: "Utility-first CSS framework for rapid UI development with design system constraints.",
        ...near("Full-Stack", -0.10, 0.05, 0.08),
        relatedProjects: ["Portfolio Website"],
        relatedWork: "Designed portfolio with Tailwind v4 using custom theme tokens for glassmorphism and gradient effects.",
        tags: ["tailwind", "css", "utility", "design-system", "styling"],
    },
    {
        id: "streamlit",
        label: "Streamlit",
        category: "Full-Stack",
        description: "Rapid prototyping of ML demos and data apps with Streamlit's reactive framework.",
        ...near("Full-Stack", 0.08, 0.00, -0.05),
        relatedProjects: ["IJCAI Thesis"],
        relatedWork: "Built interactive demo app for scientific ideation thesis using Streamlit, deployed publicly.",
        tags: ["streamlit", "demo", "prototype", "data-app", "dashboard"],
    },

    // ── DevOps & Cloud ────────────────────────────────────
    {
        id: "docker",
        label: "Docker",
        category: "DevOps & Cloud",
        description: "Containerizing ML applications and APIs for consistent, reproducible deployments.",
        ...near("DevOps & Cloud", -0.05, -0.08, 0.05),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Containerized RAG system components with Docker for reliable multi-service deployment.",
        tags: ["docker", "container", "deployment", "devops", "reproducibility"],
    },
    {
        id: "google-cloud",
        label: "Google Cloud Platform",
        category: "DevOps & Cloud",
        description: "Deploying and scaling ML workloads on GCP with Compute Engine, Cloud Storage, and Vertex AI.",
        ...near("DevOps & Cloud", 0.08, 0.05, -0.05),
        relatedProjects: ["Max Planck RAG System"],
        relatedWork: "Deployed production RAG infrastructure on GCP for climate research paper retrieval.",
        tags: ["gcp", "google-cloud", "compute", "vertex-ai", "cloud"],
    },
    {
        id: "github-actions",
        label: "GitHub Actions CI/CD",
        category: "DevOps & Cloud",
        description: "Automated testing, building, and deployment pipelines using GitHub Actions workflows.",
        ...near("DevOps & Cloud", 0.00, 0.08, 0.08),
        relatedProjects: ["Portfolio Website"],
        relatedWork: "Set up GitHub Actions workflow for automated Next.js build and deployment to GitHub Pages.",
        tags: ["github-actions", "ci-cd", "automation", "pipeline", "deployment"],
    },
];