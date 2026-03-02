"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import { knowledgePoints, KnowledgeCategory } from "@/data/knowledge";
import KnowledgeSearch from "@/components/ui/KnowledgeSearch";
import KnowledgeDetail from "@/components/ui/KnowledgeDetail";

// Dynamic import for Three.js canvas (no SSR)
const KnowledgeCanvas = dynamic(
    () => import("@/components/ui/KnowledgeCanvas"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full rounded-2xl border border-glass-border bg-gradient-to-br from-[#f0f4f8] to-[#faf9f6] flex items-center justify-center">
                <div className="text-muted/50 text-sm animate-pulse">Loading 3D visualization...</div>
            </div>
        ),
    }
);

export default function Knowledge() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<KnowledgeCategory | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLocked, setIsLocked] = useState(false);

    const outerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress through outer container
    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ["start start", "end end"],
    });

    // Entry animation: title fades, section expands into viewport
    const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.08], [0, -30]);
    const contentOpacity = useTransform(scrollYProgress, [0.03, 0.12], [0, 1]);
    const contentScale = useTransform(scrollYProgress, [0.03, 0.12], [0.97, 1]);

    // Track when the section becomes fully locked
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setIsLocked(v > 0.05 && v < 0.95);
    });

    // Compute highlighted IDs based on search query and category filter
    const highlightedIds = useMemo(() => {
        const ids = new Set<string>();
        const q = searchQuery.toLowerCase().trim();
        if (!q && !categoryFilter) return ids;

        knowledgePoints.forEach((point) => {
            if (categoryFilter && point.category !== categoryFilter) return;
            if (q) {
                const searchable = [
                    point.label,
                    point.description,
                    point.category,
                    point.relatedWork,
                    ...point.tags,
                    ...point.relatedProjects,
                ]
                    .join(" ")
                    .toLowerCase();
                if (!searchable.includes(q)) return;
            }
            ids.add(point.id);
        });
        return ids;
    }, [searchQuery, categoryFilter]);

    const isSearchActive = searchQuery.length > 0 || categoryFilter !== null;

    const selectedPoint = useMemo(
        () => knowledgePoints.find((p) => p.id === selectedId) ?? null,
        [selectedId]
    );

    const handleSelectPoint = useCallback((id: string | null) => {
        setSelectedId(id);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        setSelectedId(null);
    }, []);

    const handleCategoryFilter = useCallback((category: KnowledgeCategory | null) => {
        setCategoryFilter(category);
        setSelectedId(null);
    }, []);

    return (
        <section id="knowledge" ref={outerRef} className="relative" style={{ height: "300vh" }}>
            {/* Sticky inner container — locks to viewport while scrolling through outer */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-background flex flex-col">
                {/* Title — fades out as content locks in */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="text-center pt-6 pb-4 shrink-0"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
                        Knowledge{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                            Universe
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto mt-4 rounded-full opacity-50" />
                    <p className="text-muted mt-3 max-w-lg mx-auto text-sm leading-relaxed">
                        An interactive map of everything I know — click any point to explore.
                    </p>
                </motion.div>

                {/* Main content — search, canvas, details all in one view */}
                <motion.div
                    style={{ opacity: contentOpacity, scale: contentScale }}
                    className="flex-1 flex flex-col min-h-0 px-4 md:px-8 pb-4"
                >
                    {/* Search bar row */}
                    <div className="shrink-0 pt-2 pb-3 z-10">
                        <KnowledgeSearch
                            onSearchChange={handleSearchChange}
                            onCategoryFilter={handleCategoryFilter}
                            activeCategory={categoryFilter}
                            matchCount={highlightedIds.size}
                            totalCount={knowledgePoints.length}
                        />
                    </div>

                    {/* Canvas + Detail side-by-side */}
                    <div className="flex-1 flex gap-4 min-h-0">
                        {/* 3D Canvas — takes full width, or shrinks when detail is open */}
                        <div
                            className={`relative rounded-2xl overflow-hidden border border-glass-border bg-gradient-to-br from-[#f0f4f8] to-[#faf9f6] transition-all duration-500 ${selectedPoint ? "flex-[3]" : "flex-1"
                                }`}
                        >
                            <KnowledgeCanvas
                                points={knowledgePoints}
                                highlightedIds={highlightedIds}
                                isSearchActive={isSearchActive}
                                selectedId={selectedId}
                                onSelectPoint={handleSelectPoint}
                            />

                            {/* Interaction hint — bottom center of canvas */}
                            {!isLocked && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted/50 pointer-events-none select-none flex items-center gap-2">
                                    <span>↓ scroll to explore</span>
                                </div>
                            )}
                            {isLocked && !selectedPoint && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted/40 pointer-events-none select-none flex items-center gap-2">
                                    drag to rotate · click a point to explore
                                </div>
                            )}
                        </div>

                        {/* Detail panel — slides in from the right */}
                        <div
                            className={`transition-all duration-500 ease-out overflow-y-auto ${selectedPoint
                                ? "flex-[2] opacity-100 translate-x-0"
                                : "flex-[0] opacity-0 translate-x-4 w-0 overflow-hidden"
                                }`}
                        >
                            {selectedPoint && (
                                <KnowledgeDetail
                                    point={selectedPoint}
                                    onClose={() => setSelectedId(null)}
                                />
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
