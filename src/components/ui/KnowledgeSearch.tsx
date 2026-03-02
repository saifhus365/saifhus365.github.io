"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { KnowledgeCategory, categoryColors } from "@/data/knowledge";

interface KnowledgeSearchProps {
    onSearchChange: (query: string) => void;
    onCategoryFilter: (category: KnowledgeCategory | null) => void;
    activeCategory: KnowledgeCategory | null;
    matchCount: number;
    totalCount: number;
}

const categories: KnowledgeCategory[] = [
    "LLM & Agents",
    "ML & Deep Learning",
    "NLP & Retrieval",
    "Full-Stack",
    "DevOps & Cloud",
    "Research & Methods",
    "Data & Fundamentals",
    "Computer Vision & Graphics",
    "VR & Spatial Computing",
    "Software Engineering"
];

export default function KnowledgeSearch({
    onSearchChange,
    onCategoryFilter,
    activeCategory,
    matchCount,
    totalCount,
}: KnowledgeSearchProps) {
    const [query, setQuery] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const handleInputChange = useCallback(
        (value: string) => {
            setQuery(value);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                onSearchChange(value);
            }, 200);
        },
        [onSearchChange]
    );

    const clearSearch = useCallback(() => {
        setQuery("");
        onSearchChange("");
        onCategoryFilter(null);
    }, [onSearchChange, onCategoryFilter]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const isActive = query.length > 0 || activeCategory !== null;

    return (
        <div className="space-y-4">
            {/* Search input */}
            <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-muted/60" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Search my knowledge... (e.g., RAG, PyTorch, Docker)"
                    className="w-full pl-11 pr-10 py-3.5 bg-white border border-glass-border rounded-xl 
                     text-foreground placeholder:text-muted/50 text-sm
                     focus:outline-none focus:ring-2 focus:ring-accent-primary/30 focus:border-accent-primary/40
                     transition-all shadow-sm hover:shadow-md"
                />
                {isActive && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted/60 hover:text-foreground transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    const color = categoryColors[cat];
                    return (
                        <button
                            key={cat}
                            onClick={() => onCategoryFilter(isActive ? null : cat)}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
                            style={{
                                backgroundColor: isActive ? color + "18" : "transparent",
                                borderColor: isActive ? color + "60" : "rgba(15, 23, 42, 0.08)",
                                color: isActive ? color : "#64748B",
                            }}
                        >
                            <span
                                className="inline-block w-2 h-2 rounded-full mr-1.5"
                                style={{ backgroundColor: color }}
                            />
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Match count */}
            {isActive && (
                <p className="text-center text-xs text-muted/70">
                    Showing <span className="font-semibold text-accent-primary">{matchCount}</span> of {totalCount} knowledge points
                </p>
            )}
        </div>
    );
}
