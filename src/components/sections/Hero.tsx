"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
    const { hero } = portfolioData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section
            id="about"
            className="min-h-[100svh] flex items-center relative z-10 pt-20"
        >
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    className="max-w-4xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-block">
                        <span className="px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 text-accent-primary text-sm font-medium">
                            {hero.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold font-heading mb-4 text-foreground leading-tight"
                    >
                        {hero.name}
                    </motion.h1>

                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-4xl text-muted font-medium mb-8"
                    >
                        {hero.title}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary">
                            {hero.subtitle}
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted max-w-2xl leading-relaxed mb-10"
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-full bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(129,140,248,0.3)] hover:shadow-[0_0_30px_rgba(129,140,248,0.5)] transform hover:-translate-y-1"
                        >
                            View Work
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </a>
                        <a
                            href="#"
                            className="px-8 py-3 rounded-full border border-glass-border bg-glass-bg text-foreground font-medium hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                            <Download size={18} />
                            Resume
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
