# 個人財務閉環系統（Personal Finance Closed-Loop）

浮動收入者的現金流預測與決策引擎：任一天打開就知道未來 90 天會不會斷鏈、哪天最危險、要爆時砍哪幾筆就安全。定位「預測型」而非「記錄型」。

## 技術棧
Next.js 16 (App Router) · TypeScript · Tailwind · Neon (Postgres) · Clerk · Vercel · 手機為主 PWA

## 架構：模組化單體
四個業務模組，各自 `Contract/`（對外）＋ `Internal/`（封閉）：

```
src/
  Shared/                 帳本 Ledgers・帳戶/卡 Foundation・Money・db
  Modules/
    Expenses/  {Contract, Internal}   支出：項目/展開/記帳/封帳/漏記/可壓縮
    Income/    {Contract, Internal}   收入：即時/預期＋確認入帳
    Cashflow/  {Contract, Internal}   現金流：90天曲線/三數字/警示/What-if（純運算）
    Projects/  {Contract, Internal}   專案：排程/待辦/每月階段性總結＋收款節點連動
  Application/            組合根：Clerk・DI・API Routes・跨模組聚合
```

**帳本(Ledger)是核心維度**：每筆業務資料綁 `ledgerId`；切「全部/單一帳本」在聚合層做，不跨帳本 JOIN。

## 邊界防護
`npm run depcruise` — dependency-cruiser 擋「跨模組 import 別人的 Internal」「Shared 依賴業務模組」「循環依賴」。
`npm run check` — lint + depcruise + tsc。

## 開發
複製 `.env.example` 成 `.env.local` 填 Neon/Clerk。`npm run dev`。

規格見專案資料夾 `spec-財務閉環系統-批次1.md`、架構藍圖 artifact `finance-architecture-batch1`。
