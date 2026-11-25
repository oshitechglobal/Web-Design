import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import ParallaxOrb from "../ParallaxOrb";
import TiltCard from "../TiltCard";
import Icon from "../Icon";

const FACTS = [
  { icon: "building", tile: "bg-navy-900 text-white", label: "Company", value: "TACS Cooling CC" },
  { icon: "pin", tile: "bg-cyan-50 text-cyan-600", label: "Location", value: "Walvis Bay, Namibia" },
  { icon: "clipboard-check", tile: "bg-cyan-50 text-cyan-600", label: "Registration", value: "CC/2022/06029" },
  { icon: "shield-check", tile: "bg-cyan-50 text-cyan-600", label: "VAT", value: "13226672-015" },
  { icon: "mail", tile: "bg-cyan-50 text-cyan-600", label: "Postal", value: "PO Box 2592, Walvis Bay" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ice-50 py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      <ParallaxOrb className="w-[28rem] h-[28rem] bg-cyan-400/15 -top-24 -right-32" speed={0.12} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-start relative">
        <Reveal>
          <span className="pill-badge pill-badge--light mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> About TACS Cooling
          </span>
          <SplitHeading className="font-heading font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-navy-950">
            Specialist Cooling Services <span className="text-gradient-cyan">from Walvis Bay</span>
          </SplitHeading>
          <p className="mt-6 text-navy-600 text-base sm:text-lg leading-relaxed">
            TACS Cooling CC is a Namibian cooling and refrigeration company focused on reliable industrial cooling systems, ammonia refrigeration, cold room support, maintenance, and technical service delivery. We support clients who need dependable cooling performance, safe operation, and responsive technical support.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-navy-800 font-medium"><Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" /> Dependable industrial cooling performance</li>
            <li className="flex items-center gap-3 text-navy-800 font-medium"><Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" /> Safe NH3 ammonia system handling</li>
            <li className="flex items-center gap-3 text-navy-800 font-medium"><Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" /> Responsive technical support across Namibia</li>
          </ul>
        </Reveal>

        <Reveal type="clip" className="lg:pt-8">
          <TiltCard className="glass-card rounded-3xl p-2 shadow-[0_30px_60px_-24px_rgba(11,26,61,0.25)]">
            <div className="rounded-[1.35rem] border border-navy-900/5 divide-y divide-navy-900/8">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-4 p-5">
                  <span className={`icon-tile w-12 h-12 ${f.tile}`}><Icon name={f.icon} className="w-5.5 h-5.5" /></span>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-navy-500">{f.label}</p>
                    <p className="font-heading font-bold text-navy-950">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
