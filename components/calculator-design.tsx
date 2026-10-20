"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {findCalculator} from "@/lib/catalog";
import {useWorkspace,type SavedResult} from "@/components/workspace-provider";
const configs:Record<string,{fields:[string,string][];result:string;breakdown:[string,string][];note:string}>={
"gaji-bersih":{fields:[["Gaji bruto per bulan","Rp 8.500.000"],["Total potongan","Rp 500.000"]],result:"Rp 8.000.000",breakdown:[["Gaji bruto","Rp 8.500.000"],["Total potongan","Rp 500.000"]],note:"Perhitungan pajak dan BPJS otomatis belum diterapkan."},
"cicilan":{fields:[["Jumlah pinjaman","Rp 100.000.000"],["Bunga per tahun","12%"],["Tenor","24 bulan"],["Metode bunga","Anuitas"]],result:"Rp 4.707.347",breakdown:[["Pokok pinjaman","Rp 100.000.000"],["Tenor","24 bulan"]],note:"Biaya administrasi, provisi, dan asuransi belum diperhitungkan."},
"target-tabungan":{fields:[["Dana awal","Rp 10.000.000"],["Setoran bulanan","Rp 1.000.000"],["Jangka waktu","5 tahun"]],result:"Rp 70.000.000",breakdown:[["Dana awal","Rp 10.000.000"],["Setoran","Rp 60.000.000"]],note:"Ilustrasi tanpa bunga, pajak, atau biaya."},
"simulasi-investasi":{fields:[["Dana awal","Rp 10.000.000"],["Setoran bulanan","Rp 1.000.000"],["Asumsi return tahunan","6%"]],result:"Simulasi hasil",breakdown:[["Jenis hasil","Proyeksi"],["Risiko","Nilai dapat turun"]],note:"Return bukan jaminan dan belum memperhitungkan pajak/biaya."},
"split-bill":{fields:[["Total tagihan","Rp 200.000"],["Jumlah orang","4"]],result:"Rp 50.000",breakdown:[["Total tagihan","Rp 200.000"],["Jumlah orang","4"]],note:"Pembagian rata; pembagian per item akan hadir pada implementasi."},
"diskon-pajak":{fields:[["Harga awal","Rp 100.000"],["Diskon","10%"],["Pajak","11%"]],result:"Rp 99.900",breakdown:[["Setelah diskon","Rp 90.000"],["Pajak ilustratif","Rp 9.900"]],note:"Persentase pajak contoh, bukan ketentuan untuk semua transaksi."},
"persentase":{fields:[["Nilai","200"],["Persentase","15%"]],result:"30",breakdown:[["Nilai awal","200"],["Persentase","15%"]],note:"Contoh 15% dari 200."}
};
export function CalculatorDesign({slug}:{slug:string}){
 const c=configs[slug];const {results,remember,visit}=useWorkspace();
 const [values,setValues]=useState(c.fields.map(x=>x[1]));
 const [tab,setTab]=useState("kalkulator");
 const [expanded,setExpanded]=useState(true);
 const [calculated,setCalculated]=useState(false);
 const [dirty,setDirty]=useState(false);
 const [imported,setImported]=useState<string|null>(null);
 useEffect(()=>{visit(slug)},[slug]);
 const related:Record<string,string[]>={
 "gaji-bersih":["cicilan","target-tabungan","simulasi-investasi"],
 "cicilan":["gaji-bersih","target-tabungan"],
 "target-tabungan":["gaji-bersih","simulasi-investasi"],
 "simulasi-investasi":["target-tabungan","gaji-bersih"],
 "split-bill":["diskon-pajak","persentase"],
 "diskon-pajak":["split-bill","persentase"],
 "persentase":["diskon-pajak","split-bill"]
 };
 const sources=results.filter(x=>x.slug!==slug);
 const save=()=>{setCalculated(true);setDirty(false);remember({slug,title:findCalculator(slug)?.item[1]||slug,label:"Hasil contoh",value:c.result})};
 const importValue=(source:SavedResult)=>{setValues(old=>old.map((v,i)=>i===0?source.value:v));setImported(source.title);setDirty(true)};
 return <><div className="tabs" role="tablist" aria-label="Informasi kalkulator">{[["kalkulator","Kalkulator"],["penjelasan","Penjelasan"],["asumsi","Asumsi"]].map(([id,label])=><button role="tab" aria-selected={tab===id} className={tab===id?"active":""} key={id} onClick={()=>setTab(id)}>{label}</button>)}</div>
 {tab==="kalkulator"?<div className="calc-grid"><section className="form-card"><h2>Detail perhitungan</h2>
 {sources.length>0&&<div className="transfer-panel"><strong>Gunakan hasil dari kalkulator lain</strong><p className="small muted">Nilai tidak diisi otomatis. Pilih sumber untuk menyalin nilainya ke input pertama, lalu periksa kembali kesesuaian satuan dan periode.</p>{sources.map(source=><button className="transfer-option" key={source.slug} onClick={()=>importValue(source)}><span>{source.title}<small>{source.value} · contoh hasil</small></span><span>Gunakan →</span></button>)}{imported&&<p className="transfer-notice" role="status">Nilai dari {imported} disalin. Pastikan cocok dengan field tujuan.</p>}</div>}
 {c.fields.map(([label],i)=><label className="field" key={label}><span>{label}</span><input value={values[i]} onChange={e=>{setValues(old=>old.map((v,j)=>j===i?e.target.value:v));setDirty(true)}}/></label>)}
 <button className="primary-button" onClick={save}>Lihat contoh hasil →</button><p className="small muted">Preview UI saja. Nilai contoh disimpan selama sesi browser, bukan dihitung dari input.</p></section>
 <section className="result-card"><p className="eyebrow">HASIL PERHITUNGAN</p>{!calculated?<div className="empty-state"><span aria-hidden="true">▧</span><h2>Belum ada hasil</h2><p>Isi formulir dan pilih “Lihat contoh hasil” untuk melihat tampilan hasil.</p></div>:<>{dirty&&<p className="stale-note" role="status">Input berubah. Contoh hasil di bawah belum diperbarui.</p>}<p className="muted small">Contoh estimasi</p><strong className="result-value">{c.result}</strong><div className="result-divider"/><button className="accordion" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>Rincian perhitungan <span>{expanded?"−":"+"}</span></button>{expanded&&<div className="breakdown">{c.breakdown.map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>}</>}
 <div className="assumption"><strong>Asumsi & batasan</strong><p>{c.note}</p></div>
 <div className="related-calculators"><strong>Lanjut hitung apa?</strong><p className="small muted">Buka kalkulator berikutnya tanpa kembali ke homepage.</p>{(related[slug]||[]).map(next=>{const f=findCalculator(next);return f?<Link href={"/kalkulator/"+next+"/"} key={next}>{f.item[1]} <span aria-hidden="true">→</span></Link>:null})}</div>
 </section></div>:<div className="info-panel"><h2>{tab==="penjelasan"?"Tentang kalkulator ini":"Asumsi perhitungan"}</h2><p>{tab==="penjelasan"?"Halaman ini menunjukkan rancangan pengalaman kalkulator: input, hasil utama, rincian, dan navigasi.":"Semua angka adalah ilustrasi desain. Aturan dan akurasi akan diuji ketika mesin hitung diintegrasikan."}</p></div>}</>;
}