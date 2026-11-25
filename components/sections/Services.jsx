import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import ParallaxOrb from "../ParallaxOrb";
import TiltCard from "../TiltCard";
import Icon from "../Icon";

const SERVICES = [
  { icon: "atom", title: "NH3 / Ammonia Refrigeration", body: "Specialist support for ammonia-based industrial refrigeration systems." },
  { icon: "warehouse", title: "Industrial Cooling Systems", body: "Cooling solutions for commercial, industrial, marine, logistics, food and storage applications." },
  { icon: "building", title: "Cold Rooms & Cold Storage", body: "Installation, maintenance, repairs and optimisation of cold storage facilities." },
  { icon: "wrench", title: "Refrigeration Maintenance", body: "Preventative maintenance, inspections, servicing and system performance checks." },
  { icon: "bell-alert", title: "Breakdown Support", body: "Responsive technical support for refrigeration failures and urgent cooling problems." },
  { icon: "clipboard-check", title: "Compliance & Safety Support", body: "Support for safe operation, inspections and technical documentation around cooling systems." },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-white py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      <ParallaxOrb className="w-[26rem] h-[26rem] bg-navy-600/8 top-1/3 -left-40" speed={0.08} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <Reveal className="max-w-2xl mx-auto text-center" as="div">
          <span className="pill-badge pill-badge--light mb-6"><Icon name="snowflake" className="w-3.5 h-3.5" /> Our Services</span>
          <SplitHeading className="font-heading font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-navy-950">
            Refrigeration services <span className="text-gradient-cyan">built for industry</span>
          </SplitHeading>
          <p className="mt-5 text-navy-600 text-base sm:text-lg leading-relaxed">
            From plant-room support to cold storage installation — a complete technical offering for operations that depend on reliable cooling.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} type="clip" delay={(i % 3) * 0.08} as="div">
              <TiltCard
                as="article"
                className="group p-8 rounded-3xl bg-gradient-to-b from-ice-100 to-ice-50 border border-navy-900/6 hover:border-cyan-400/40 hover:shadow-[0_24px_48px_-20px_rgba(6,182,212,0.35)]"
              >
                <span className="icon-tile w-14 h-14 bg-navy-950 text-cyan-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={s.icon} className="w-7 h-7" />
                </span>
                <h3 className="font-heading font-bold text-xl text-navy-950">{s.title}</h3>
                <p className="mt-3 text-navy-600 leading-relaxed">{s.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
