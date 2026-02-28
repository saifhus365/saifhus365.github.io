"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";

export default function InteractiveBackground() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // 1. Mouse Tracking Springs for Eyes/Head
    const mouseX = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });
    const mouseY = useSpring(0, { stiffness: 40, damping: 20, mass: 0.5 });

    const pupilX = useTransform(mouseX, [-100, 100], [-12, 12]);
    const pupilY = useTransform(mouseY, [-100, 100], [-12, 12]);
    const headRotateX = useTransform(mouseY, [-100, 100], [-15, 15]);
    const headRotateY = useTransform(mouseX, [-100, 100], [-25, 25]);

    // 2. Global Scroll Tracking for Robot Persona
    const { scrollY } = useScroll();

    // As the user scrolls down ~800px (into the About section), 
    // the robot solidifies, slides right, and colors up.
    // It fades away again as they enter Experience/Projects (>1600px).

    const robotOpacity = useTransform(
        scrollY,
        [0, 500, 900, 1400, 1800], // Pixel breakpoints
        [0.05, 0.05, 1, 1, 0.05]   // Faint -> Faint -> Solid -> Solid -> Faint
    );

    const robotX = useTransform(
        scrollY,
        [0, 600, 900],
        ["0vw", "0vw", "25vw"] // Center -> Center -> Move Right
    );

    const robotScale = useTransform(
        scrollY,
        [0, 600, 900],
        [1, 1, 1.3] // Scale up slightly when it hits the About section
    );

    // Animate SVG Colors based on scroll
    const chassisStroke = useTransform(
        scrollY,
        [0, 600, 900],
        ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0)", "var(--color-accent-primary)"]
    );

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleMouseMove = (e: MouseEvent) => {
            const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
            const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

            mouseX.set(normalizedX * 100);
            mouseY.set(normalizedY * 100);
        };

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [mouseX, mouseY]);

    if (windowSize.width === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 bg-background flex items-center justify-center overflow-hidden">

            {/* Subtle tech grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] opacity-80"></div>

            {/* The AI Robot / Machine Figure */}
            <motion.div
                className="relative z-0 w-64 h-64 md:w-96 md:h-96"
                style={{
                    rotateX: headRotateX,
                    rotateY: headRotateY,
                    opacity: robotOpacity,
                    x: robotX,
                    scale: robotScale,
                    perspective: 1000
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-foreground drop-shadow-2xl">
                    {/* Main Head Chassis */}
                    <motion.rect
                        x="30" y="40" width="140" height="120" rx="30"
                        fill="currentColor"
                        style={{ stroke: chassisStroke, strokeWidth: 4 }}
                    />

                    {/* Internal Face / Screen (Using background color to look like a cutout) */}
                    <rect x="45" y="60" width="110" height="60" rx="15" fill="var(--color-background)" />

                    {/* Left Eye Track (Dimly lit rails) */}
                    <rect x="65" y="75" width="20" height="30" rx="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                    {/* Right Eye Track */}
                    <rect x="115" y="75" width="20" height="30" rx="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />

                    {/* Glowing Pupils (tied to framer-motion transforms to follow the cursor) */}
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Left Pupil */}
                    <motion.circle
                        cx="75" cy="90" r="7"
                        fill="var(--color-accent-primary)"
                        style={{ x: pupilX, y: pupilY }}
                        filter="url(#glow)"
                    />
                    {/* Right Pupil */}
                    <motion.circle
                        cx="125" cy="90" r="7"
                        fill="var(--color-accent-primary)"
                        style={{ x: pupilX, y: pupilY }}
                        filter="url(#glow)"
                    />

                    {/* Mouth / Vents */}
                    <line x1="70" y1="140" x2="130" y2="140" stroke="var(--color-background)" strokeWidth="4" strokeLinecap="round" />
                    <line x1="85" y1="148" x2="115" y2="148" stroke="var(--color-background)" strokeWidth="4" strokeLinecap="round" />

                    {/* Top Antenna */}
                    <line x1="100" y1="40" x2="100" y2="20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />

                    {/* Antenna Bulb - Ignites when in About section */}
                    <motion.circle
                        cx="100" cy="15" r="5"
                        style={{ fill: chassisStroke }}
                        filter="url(#glow-strong)"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
