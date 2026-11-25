import Icon from "./Icon";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#nh3-specialists", label: "NH3 Specialists" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-900 pt-16 pb-8">
      <div className="wave-divider absolute -top-px inset-x-0 text-navy-900">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#0b1a3d" opacity="0.5" d="M0,32 C240,80 480,0 720,24 C960,48 1200,88 1440,40 L1440,0 L0,0 Z" />
          <path fill="#0e2352" d="M0,48 C240,16 480,72 720,48 C960,24 1200,56 1440,32 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-navy-600">
                <Icon name="atom" className="w-5 h-5 text-navy-950" />
              </span>
              <span className="font-heading font-bold text-white text-lg">TACS Cooling CC</span>
            </div>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              TACS Cooling CC — Industrial Cooling &amp; NH3 Refrigeration Specialists. Namibia-based technical service for ammonia systems, cold storage and industrial cooling.
            </p>
          </div>

          <div>
            <p className="text-cyan-300 text-xs font-semibold tracking-[0.16em] uppercase mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/60">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-cyan-300 text-xs font-semibold tracking-[0.16em] uppercase mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5"><Icon name="pin" className="w-4 h-4 mt-0.5 text-cyan-300 shrink-0" /> PO Box 2592, Walvis Bay, Namibia</li>
              <li className="flex items-start gap-2.5"><Icon name="clipboard-check" className="w-4 h-4 mt-0.5 text-cyan-300 shrink-0" /> CC/2022/06029</li>
              <li className="flex items-start gap-2.5"><Icon name="shield-check" className="w-4 h-4 mt-0.5 text-cyan-300 shrink-0" /> VAT 13226672-015</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; <span>{year}</span> TACS Cooling CC. All rights reserved.</p>
          <p>CC/2022/06029 &middot; VAT 13226672-015</p>
        </div>
      </div>
    </footer>
  );
}
