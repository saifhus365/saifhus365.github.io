"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);
    const { projects } = portfolioData;

    useEffect(() => {
        const updateMetrics = () => {
            if (trackRef.current) {
                const scrollWidth = trackRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                // The max scroll distance needed is exactly the hidden overflow.
                // If content fits completely, maxScroll is 0 (and no sticky translation occurs).
                const maxScroll = Math.max(0, scrollWidth - viewportWidth);
                setScrollRange(maxScroll);
            }
        };

        updateMetrics();
        // Delay to account for fonts or image loading layout shifts
        const timeout = setTimeout(updateMetrics, 500);

        window.addEventListener("resize", updateMetrics);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", updateMetrics);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        // Start tracking when the container hits the top, stop when its end hits bottom
        offset: ["start start", "end end"]
    });

    // Map 0 -> 1 progress to 0 -> -(how far we need to translate horizontally)
    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

    // Set explicit height to allow 1px vertical scroll -> 1px horizontal scroll map.
    // If no scrollRange is needed, it defaults to normal block flow.
    const sectionHeight = scrollRange > 0 ? `calc(100vh + ${scrollRange}px)` : "auto";

    return (
        <section ref={targetRef} id="projects" className="relative bg-background" style={{ height: sectionHeight }}>
            <div className={scrollRange > 0 ? "sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-20" : "flex flex-col items-center justify-center py-24 overflow-hidden"}>

                <div className="container mx-auto px-6 md:px-12 max-w-6xl w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Projects</span>
                        </h2>
                    </motion.div>
                </div>

                {/* The horizontally moving track */}
                <motion.div
                    ref={trackRef}
                    style={{ x: scrollRange > 0 ? x : 0 }}
                    className="flex gap-8 px-6 md:px-12 w-max items-stretch mx-auto md:mx-0"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-[85vw] md:w-[500px] shrink-0 bg-glass-bg border border-glass-border p-8 rounded-3xl backdrop-blur-md flex flex-col group hover:border-accent-primary/20 transition-all shadow-xl shadow-black/5 relative overflow-hidden h-[550px]"
                        >
                            {/* Decorative accent gradient on hover */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-secondary/5 rounded-full blur-[80px] -z-10 group-hover:bg-accent-secondary/10 transition-all duration-700"></div>

                            <h3 className="text-3xl font-bold font-heading mb-3 text-foreground group-hover:text-accent-primary transition-colors">
                                {project.title}
                            </h3>
                            <h4 className="text-accent-secondary font-medium mb-6 text-lg">
                                {project.subtitle}
                            </h4>
                            <p className="text-muted leading-relaxed mb-8 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag, tIndex) => (
                                    <span
                                        key={tIndex}
                                        className="px-4 py-1.5 bg-background border border-glass-border/30 rounded-full text-xs font-medium text-muted/90 whitespace-nowrap shadow-sm"
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
                                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-primary transition-colors bg-white/50 hover:bg-white px-5 py-2.5 rounded-full shadow-sm border border-glass-border"
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
                                        className="flex items-center gap-2 text-sm font-semibold text-white bg-accent-primary hover:bg-accent-secondary transition-colors px-5 py-2.5 rounded-full shadow-md shadow-accent-primary/20"
                                    >
                                        <ExternalLink size={18} />
                                        Article
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Patcher spacer to prevent harsh cutoff at screen edge */}
                    <div className="w-[5vw] shrink-0"></div>
                </motion.div>
            </div>
        </section>
    );
}
