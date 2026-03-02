"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { KnowledgePoint, categoryColors, KnowledgeCategory } from "@/data/knowledge";
import KnowledgePoint3D from "@/components/ui/KnowledgePoint3D";

interface KnowledgeCanvasProps {
    points: KnowledgePoint[];
    highlightedIds: Set<string>;
    isSearchActive: boolean;
    selectedId: string | null;
    onSelectPoint: (id: string | null) => void;
}

export default function KnowledgeCanvas({
    points,
    highlightedIds,
    isSearchActive,
    selectedId,
    onSelectPoint,
}: KnowledgeCanvasProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 2]}
            style={{ width: "100%", height: "100%" }}
            onPointerMissed={() => onSelectPoint(null)}
        >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-3, 3, -3]} intensity={0.4} color="#0D9488" />
            <pointLight position={[3, -3, 3]} intensity={0.3} color="#E17A5E" />

            {/* Camera controls */}
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={3}
                maxDistance={10}
                autoRotate={!isSearchActive && !selectedId}
                autoRotateSpeed={0.5}
                dampingFactor={0.05}
                enableDamping
            />

            {/* Render each knowledge point */}
            {points.map((point) => (
                <KnowledgePoint3D
                    key={point.id}
                    position={[point.x, point.y, point.z]}
                    color={categoryColors[point.category as KnowledgeCategory]}
                    label={point.label}
                    isHighlighted={highlightedIds.has(point.id)}
                    isSearchActive={isSearchActive}
                    isSelected={selectedId === point.id}
                    onClick={() => onSelectPoint(point.id === selectedId ? null : point.id)}
                />
            ))}
        </Canvas>
    );
}
