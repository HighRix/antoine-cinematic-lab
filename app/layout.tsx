import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/cinematic/SmoothScroll";
import { Preloader } from "@/components/cinematic/Preloader";
import { GrainOverlay } from "@/components/cinematic/GrainOverlay";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinematic Lab — Antoine",
  description: "Lab d'entraînement sites cinematic premium",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${serif.variable} antialiased`}>
      <body>
        <Preloader />
        <GrainOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
