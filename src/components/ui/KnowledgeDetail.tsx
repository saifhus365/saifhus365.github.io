"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";
import { KnowledgePoint, categoryColors, KnowledgeCategory } from "@/data/knowledge";

interface KnowledgeDetailProps {
    point: KnowledgePoint | null;
    onClose: () => void;
}

export default function KnowledgeDetail({ point, onClose }: KnowledgeDetailProps) {
    return (
        <AnimatePresence mode="wait">
            {point && (
                <motion.div
                    key={point.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="bg-white border border-glass-border rounded-2xl p-5 shadow-lg relative overflow-hidden h-fit"
                >
                    {/* Accent bar top */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                        style={{
                            background: `linear-gradient(90deg, ${categoryColors[point.category as KnowledgeCategory]}, ${categoryColors[point.category as KnowledgeCategory]}80)`,
                        }}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-muted/50 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-glass-bg"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="flex items-start gap-2.5 mb-3 pr-6">
                        <div
                            className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: categoryColors[point.category as KnowledgeCategory] }}
                        />
                        <div>
                            <h4 className="text-base font-bold text-foreground font-heading leading-tight">
                                {point.label}
                            </h4>
                            <span
                                className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1"
                                style={{
                                    backgroundColor: categoryColors[point.category as KnowledgeCategory] + "15",
                                    color: categoryColors[point.category as KnowledgeCategory],
                                }}
                            >
                                {point.category}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted leading-relaxed mb-3">
                        {point.description}
                    </p>

                    {/* Where it was used */}
                    <div className="bg-[#f8f9fc] border border-glass-border rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground uppercase tracking-wider">
                            <MapPin size={10} className="text-accent-primary" />
                            Where I Applied This
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                            {point.relatedWork}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {point.relatedProjects.map((project) => (
                                <a
                                    key={project}
                                    href="#projects"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-primary/8 text-accent-primary text-[10px] font-medium hover:bg-accent-primary/15 transition-colors"
                                >
                                    <ExternalLink size={8} />
                                    {project}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                        {point.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[9px] text-muted/60 bg-glass-bg border border-glass-border px-1.5 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
