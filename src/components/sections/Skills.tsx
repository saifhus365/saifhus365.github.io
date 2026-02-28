"use client";

import { motion, Variants } from "framer-motion";
import { Brain, Microscope, Server } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const iconMap = {
    Brain: Brain,
    Microscope: Microscope,
    Server: Server,
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
        <section id="skills" className="py-24 relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 text-foreground">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Expertise</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skills.map((skill, index) => {
                        const Icon = iconMap[skill.icon as keyof typeof iconMap];

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-glass-bg border border-glass-border p-8 rounded-2xl backdrop-blur-md hover:border-accent-primary/50 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 group-hover:bg-accent-primary/20 transition-all">
                                    {Icon && <Icon size={28} />}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-foreground">
                                    {skill.category}
                                </h3>
                                <p className="text-muted mb-6 leading-relaxed">
                                    {skill.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {skill.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 bg-white/5 border border-glass-border rounded-full text-xs text-muted/80 whitespace-nowrap"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
