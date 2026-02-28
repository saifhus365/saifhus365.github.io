import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Thesis from "@/components/sections/Thesis";
import Education from "@/components/sections/Education";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen text-foreground selection:bg-accent-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Thesis />
      <Education />
      <Footer />
    </main>
  );
}
