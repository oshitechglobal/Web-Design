import Reveal from "../Reveal";
import Starfield from "../Starfield";
import Icon from "../Icon";

const PILLARS = [
  { icon: "shield-check", title: "NH3 Specialists", body: "Ammonia refrigeration experts you can trust.", highlight: false },
  { icon: "cog", title: "Industrial Solutions", body: "Custom-engineered systems for every industry.", highlight: false },
  { icon: "snowflake", title: "Maximum Reliability", body: "High-performance cooling that keeps you running.", highlight: false },
  { icon: "leaf", title: "Energy Efficient", body: "Sustainable, efficient systems built for the future.", highlight: false },
  { icon: "pin", title: "Proudly Namibian", body: "Supporting local industry with world-class cooling solutions.", highlight: true },
];

export default function TrustBar() {
  return (
    <section id="trust" aria-label="Why choose TACS Cooling" className="relative bg-navy-900 py-14 sm:py-16 overflow-hidden scroll-mt-20">
      <Starfield count={30} />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.05}
              className={
                p.highlight
                  ? "flex items-start gap-3.5 p-5 rounded-2xl bg-white shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)]"
                  : "flex items-start gap-3.5 p-5 rounded-2xl border border-white/8 bg-white/[0.03]"
              }
            >
              <span className={`icon-tile w-11 h-11 ${p.highlight ? "bg-navy-900/8 text-navy-800" : "bg-cyan-400/15 text-cyan-300"}`}>
                <Icon name={p.icon} className="w-5.5 h-5.5" />
              </span>
              <div>
                <h3 className={`font-heading font-semibold text-sm ${p.highlight ? "text-navy-900" : "text-white"}`}>{p.title}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${p.highlight ? "text-navy-600/70" : "text-white/50"}`}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
