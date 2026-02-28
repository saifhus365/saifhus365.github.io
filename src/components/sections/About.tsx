"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Layers } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 relative z-10 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto mt-6 rounded-full opacity-50"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Left Column: The Narrative Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-7 space-y-6"
                    >
                        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">
                            Hi, I'm <strong className="font-semibold text-accent-primary">Husain Saif</strong>. I started my journey with a B.Tech in Computer Engineering from VJTI Mumbai, but my absolute obsession with artificial intelligence led me to Germany, where I'm completing my MS in Computer Science for Digital Media at the <strong className="font-semibold text-foreground">Bauhaus Universität Weimar</strong>.
                        </p>

                        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">
                            Currently, I'm an <strong className="font-semibold text-foreground">AI Engineer</strong> specializing in <strong className="font-semibold text-accent-secondary">Large Language Models (LLMs)</strong> and <strong className="font-semibold text-accent-secondary">Retrieval-Augmented Generation (RAG)</strong>. I design intelligent architectures; from multi-agent systems to scalable AI pipelines, that solve complex problems holistically.
                        </p>

                        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">
                            I firmly believe that the future of AI isn't just about massive models, but <em className="italic">smarter architectural orchestration</em>. My goal is to bridge the gap between cutting-edge research and robust, lightning-fast production engines that drive real-world impact.
                        </p>
                    </motion.div>

                    {/* Right Column: Key Highlights / Quick Facts */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-5 grid grid-cols-1 gap-6"
                    >
                        <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl flex items-start gap-4 hover:border-accent-primary/30 transition-colors">
                            <div className="mt-1 p-3 bg-accent-primary/10 rounded-xl text-accent-primary">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">End-to-End Problem Solver</h4>
                                <p className="text-sm text-muted">A holistic approach to engineering, taking AI from early conceptual design to robust, scalable deployments.</p>
                            </div>
                        </div>

                        <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl flex items-start gap-4 hover:border-accent-secondary/30 transition-colors">
                            <div className="mt-1 p-3 bg-accent-secondary/10 rounded-xl text-accent-secondary">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Published Researcher</h4>
                                <p className="text-sm text-muted">Primary author of an IJCAI 2026 paper on Multi-Agent Debate frameworks beating SoTA by 27%.</p>
                            </div>
                        </div>

                        <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl flex items-start gap-4 hover:border-accent-primary/30 transition-colors">
                            <div className="mt-1 p-3 bg-gradient-to-br from-accent-primary to-accent-secondary/20 rounded-xl text-foreground">
                                <Code2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1">Production Focused</h4>
                                <p className="text-sm text-muted">Dedicated to writing clean, maintainable code and building reliable infrastructure with tools like Docker and FastAPI.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
