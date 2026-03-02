"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface KnowledgePoint3DProps {
    position: [number, number, number];
    color: string;
    label: string;
    isHighlighted: boolean;
    isSearchActive: boolean;
    isSelected: boolean;
    onClick: () => void;
}

export default function KnowledgePoint3D({
    position,
    color,
    label,
    isHighlighted,
    isSearchActive,
    isSelected,
    onClick,
}: KnowledgePoint3DProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Pre-allocate vector ONCE to avoid GC pressure in the frame loop
    const tempVec = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        const targetOpacity = isSearchActive
            ? isHighlighted ? 1.0 : 0.07
            : 1.0;

        const baseScale = isSelected ? 1.8 : hovered ? 1.5 : 1.0;
        const pulseScale =
            isHighlighted && isSearchActive
                ? baseScale + Math.sin(time * 3) * 0.15
                : baseScale;

        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08);

        tempVec.set(pulseScale, pulseScale, pulseScale);
        meshRef.current.scale.lerp(tempVec, 0.1);

        if (glowRef.current) {
            const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
            const glowOpacity =
                isSelected || hovered
                    ? 0.35
                    : isHighlighted && isSearchActive
                        ? 0.25 + Math.sin(time * 3) * 0.1
                        : isSearchActive ? 0.0 : 0.08;
            glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, glowOpacity, 0.08);
            tempVec.set(pulseScale * 2.5, pulseScale * 2.5, pulseScale * 2.5);
            glowRef.current.scale.lerp(tempVec, 0.1);
        }
    });

    const scaledPosition: [number, number, number] = useMemo(
        () => [position[0] * 3, position[1] * 3, position[2] * 3],
        [position]
    );

    const showLabel = hovered || isSelected;

    return (
        <group position={scaledPosition}>
            {/* Glow sphere */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.08}
                    depthWrite={false}
                />
            </mesh>

            {/* Main sphere */}
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    document.body.style.cursor = "auto";
                }}
            >
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={1}
                    roughness={0.3}
                    metalness={0.6}
                    emissive={color}
                    emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
                />
            </mesh>

            {/* HTML label — renders as a DOM overlay, zero WebGL cost */}
            {showLabel && (
                <Html
                    position={[0, 0.15, 0]}
                    center
                    distanceFactor={5}
                    style={{ pointerEvents: "none" }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.92)",
                            backdropFilter: "blur(8px)",
                            border: `1px solid ${color}40`,
                            borderRadius: "6px",
                            padding: "4px 10px",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#1E293B",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}
