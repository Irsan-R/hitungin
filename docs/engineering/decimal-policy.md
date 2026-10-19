# Decimal policy — Issue #10

All financial-domain calculations use exact decimal strings and bigint coefficients. Do not pass JavaScript numbers to the engine; parse localized input at the UI boundary and serialize results as decimal strings. Decimal strings use a dot separator and no thousands grouping. UI formatting (IDR locale) is a separate concern.

The engine supports explicit `half-up`, `half-even`, and `down` (truncate toward zero). Division requires the caller to specify scale and rounding mode. Rounding **must not** be implicit. Scale is limited to 18 decimal places; multiplication may fail if the resulting scale exceeds this limit. Arithmetic does not impose an arbitrary amount cap, but callers must validate reasonable business limits.

**Important:** This is infrastructure, **not** a regulatory rule. PPh 21, BPJS, THR, loans and investment projections must each document the legally or contractually required rounding stage, scale and effective period before use. Never assume one policy applies to all calculators. Keep source references and regression fixtures per feature. No salary or financial input is sent to the server.

Test fixtures include 0.1+0.2, negative halfway values, ties-to-even, recurring fractions, large IDR integers, invalid decimal strings and zero denominator. Run with `npm test`.
