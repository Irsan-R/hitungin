import Link from "next/link";

export default function NotFound() {
  return <main style={{ padding: "4rem", fontFamily: "Arial, sans-serif" }}><h1>Halaman tidak ditemukan</h1><p>Kembali ke <Link href="/">Hitungin</Link>.</p></main>;
}
