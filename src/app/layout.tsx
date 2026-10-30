import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hanslay.atelier.dev"
  ),
  title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
  description:
    "Personal portfolio and technical writing of Hanslay. High-throughput distributed systems, autonomous AI agents, and editorial typographic design.",
  keywords: [
    "Hanslay",
    "Software Engineer",
    "AI Engineer",
    "Graphic Designer",
    "Machine Learning",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Hanslay" }],
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      fr: "/fr",
      "x-default": "/en",
    },
  },
  openGraph: {
    title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
    description:
      "Personal portfolio and technical writing of Hanslay. High-throughput distributed systems, autonomous AI agents, and editorial typographic design.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white text-[#201a16] font-sans antialiased selection:bg-[#e8e2d9] selection:text-[#201a16]">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
