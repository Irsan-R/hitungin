const calculators = [
  { title: "Gaji Bersih", description: "Gross, net, PPh 21, BPJS, dan THR." },
  { title: "Cicilan", description: "Bandingkan bunga flat dan anuitas." },
  { title: "Tabungan", description: "Rencanakan target dan setoran berkala." },
  { title: "Investasi", description: "Simulasi skenario, bukan jaminan hasil." },
];

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow">HITUNGIN · EARLY PREVIEW</p>
        <h1>Hitung keuangan jadi lebih jelas.</h1>
        <p className="subtitle">Kalkulator finansial untuk Indonesia, dengan rincian dan asumsi yang mudah dipahami.</p>
        <span className="pill">Sedang dalam pengembangan</span>
      </header>
      <section aria-labelledby="features"><h2 id="features">Segera hadir</h2>
        <div className="grid">{calculators.map((item) => <article className="card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <footer>Hitungin · Hasil perhitungan nantinya bersifat simulasi, bukan nasihat keuangan atau perpajakan.</footer>
    </main>
  );
}
