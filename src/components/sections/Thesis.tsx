"use client";

import { motion, Variants } from "framer-motion";
import { FileText, Github, Bot, FlaskConical, LineChart, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const iconMap = {
    Bot: Bot,
    FlaskConical: FlaskConical,
    LineChart: LineChart,
};

export default function Thesis() {
    const { thesis } = portfolioData;

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="thesis" className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 text-foreground">
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Thesis</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="bg-glass-bg border border-glass-border p-6 md:p-10 rounded-2xl backdrop-blur-md"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-3 mb-4">
                                {thesis.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${index === 0
                                            ? "border-accent-primary/30 text-accent-primary bg-accent-primary/10"
                                            : "border-accent-secondary/30 text-accent-secondary bg-accent-secondary/10"
                                            }`}
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">
                                {thesis.title}
                            </h3>
                            <p className="text-muted leading-relaxed max-w-3xl">
                                {thesis.description}
                            </p>
                        </div>

                        {/* Action Buttons (Top Right on Desktop) */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                            <a
                                href={thesis.paperLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-full bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-accent-primary/25"
                            >
                                <FileText size={18} />
                                Read Paper
                            </a>
                            <a
                                href={thesis.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-full border border-glass-border text-foreground font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <Github size={18} />
                                View Repository
                            </a>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="flex flex-wrap gap-8 md:gap-16 py-8 border-y border-glass-border my-8">
                        {thesis.stats.map((stat, index) => (
                            <div key={index} className="flex flex-col">
                                <span className="text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-muted mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {thesis.highlights.map((highlight, index) => {
                            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
                            return (
                                <div key={index} className="flex items-start gap-4 text-foreground">
                                    {Icon && <Icon className="text-accent-primary shrink-0 mt-1" size={20} />}
                                    <span className="text-sm leading-relaxed">{highlight.text}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Embedded App */}
                    <div className="relative w-full rounded-xl overflow-hidden border border-glass-border bg-black/30 aspect-[4/3] md:aspect-video">
                        <iframe
                            src={`${thesis.demoLink}?embedded=true`}
                            title="Scientific Ideation Demo"
                            allowFullScreen
                            loading="lazy"
                            className="absolute top-0 left-0 w-full h-full border-none hidden sm:block"
                        ></iframe>

                        {/* Mobile Fallback layout */}
                        <div className="sm:hidden absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
                            <ExternalLink className="text-accent-primary mb-4" size={40} />
                            <p className="text-muted mb-6">Interactive demo loading…</p>
                            <a
                                href={thesis.demoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-full bg-accent-primary text-white font-medium w-full text-center"
                            >
                                Open in New Tab
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
