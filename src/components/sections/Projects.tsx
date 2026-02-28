"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
    const { projects } = portfolioData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="projects" className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 text-foreground">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Projects</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-glass-bg border border-glass-border p-8 rounded-2xl backdrop-blur-md flex flex-col group hover:border-accent-primary/40 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        >
                            <h3 className="text-2xl font-bold font-heading mb-2 text-foreground group-hover:text-accent-primary transition-colors">
                                {project.title}
                            </h3>
                            <h4 className="text-accent-secondary font-medium mb-4">
                                {project.subtitle}
                            </h4>
                            <p className="text-muted leading-relaxed mb-8 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag, tIndex) => (
                                    <span
                                        key={tIndex}
                                        className="px-3 py-1 bg-white/5 border border-glass-border rounded-full text-xs text-muted/80 whitespace-nowrap"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-auto pt-6 border-t border-glass-border">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-primary transition-colors"
                                    >
                                        <Github size={18} />
                                        View Code
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-primary transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        Article
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
