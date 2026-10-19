# Hitungin — Product Requirements Document

Version: 0.1 (draft) | Date: 2026-10-19 | Owner: Product

## Problem statement
Pengguna Indonesia membutuhkan simulasi finansial yang mudah dipahami dan dapat diaudit, bukan angka akhir tanpa penjelasan.

## Goals
- Membuat empat kalkulator: gaji, cicilan, tabungan, investasi.
- Menampilkan rincian, asumsi, formula dan sumber ketentuan.
- Responsif, cepat, accessible, dan tidak mewajibkan akun.

## Non-goals (MVP)
Login, penyimpanan cloud, personalisasi, ekspor PDF, pembayaran/premium, koneksi bank, nasihat investasi personal.

## Functional requirements
FR-01 Pengguna dapat mengisi, mengubah, dan mereset input.
FR-02 Input divalidasi dengan pesan yang jelas, termasuk batas dan format IDR.
FR-03 Hasil menampilkan breakdown, satuan, pembulatan, asumsi dan metode.
FR-04 Kalkulator gaji mendukung gross-to-net dan net-to-gross, PPh 21, BPJS dan THR sesuai ketentuan yang diverifikasi.
FR-05 Kalkulator cicilan mendukung bunga flat dan efektif/anuitas serta jadwal amortisasi.
FR-06 Kalkulator tabungan mendukung target, setoran rutin, periode, dan bunga majemuk.
FR-07 Kalkulator investasi mendukung setoran awal, berkala, return asumsi, dan perbandingan skenario.
FR-08 Referensi regulasi mencantumkan instansi, URL, tanggal berlaku, dan tanggal diverifikasi.

## Non-functional requirements
- Mobile-first, keyboard navigable, label formulir, kontras memadai.
- Deterministic pure calculation functions dengan automated tests dan fixtures.
- Tidak mengirim input finansial sensitif ke analytics; tidak menyimpan tanpa persetujuan.
- Error states dan loading states jelas.

## Acceptance criteria (MVP)
- Semua kalkulator dapat menghasilkan breakdown yang konsisten untuk test fixtures.
- Kasus nol, negatif, nilai besar, tanggal dan rounding diuji.
- Formula PPh 21/BPJS/THR diperiksa terhadap sumber resmi yang berlaku sebelum rilis.
- Hasil investasi diberi disclaimer bahwa simulasi bukan jaminan.
- QA mobile dan accessibility checklist selesai.

## Metrics (hypotheses)
Completion rate, validation error rate, repeat usage, calculation correctness on fixtures, performance, and qualitative usability feedback. Targets ditetapkan setelah baseline.

## Risks / open decisions
Regulasi berubah; metode PPh 21 dan status pekerja; rounding; rate bunga; arsitektur; scope estimasi. Semua wajib dikonfirmasi pada Sprint 0.
