"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
    const { experience } = portfolioData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="experience" className="py-24 relative z-10 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Experience</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-6 rounded-full opacity-50"></div>
                </motion.div>

                <div className="relative">
                    {/* The main vertical timeline track */}
                    <div className="absolute left-[15px] top-4 bottom-0 w-0.5 bg-glass-border/60 rounded-full md:left-[23px]"></div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-12"
                    >
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative pl-12 md:pl-20 group"
                            >
                                {/* Glowing Timeline Node */}
                                <div className="absolute left-0 top-1.5 w-[32px] h-[32px] md:w-[48px] md:h-[48px] bg-background border-4 border-accent-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(13,148,136,0.3)] group-hover:scale-110 group-hover:bg-accent-primary group-hover:shadow-[0_0_20px_rgba(13,148,136,0.6)] transition-all duration-300 z-10">
                                    <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-accent-primary group-hover:text-background transition-colors" />
                                </div>

                                {/* Content Card */}
                                <div className="bg-glass-bg border border-glass-border p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-lg shadow-black/5 hover:border-accent-primary/40 transition-all">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold font-heading text-foreground mb-1">
                                                {exp.role}
                                            </h3>
                                            <h4 className="text-lg font-medium text-accent-secondary">
                                                {exp.company}
                                            </h4>
                                            <p className="text-muted text-sm mt-1">{exp.location}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-muted text-sm whitespace-nowrap bg-white/5 px-4 py-2 rounded-xl border border-glass-border shadow-sm w-fit">
                                            <Calendar size={14} className="text-accent-primary" />
                                            {exp.date}
                                        </div>
                                    </div>

                                    <ul className="space-y-3 text-muted/90">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="flex items-start gap-3">
                                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0 opacity-80"></div>
                                                <p
                                                    className="leading-relaxed font-light text-[0.95rem]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlight.replace(
                                                            /\*\*(.*?)\*\*/g,
                                                            '<strong class="text-foreground font-semibold">$1</strong>'
                                                        ),
                                                    }}
                                                ></p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
