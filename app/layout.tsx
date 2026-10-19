import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hitungin — Kalkulator Finansial Indonesia",
  description: "Simulasi finansial Indonesia dengan asumsi dan perhitungan transparan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
