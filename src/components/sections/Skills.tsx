"use client";

import { motion, Variants } from "framer-motion";
import { Brain, Microscope, Server } from "lucide-react";
import {
    SiLangchain, SiPytorch, SiPython,
    SiHuggingface, SiOpencv, SiWeightsandbiases, SiMlflow, SiScikitlearn,
    SiFastapi, SiDocker, SiNextdotjs, SiReact, SiTailwindcss, SiGooglecloud, SiGithubactions
} from "react-icons/si";
import { TbRobot } from "react-icons/tb";
import { portfolioData } from "@/data/portfolio";

const mainIconMap = {
    Brain: Brain,
    Microscope: Microscope,
    Server: Server,
};

// Map the string names from portfolio.ts to actual react-icon components
const techIconMap: Record<string, React.ElementType> = {
    SiLangchain, SiPytorch, SiPython,
    SiHuggingface, SiOpencv, SiWeightsandbiases, SiMlflow, SiScikitlearn,
    SiFastapi, SiDocker, SiNextdotjs, SiReact, SiTailwindcss, SiGooglecloud, SiGithubactions,
    TbRobot
};

export default function Skills() {
    const { skills } = portfolioData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="skills" className="py-24 relative z-10 bg-background">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Expertise</span>
                    </h2>
                    <p className="text-muted mt-4 max-w-2xl">
                        A comprehensive breakdown of the technologies, frameworks, and ML architectures I use to bridge research and production.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skills.map((skill, index) => {
                        const MainIcon = mainIconMap[skill.icon as keyof typeof mainIconMap];

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-glass-bg border border-glass-border p-8 rounded-3xl flex flex-col hover:border-accent-primary/50 transition-all group shadow-xl shadow-black/5"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 group-hover:bg-accent-primary/20 transition-all duration-300">
                                    {MainIcon && <MainIcon size={28} />}
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">
                                    {skill.category}
                                </h3>
                                <p className="text-muted mb-8 leading-relaxed flex-grow text-sm">
                                    {skill.description}
                                </p>

                                {/* Dense, Logo-Rich Tech Grid */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {skill.tags.map((tag, tagIndex) => {
                                        // Some tags (like Chroma, LangGraph) might not exist in standard react-icons yet.
                                        // If missing, we gracefully fall back to just text.
                                        const TechIcon = techIconMap[tag.icon];

                                        return (
                                            <span
                                                key={tagIndex}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-glass-border/40 rounded-lg text-xs font-semibold text-foreground/80 hover:text-accent-primary hover:border-accent-primary/40 transition-colors shadow-sm"
                                            >
                                                {TechIcon && <TechIcon className="text-accent-secondary" size={14} />}
                                                {tag.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
