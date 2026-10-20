import Link from "next/link";
import CalculatorPreview from "@/components/calculator-preview";
import "./preview.css";

export default function PreviewPage() {
  return <main className="container interactive-preview">
    <p className="eyebrow">SIMULASI AWAL</p>
    <h1>Preview perhitungan interaktif</h1>
    <p className="muted">Empat simulasi awal ini memakai asumsi sederhana. Hasilnya belum mencakup aturan pajak dan BPJS.</p>
    <CalculatorPreview />
    <p className="muted small">Simulasi edukasi, bukan nasihat keuangan atau perpajakan. <Link href="/">Kembali ke beranda</Link>.</p>
  </main>;
}
