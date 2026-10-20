import CalculatorPreview from "@/components/calculator-preview";

export default function Home() {
 return <main className="container"><header className="hero"><p className="eyebrow">HITUNGIN · INTERACTIVE PREVIEW</p><h1>Hitung keuangan jadi lebih jelas.</h1><p className="subtitle">Kalkulator finansial untuk Indonesia, dengan rincian dan asumsi yang mudah dipahami.</p><span className="pill">Versi simulasi awal</span></header><CalculatorPreview/><footer>Hitungin · Hasil perhitungan bersifat simulasi, bukan nasihat keuangan atau perpajakan.</footer></main>;
}
