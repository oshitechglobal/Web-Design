import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import Starfield from "../Starfield";
import SteamField from "../SteamField";
import Magnetic from "../Magnetic";
import Icon from "../Icon";

export default function CTABand() {
  return (
    <section aria-label="Request cooling support" className="relative py-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 -mt-4 mb-4">
        <Reveal
          as="div"
          className="relative cta-band rounded-[2rem] p-9 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_30px_60px_-20px_rgba(6,13,32,0.5)]"
        >
          <Starfield count={16} />
          <SteamField soft puffs={[3]} />
          <div className="relative z-10">
            <SplitHeading as="h2" className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Need cooling support? Talk to the TACS team.
            </SplitHeading>
            <p className="mt-3 text-white/60 max-w-xl">
              Maintenance schedules, NH3 plant-room support, cold storage installation, or urgent breakdown response — we&apos;re ready.
            </p>
          </div>
          <Magnetic>
            <a href="#contact" className="btn btn-light relative z-10 shrink-0">
              Request Support <Icon name="arrow-right" className="w-4 h-4" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
