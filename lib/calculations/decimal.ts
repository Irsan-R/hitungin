/** Exact base-10 arithmetic backed by bigint; no binary floating-point in calculations. */
export type RoundingMode = "half-up" | "half-even" | "down";
export type Decimal = Readonly<{ coefficient: bigint; scale: number }>;

const MAX_SCALE = 18;
function assertScale(scale: number): void {
  if (!Number.isInteger(scale) || scale < 0 || scale > MAX_SCALE) throw new RangeError("Invalid decimal scale");
}
function pow10(n: number): bigint { assertScale(n); return 10n ** BigInt(n); }

export function decimal(input: string): Decimal {
  if (!/^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(input)) throw new TypeError("Invalid decimal string");
  const negative = input.startsWith("-");
  const unsigned = input.replace(/^[+-]/, "");
  const [whole, fraction = ""] = unsigned.split(".");
  assertScale(fraction.length);
  const coefficient = BigInt(whole + fraction) * (negative ? -1n : 1n);
  return { coefficient, scale: fraction.length };
}

export function formatDecimal(value: Decimal): string {
  assertScale(value.scale);
  const sign = value.coefficient < 0n ? "-" : "";
  const digits = (value.coefficient < 0n ? -value.coefficient : value.coefficient).toString();
  if (value.scale === 0) return sign + digits;
  const padded = digits.padStart(value.scale + 1, "0");
  return sign + padded.slice(0, -value.scale) + "." + padded.slice(-value.scale);
}

export function add(a: Decimal, b: Decimal): Decimal {
  const scale = Math.max(a.scale, b.scale);
  return { coefficient: a.coefficient * pow10(scale - a.scale) + b.coefficient * pow10(scale - b.scale), scale };
}
export function subtract(a: Decimal, b: Decimal): Decimal {
  return add(a, { coefficient: -b.coefficient, scale: b.scale });
}
export function multiply(a: Decimal, b: Decimal): Decimal {
  const scale = a.scale + b.scale;
  assertScale(scale);
  return { coefficient: a.coefficient * b.coefficient, scale };
}
export function round(value: Decimal, scale: number, mode: RoundingMode): Decimal {
  assertScale(scale);
  if (scale >= value.scale) return { coefficient: value.coefficient * pow10(scale - value.scale), scale };
  const divisor = pow10(value.scale - scale);
  const sign = value.coefficient < 0n ? -1n : 1n;
  const absolute = value.coefficient * sign;
  const quotient = absolute / divisor;
  const remainder = absolute % divisor;
  const increment = mode === "down" ? 0n : mode === "half-up"
    ? (remainder * 2n >= divisor ? 1n : 0n)
    : (remainder * 2n > divisor || (remainder * 2n === divisor && quotient % 2n === 1n) ? 1n : 0n);
  return { coefficient: sign * (quotient + increment), scale };
}
export function divide(a: Decimal, b: Decimal, scale: number, mode: RoundingMode): Decimal {
  assertScale(scale);
  if (b.coefficient === 0n) throw new RangeError("Division by zero");
  const exponent = b.scale + scale - a.scale;
  const numerator = a.coefficient * pow10(Math.max(0, exponent));
  const denominator = b.coefficient * pow10(Math.max(0, -exponent));
  const negative = (numerator < 0n) !== (denominator < 0n);
  const absN = numerator < 0n ? -numerator : numerator;
  const absD = denominator < 0n ? -denominator : denominator;
  const quotient = absN / absD;
  const remainder = absN % absD;
  const increment = mode === "down" ? 0n : mode === "half-up"
    ? (remainder * 2n >= absD ? 1n : 0n)
    : (remainder * 2n > absD || (remainder * 2n === absD && quotient % 2n === 1n) ? 1n : 0n);
  return { coefficient: (negative ? -1n : 1n) * (quotient + increment), scale };
}
