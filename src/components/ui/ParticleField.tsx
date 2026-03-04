"use client";

import { useEffect, useRef, useCallback } from "react";

// Vibrant, full-saturation palette
const COLORS = {
    primary: { r: 0, g: 200, b: 180 },     // Bright teal
    secondary: { r: 255, g: 100, b: 60 },   // Bright coral
    tertiary: { r: 60, g: 120, b: 220 },    // Vivid blue
};

function lerpColor(
    a: { r: number; g: number; b: number },
    b: { r: number; g: number; b: number },
    t: number
) {
    return {
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
    };
}

interface Particle {
    // Angle around cursor center
    angle: number;
    // Base distance from cursor
    baseDist: number;
    // Current effective distance (deformed by movement)
    dist: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    phase: number;
    phaseSpeed: number;
    // Smoothed color value
    colorT: number;
}

const PARTICLE_COUNT = 90;
const DAMPING = 0.9;
const RETURN_STRENGTH = 0.025;
const COLOR_LERP_SPEED = 0.012;

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, active: false });
    const mousePrevRef = useRef({ x: 0, y: 0 });
    const mouseDirRef = useRef({ angle: 0, speed: 0, smoothAngle: 0 });
    const rafRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });

    const initParticles = useCallback((w: number, h: number) => {
        const particles: Particle[] = [];
        const cloudRadius = Math.min(w, h) * 0.4;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Inverted density: sparse center, dense edges
            const rawT = Math.random();
            const biasedT = rawT * rawT;
            const dist = cloudRadius * (0.25 + (1 - biasedT) * 0.75);

            particles.push({
                angle,
                baseDist: dist,
                dist,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                radius: 2 + Math.random() * 3,
                phase: Math.random() * Math.PI * 2,
                phaseSpeed: 0.004 + Math.random() * 0.008,
                colorT: 0.5,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w: rect.width, h: rect.height };
            initParticles(rect.width, rect.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener("mousemove", handleMouseMove);
            parent.addEventListener("mouseleave", handleMouseLeave);
        }

        const animate = () => {
            const { w, h } = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            const mouse = mouseRef.current;
            const particles = particlesRef.current;

            if (!mouse.active) {
                rafRef.current = requestAnimationFrame(animate);
                return;
            }

            // Mouse velocity
            const dx = mouse.x - mousePrevRef.current.x;
            const dy = mouse.y - mousePrevRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // Very smooth direction tracking
            mouseDirRef.current.speed += (speed - mouseDirRef.current.speed) * 0.06;
            if (speed > 0.3) {
                let angleDiff = angle - mouseDirRef.current.angle;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                mouseDirRef.current.angle += angleDiff * 0.04;
            }

            mousePrevRef.current = { x: mouse.x, y: mouse.y };

            const speedFactor = Math.min(mouseDirRef.current.speed / 12, 1);
            const cloudRadius = Math.min(w, h) * 0.4;
            const moveAngle = mouseDirRef.current.angle;

            for (const p of particles) {
                // --- Shape deformation based on cursor movement ---
                // Particles in the direction of movement get pushed further out,
                // particles perpendicular get pulled in, creating an elongated shape
                let relAngle = p.angle - moveAngle;
                while (relAngle > Math.PI) relAngle -= Math.PI * 2;
                while (relAngle < -Math.PI) relAngle += Math.PI * 2;

                // Elongation: aligned with movement = stretched, perpendicular = compressed
                const alignFactor = Math.cos(relAngle); // -1 to 1
                const deformation = 1 + alignFactor * speedFactor * 0.4; // 0.6 to 1.4
                const targetDist = p.baseDist * deformation;

                // Smoothly interpolate distance for organic feel
                p.dist += (targetDist - p.dist) * 0.03;

                // Gentle organic float
                p.phase += p.phaseSpeed;
                const floatX = Math.sin(p.phase) * 8;
                const floatY = Math.cos(p.phase * 0.7) * 8;

                // Trailing stretch
                const stretchMag = Math.min(mouseDirRef.current.speed * 0.4, 30);
                const trailAngle = moveAngle + Math.PI;
                const trailFactor = Math.max(0, Math.cos(p.angle - trailAngle));
                const distRatio = p.dist / cloudRadius;
                const stretchX = Math.cos(trailAngle) * stretchMag * trailFactor * distRatio;
                const stretchY = Math.sin(trailAngle) * stretchMag * trailFactor * distRatio;

                // Offset from cursor using deformed distance
                const ox = Math.cos(p.angle) * p.dist;
                const oy = Math.sin(p.angle) * p.dist;

                const targetX = mouse.x + ox + floatX + stretchX;
                const targetY = mouse.y + oy + floatY + stretchY;

                // Direct easing physics (no velocity buildup = no bounce)
                // The particles will smoothly approach the target without overshooting
                p.x += (targetX - p.x) * 0.06;
                p.y += (targetY - p.y) * 0.06;

                // --- Slow, smooth color transition ---
                const particleDirDiff = Math.abs(Math.cos(p.angle - moveAngle));
                const targetColorT = particleDirDiff;
                p.colorT += (targetColorT - p.colorT) * COLOR_LERP_SPEED;

                const moveColor = lerpColor(COLORS.secondary, COLORS.primary, p.colorT);
                const finalColor = lerpColor(COLORS.tertiary, moveColor, distRatio);

                // Full opacity — vibrant, not faded
                const alpha = 0.85 + distRatio * 0.15;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${alpha})`;
                ctx.shadowColor = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, 0.5)`;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Faint connecting lines
            ctx.lineWidth = 0.4;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const ddx = particles[i].x - particles[j].x;
                    const ddy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                    if (dist < 50) {
                        const lineAlpha = (1 - dist / 50) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${COLORS.primary.r}, ${COLORS.primary.g}, ${COLORS.primary.b}, ${lineAlpha})`;
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            if (parent) {
                parent.removeEventListener("mousemove", handleMouseMove);
                parent.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
