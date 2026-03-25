import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProjectsPreview } from '@/components/sections/Projects';
import { TechStack } from '@/components/sections/TechStack';
import { Experience } from '@/components/sections/Experience';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <Hero />
        <ProjectsPreview />
        <TechStack />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
