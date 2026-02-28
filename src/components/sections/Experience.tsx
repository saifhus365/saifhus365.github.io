"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
    const { experience } = portfolioData;

    return (
        <section id="experience" className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 text-foreground">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Experience</span>
                    </h2>
                </motion.div>

                <div className="relative border-l-2 border-glass-border ml-4 md:ml-0 md:pl-0">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-10 mb-16 last:mb-0"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-accent-primary ring-4 ring-background z-10"></div>

                            <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-glass-border/80 transition-all">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                                            {exp.role}
                                        </h3>
                                        <div className="flex items-center gap-2 text-accent-secondary font-medium">
                                            <Briefcase size={16} />
                                            {exp.company}, {exp.location}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted text-sm whitespace-nowrap bg-white/5 px-4 py-2 rounded-full border border-glass-border w-fit">
                                        <Calendar size={14} />
                                        {exp.date}
                                    </div>
                                </div>

                                <ul className="space-y-4 text-muted border-t border-glass-border pt-6">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="flex items-start gap-3">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0"></div>
                                            {/* Dangerously set inner HTML here is safe because we control portfolio.ts and allows for basic markdown bolding like **text** */}
                                            <p
                                                className="leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: highlight.replace(
                                                        /\*\*(.*?)\*\*/g,
                                                        '<strong class="text-white font-semibold">$1</strong>'
                                                    ),
                                                }}
                                            ></p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
