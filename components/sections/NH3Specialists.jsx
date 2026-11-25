import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import Starfield from "../Starfield";
import SteamField from "../SteamField";
import TiltCard from "../TiltCard";
import Icon from "../Icon";

const CAPABILITIES = [
  { icon: "clipboard-check", label: "System inspections" },
  { icon: "gauge", label: "Leak & performance checks" },
  { icon: "cog", label: "Compressor & plant-room support" },
  { icon: "wrench", label: "Preventative maintenance" },
  { icon: "bell-alert", label: "Emergency fault response" },
  { icon: "shield-check", label: "Safe operating support" },
];

export default function NH3Specialists() {
  return (
    <section id="nh3-specialists" className="relative bg-navy-950 py-24 sm:py-32 overflow-hidden scroll-mt-20">
      <Starfield count={34} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,238,0.12),transparent_45%)] pointer-events-none" />
      <SteamField soft puffs={[2, 4]} />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="pill-badge pill-badge--dark mb-6"><Icon name="snowflake" className="w-3.5 h-3.5" /> NH3 Technical</span>
          <SplitHeading className="font-heading font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-white">
            NH3 Refrigeration <span className="text-gradient-cyan">Specialists</span>
          </SplitHeading>
          <p className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed">
            Ammonia refrigeration requires technical experience, safety awareness and correct system handling. TACS Cooling CC supports clients operating NH3 systems with maintenance, troubleshooting, inspection and operational support.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.label} type="clip" delay={(i % 2) * 0.08} as="div">
              <TiltCard className="flex items-center gap-4 p-5 rounded-2xl glass-card-dark">
                <span className="icon-tile w-11 h-11 bg-cyan-400/15 text-cyan-300 shrink-0"><Icon name={c.icon} className="w-5.5 h-5.5" /></span>
                <span className="font-heading font-semibold text-white text-sm">{c.label}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
