"use client";

import { useRef, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { KnowledgePoint, categoryColors, KnowledgeCategory } from "@/data/knowledge";
import KnowledgePoint3D from "@/components/ui/KnowledgePoint3D";
import { ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";

interface KnowledgeCanvasProps {
    points: KnowledgePoint[];
    highlightedIds: Set<string>;
    isSearchActive: boolean;
    selectedId: string | null;
    onSelectPoint: (id: string | null) => void;
}

/* ------------------------------------------------------------------ */
/*  Inner scene – needs access to the Three.js context via useThree   */
/* ------------------------------------------------------------------ */
function Scene({
    points,
    highlightedIds,
    isSearchActive,
    selectedId,
    onSelectPoint,
    controlsRef,
}: KnowledgeCanvasProps & { controlsRef: React.MutableRefObject<any> }) {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-3, 3, -3]} intensity={0.4} color="#0D9488" />
            <pointLight position={[3, -3, 3]} intensity={0.3} color="#E17A5E" />

            {/* Camera controls – scroll zoom disabled */}
            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                minDistance={2.5}
                maxDistance={12}
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
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  Outer wrapper – renders Canvas + overlay zoom buttons              */
/* ------------------------------------------------------------------ */
export default function KnowledgeCanvas(props: KnowledgeCanvasProps) {
    const controlsRef = useRef<any>(null);

    const zoom = useCallback((direction: 1 | -1) => {
        const controls = controlsRef.current;
        if (!controls) return;
        const camera = controls.object as THREE.PerspectiveCamera;
        // Move camera along its forward vector
        const offset = new THREE.Vector3()
            .subVectors(camera.position, controls.target)
            .normalize();
        const step = 0.8 * direction; // positive = zoom out, negative = zoom in
        const newPos = camera.position.clone().addScaledVector(offset, step);
        const dist = newPos.distanceTo(controls.target);
        // Clamp within min/max distance
        if (dist >= 2.5 && dist <= 12) {
            camera.position.copy(newPos);
            controls.update();
        }
    }, []);

    return (
        <div className="relative w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 2]}
                style={{ width: "100%", height: "100%" }}
                onPointerMissed={() => props.onSelectPoint(null)}
            >
                <Scene {...props} controlsRef={controlsRef} />
            </Canvas>

            {/* Zoom buttons — bottom-right corner overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
                <button
                    onClick={() => zoom(-1)}
                    className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm border border-glass-border
                               flex items-center justify-center text-foreground/70 hover:text-foreground
                               hover:bg-white hover:shadow-md transition-all active:scale-95"
                    aria-label="Zoom in"
                    title="Zoom in"
                >
                    <ZoomIn size={18} />
                </button>
                <button
                    onClick={() => zoom(1)}
                    className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm border border-glass-border
                               flex items-center justify-center text-foreground/70 hover:text-foreground
                               hover:bg-white hover:shadow-md transition-all active:scale-95"
                    aria-label="Zoom out"
                    title="Zoom out"
                >
                    <ZoomOut size={18} />
                </button>
            </div>
        </div>
    );
}
