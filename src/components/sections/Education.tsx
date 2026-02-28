"use client";

import { motion, Variants } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Education() {
    const { education } = portfolioData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
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
        <section id="education" className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 text-foreground">
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Background</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-glass-bg border border-glass-border p-8 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row gap-6 hover:border-accent-primary/30 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                <GraduationCap size={32} />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold font-heading mb-2 text-foreground">
                                    {edu.degree}
                                </h3>
                                <h4 className="text-accent-secondary font-medium mb-3">
                                    {edu.university}
                                </h4>
                                <p className="flex items-center gap-2 text-sm text-muted mb-6">
                                    <Calendar size={14} />
                                    {edu.date}
                                </p>

                                <div className="space-y-2 text-sm text-muted">
                                    {edu.details.map((detail, dIndex) => (
                                        <p
                                            key={dIndex}
                                            dangerouslySetInnerHTML={{
                                                __html: detail.replace(
                                                    /\*\*(.*?)\*\*/g,
                                                    '<strong class="text-foreground font-semibold">$1</strong>'
                                                ),
                                            }}
                                        ></p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
