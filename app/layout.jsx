import "./globals.css";
import IconSprite from "@/components/IconSprite";
import ProgressBar from "@/components/ProgressBar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "TACS Cooling CC | Industrial Cooling & NH3 Refrigeration Specialists",
  description:
    "TACS Cooling CC is a Namibian cooling and refrigeration company focused on reliable industrial cooling systems, ammonia (NH3) refrigeration, cold room support, maintenance, and technical service delivery. Based in Walvis Bay, Namibia.",
  openGraph: {
    title: "TACS Cooling CC | Industrial Cooling & NH3 Refrigeration Specialists",
    description:
      "Reliable. Efficient. Built for Namibia. Specialist in the design, installation and maintenance of industrial ammonia (NH3) refrigeration and cooling systems.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23060d20'/%3E%3Ccircle cx='32' cy='30' r='9' fill='%232dd4ee'/%3E%3Ccircle cx='48' cy='18' r='4.5' fill='%237dd3fc'/%3E%3Ccircle cx='16' cy='16' r='4.5' fill='%237dd3fc'/%3E%3Ccircle cx='34' cy='48' r='4.5' fill='%237dd3fc'/%3E%3Cpath stroke='%237dd3fc' stroke-width='2' d='M32 30 48 18M32 30 16 16M32 30 34 48'/%3E%3C/svg%3E",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060d20",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ice-50 font-sans text-navy-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[999] focus:bg-white focus:text-navy-900 focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <ProgressBar />
          <IconSprite />
          <CustomCursor />
          <SiteNav />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
