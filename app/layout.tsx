import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import IceEnvironment from "@/components/IceEnvironment";

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
    <html lang="en">
      <body className="bg-bg-main text-content-main min-h-screen flex flex-col antialiased transition-colors duration-250">
        <ThemeProvider>
          <IceEnvironment />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <footer className="bg-surface border-t border-stroke py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-content-muted transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-content-main tracking-wider">POLARQUEST</span>
                <span>— Ministry of Earth Sciences (MoES) Prototype</span>
              </div>
              <div>
                Built for Smart India Hackathon (SIH26063) | Next.js, Supabase, Gemini AI, Three.js & Open-Meteo
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}


