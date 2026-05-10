import { Navbar } from '@/components/grenier-bio/sections/Navbar';
import { Hero } from '@/components/grenier-bio/sections/Hero';
import { Histoire } from '@/components/grenier-bio/sections/Histoire';
import { Ferme } from '@/components/grenier-bio/sections/Ferme';
import { Produits } from '@/components/grenier-bio/sections/Produits';
import { Processus } from '@/components/grenier-bio/sections/Processus';
import { OuTrouver } from '@/components/grenier-bio/sections/OuTrouver';
import { Contact } from '@/components/grenier-bio/sections/Contact';
import { Footer } from '@/components/grenier-bio/sections/Footer';

export default function GrenierBioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Histoire />
        <Ferme />
        <Produits />
        <Processus />
        <OuTrouver />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
