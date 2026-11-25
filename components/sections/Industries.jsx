import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import ParallaxOrb from "../ParallaxOrb";
import TiltCard from "../TiltCard";
import Icon from "../Icon";

const INDUSTRIES = [
  { icon: "fish", label: "Fishing & seafood" },
  { icon: "warehouse", label: "Cold storage facilities" },
  { icon: "utensils", label: "Food processing" },
  { icon: "truck", label: "Logistics & warehousing" },
  { icon: "ship", label: "Marine & harbour ops" },
  { icon: "factory", label: "Industrial plants" },
  { icon: "pickaxe", label: "Mining support" },
  { icon: "store", label: "Commercial refrigeration" },
];

export default function Industries() {
  return (
    <section id="industries" className="relative bg-ice-50 py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      <ParallaxOrb className="w-[24rem] h-[24rem] bg-cyan-400/15 top-10 -right-24" speed={0.14} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <Reveal className="max-w-2xl mx-auto text-center" as="div">
          <span className="pill-badge pill-badge--light mb-6"><Icon name="snowflake" className="w-3.5 h-3.5" /> Industries</span>
          <SplitHeading className="font-heading font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-navy-950">
            Cooling Solutions for <span className="text-gradient-cyan">Critical Operations</span>
          </SplitHeading>
          <p className="mt-5 text-navy-600 text-base sm:text-lg leading-relaxed">
            Trusted by operators where cooling failure is not an option — from harbour-side seafood to mining support facilities.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.label} type="clip" delay={(i % 4) * 0.06} as="div">
              <TiltCard className="p-6 rounded-2xl bg-white border border-navy-900/6 shadow-sm hover:shadow-lg transition-shadow">
                <span className="icon-tile w-11 h-11 bg-cyan-50 text-cyan-600 mb-4"><Icon name={ind.icon} className="w-5.5 h-5.5" /></span>
                <h3 className="font-heading font-semibold text-navy-950">{ind.label}</h3>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
