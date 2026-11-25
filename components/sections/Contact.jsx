"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import SplitHeading from "../SplitHeading";
import Magnetic from "../Magnetic";
import Icon from "../Icon";

export default function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Thanks — we've received your request and will respond shortly.");
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <span className="pill-badge pill-badge--light mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Get in Touch
          </span>
          <SplitHeading className="font-heading font-bold text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-navy-950">
            Request <span className="text-gradient-cyan">Cooling Support</span>
          </SplitHeading>
          <p className="mt-6 text-navy-600 text-base sm:text-lg leading-relaxed">
            Tell us about your cooling requirement — installation, maintenance, NH3 support or an urgent breakdown. We&apos;ll respond promptly.
          </p>

          <div className="mt-8 space-y-4">
            <Reveal className="flex items-center gap-4 p-5 rounded-2xl bg-ice-50 border border-navy-900/6">
              <span className="icon-tile w-12 h-12 bg-navy-950 text-cyan-300 shrink-0"><Icon name="building" className="w-5.5 h-5.5" /></span>
              <div><p className="font-heading font-bold text-navy-950">TACS Cooling CC</p><p className="text-navy-600 text-sm">Industrial Cooling &amp; NH3 Refrigeration</p></div>
            </Reveal>
            <Reveal delay={0.05} className="flex items-center gap-4 p-5 rounded-2xl bg-ice-50 border border-navy-900/6">
              <span className="icon-tile w-12 h-12 bg-cyan-50 text-cyan-600 shrink-0"><Icon name="pin" className="w-5.5 h-5.5" /></span>
              <div><p className="font-heading font-bold text-navy-950">Address</p><p className="text-navy-600 text-sm">PO Box 2592, Walvis Bay, Namibia</p></div>
            </Reveal>
            <Reveal delay={0.1} className="flex items-center gap-4 p-5 rounded-2xl bg-ice-50 border border-navy-900/6">
              <span className="icon-tile w-12 h-12 bg-cyan-50 text-cyan-600 shrink-0"><Icon name="clipboard-check" className="w-5.5 h-5.5" /></span>
              <div><p className="font-heading font-bold text-navy-950">Registration</p><p className="text-navy-600 text-sm">CC/2022/06029 &middot; VAT 13226672-015</p></div>
            </Reveal>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 shadow-[0_30px_60px_-24px_rgba(11,26,61,0.2)] space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="f-name" className="field-label">Name <span className="text-cyan-600">*</span></label>
                <input id="f-name" name="name" type="text" required className="field mt-2" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="f-company" className="field-label">Company</label>
                <input id="f-company" name="company" type="text" className="field mt-2" placeholder="Company name" />
              </div>
              <div>
                <label htmlFor="f-phone" className="field-label">Phone</label>
                <input id="f-phone" name="phone" type="tel" className="field mt-2" placeholder="+264 ..." />
              </div>
              <div>
                <label htmlFor="f-email" className="field-label">Email <span className="text-cyan-600">*</span></label>
                <input id="f-email" name="email" type="email" required className="field mt-2" placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="f-location" className="field-label">Location</label>
                <input id="f-location" name="location" type="text" className="field mt-2" placeholder="Site / town" />
              </div>
              <div>
                <label htmlFor="f-service" className="field-label">Service Required</label>
                <input id="f-service" name="service" type="text" className="field mt-2" placeholder="e.g. NH3 maintenance, breakdown" />
              </div>
            </div>
            <div>
              <label htmlFor="f-message" className="field-label">Message</label>
              <textarea id="f-message" name="message" rows={4} className="field mt-2 resize-none" placeholder="Describe your cooling requirement..." />
            </div>
            <Magnetic>
              <button type="submit" className="btn btn-dark w-full sm:w-auto">
                Send Request <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </Magnetic>
            <p role="status" className={`text-sm text-emerald-600 font-medium${status ? "" : " hidden"}`}>{status}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
