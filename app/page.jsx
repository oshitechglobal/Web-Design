import CinematicHero from "@/components/hero/CinematicHero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import NH3Specialists from "@/components/sections/NH3Specialists";
import Industries from "@/components/sections/Industries";
import CTABand from "@/components/sections/CTABand";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <TrustBar />
      <About />
      <Services />
      <NH3Specialists />
      <Industries />
      <CTABand />
      <Contact />
    </>
  );
}
