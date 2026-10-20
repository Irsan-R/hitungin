/** Preliminary, non-regulatory projections. Inputs in IDR and nominal annual percentages. */
export function salaryNet(gross: number, deductions: number): number {
  if (![gross,deductions].every(Number.isFinite) || gross < 0 || deductions < 0 || deductions > gross) throw new RangeError("Input gaji tidak valid");
  return gross - deductions;
}
export function loanPayment(principal: number, annualRate: number, months: number, method: "flat" | "annuity"): number {
  if (![principal,annualRate,months].every(Number.isFinite) || principal <= 0 || annualRate < 0 || annualRate > 100 || !Number.isInteger(months) || months < 1 || months > 600) throw new RangeError("Input pinjaman tidak valid");
  const r=annualRate/1200;
  if (method === "flat") return principal/months + principal*r;
  if (r===0) return principal/months;
  return principal*r/(1-Math.pow(1+r,-months));
}
export function futureValue(initial: number, monthly: number, annualRate: number, years: number): number {
  if (![initial,monthly,annualRate,years].every(Number.isFinite) || initial<0 || monthly<0 || annualRate < -100 || annualRate>100 || !Number.isInteger(years) || years<1 || years>50) throw new RangeError("Input proyeksi tidak valid");
  const n=years*12,r=annualRate/1200;
  if(r===0) return initial+monthly*n;
  const factor=Math.pow(1+r,n);
  return initial*factor+monthly*(factor-1)/r;
}
