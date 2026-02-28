import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
    const { hero } = portfolioData;

    return (
        <footer id="contact" className="py-12 border-t border-glass-border mt-20">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6">
                        <a
                            href={hero.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="w-12 h-12 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center text-muted hover:text-accent-primary hover:border-accent-primary transition-all"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href={hero.github}
                            target="_blank"
                            rel="noreferrer"
                            className="w-12 h-12 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center text-muted hover:text-accent-primary hover:border-accent-primary transition-all"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={`mailto:${hero.email}`}
                            className="w-12 h-12 rounded-full border border-glass-border bg-glass-bg flex items-center justify-center text-muted hover:text-accent-primary hover:border-accent-primary transition-all"
                        >
                            <Mail size={20} />
                        </a>
                    </div>

                    <div className="flex flex-col items-center md:items-end text-muted text-sm gap-2">
                        <p className="flex items-center gap-2">
                            <MapPin size={16} className="text-accent-primary" />
                            {hero.location}
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail size={16} className="text-accent-primary" />
                            {hero.email}
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12 text-sm text-muted/60">
                    <p>
                        &copy; {new Date().getFullYear()} {hero.name}. All Rights
                        Reserved. Built with Next.js, Tailwind & Framer Motion.
                    </p>
                </div>
            </div>
        </footer>
    );
}
