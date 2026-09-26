import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PolarQuest | MoES Polar Research & Smart Education Platform",
  description: "Interactive 3D Polar Earth platform combining Indian polar station data, live telemetry, AI PDF ingestion, and smart educational simulations.",
  keywords: ["PolarQuest", "MoES", "Antarctica", "Arctic", "Bharati Station", "Maitri Station", "Himadri", "Himansh", "Polar Science", "Smart Education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-navy-950 border-t border-polar-500/20 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-polar-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-wider">POLARQUEST</span>
              <span>— Ministry of Earth Sciences (MoES) Prototype</span>
            </div>
            <div>
              Built for Smart India Hackathon (SIH26063) | Next.js, Supabase, Gemini AI, Three.js & Open-Meteo
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
