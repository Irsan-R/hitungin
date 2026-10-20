"use client";
import { useState } from "react";
import { futureValue, loanPayment, salaryNet } from "@/lib/calculations/preview";
type Kind = "gaji" | "cicilan" | "tabungan" | "investasi";
const features: {id:Kind;title:string;description:string}[] = [
{id:"gaji",title:"Gaji Bersih",description:"Simulasikan take-home pay dari potongan yang kamu masukkan."},
{id:"cicilan",title:"Cicilan",description:"Bandingkan angsuran bunga flat dan anuitas."},
{id:"tabungan",title:"Tabungan",description:"Proyeksikan saldo dengan setoran bulanan."},
{id:"investasi",title:"Investasi",description:"Simulasikan nilai investasi berdasarkan asumsi return."}
];
const rupiah=(n:number)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function Field({label,value,onChange,min=0,max=1e15,step="any"}:{label:string;value:number;onChange:(v:number)=>void;min?:number;max?:number;step?:string}){
return <label className="field"><span>{label}</span><input type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={e=>onChange(e.target.value===""?NaN:Number(e.target.value))}/></label>;
}
export default function CalculatorPreview(){
const [active,setActive]=useState<Kind|null>(null);
const [gross,setGross]=useState(8500000),[deductions,setDeductions]=useState(500000);
const [principal,setPrincipal]=useState(100000000),[rate,setRate]=useState(12),[months,setMonths]=useState(24),[method,setMethod]=useState<"flat"|"annuity">("annuity");
const [initial,setInitial]=useState(10000000),[monthly,setMonthly]=useState(1000000),[returnRate,setReturnRate]=useState(6),[years,setYears]=useState(5);
let result: number|null=null;let secondary="";let error="";
try{
if(active==="gaji"){result=salaryNet(gross,deductions);secondary="Potongan diisi manual. PPh 21 dan BPJS otomatis belum tersedia.";}
if(active==="cicilan"){result=loanPayment(principal,rate,months,method);secondary="Total pembayaran: "+rupiah(result*months)+". Belum termasuk biaya administrasi, provisi, asuransi, dan biaya lain.";}
if(active==="tabungan"||active==="investasi"){result=futureValue(initial,monthly,returnRate,years);secondary="Total setoran: "+rupiah(initial+monthly*years*12)+". Asumsi bunga/return nominal tahunan, dikonversi bulanan; setoran di akhir bulan, tanpa pajak atau biaya.";}
}catch(e){error=e instanceof Error?e.message:"Input tidak valid";}
return <section aria-labelledby="features"><h2 id="features">Pilih kalkulator</h2><p className="section-note">Klik salah satu kartu untuk mulai menghitung.</p>
<div className="grid">{features.map(f=><button type="button" key={f.id} className={"card feature-button "+(active===f.id?"selected":"")} onClick={()=>setActive(f.id)} aria-pressed={active===f.id}><h3>{f.title} <span aria-hidden="true">→</span></h3><p>{f.description}</p></button>)}</div>
{active&&<div className="calculator-panel" id="calculator"><div className="panel-head"><div><p className="eyebrow">SIMULATOR · PREVIEW</p><h2>{features.find(f=>f.id===active)?.title}</h2></div><button type="button" className="close-button" onClick={()=>setActive(null)}>Tutup ×</button></div>
<div className="form-grid">
{active==="gaji"&&<><Field label="Gaji bruto per bulan (Rp)" value={gross} onChange={setGross}/><Field label="Total potongan per bulan (Rp)" value={deductions} onChange={setDeductions}/></>}
{active==="cicilan"&&<><Field label="Pokok pinjaman (Rp)" value={principal} onChange={setPrincipal}/><Field label="Bunga nominal per tahun (%)" value={rate} onChange={setRate} max={100}/><Field label="Tenor (bulan)" value={months} onChange={setMonths} min={1} max={600} step="1"/><label className="field"><span>Metode bunga</span><select value={method} onChange={e=>setMethod(e.target.value as "flat"|"annuity")}><option value="annuity">Anuitas (angsuran tetap)</option><option value="flat">Flat</option></select></label></>}
{(active==="tabungan"||active==="investasi")&&<><Field label="Dana awal (Rp)" value={initial} onChange={setInitial}/><Field label="Setoran tiap bulan (Rp)" value={monthly} onChange={setMonthly}/><Field label={active==="investasi"?"Asumsi return per tahun (%)":"Asumsi bunga per tahun (%)"} value={returnRate} onChange={setReturnRate} min={-100} max={100}/><Field label="Jangka waktu (tahun)" value={years} onChange={setYears} min={1} max={50} step="1"/></>}
</div><div className="result" aria-live="polite">{error?<p role="alert">{error}</p>:result!==null&&Number.isFinite(result)?<><span>{active==="gaji"?"Estimasi gaji bersih per bulan":active==="cicilan"?"Estimasi cicilan per bulan":"Proyeksi saldo akhir"}</span><strong>{rupiah(result)}</strong><p>{secondary}</p></>:<p role="alert">Hasil di luar rentang yang didukung. Periksa input.</p>}</div>
<p className="disclaimer">Simulasi edukasi, bukan penawaran kredit, nasihat investasi, atau perhitungan pajak resmi. Nilai akhir dapat berbeda karena pembulatan, biaya, pajak, dan kebijakan penyedia.</p>
</div>}</section>;
}
