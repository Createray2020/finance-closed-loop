# Application — 組合根 Composition Root

Next.js App Router 的邊界：Clerk 驗證中介、DI 綁定、API Routes、跨帳本/跨模組聚合。

- 這裡是**唯一**能同時 import 多個模組 Contract 的地方（例如 Cashflow 引擎注入 Expenses/Income/Foundation 的實作）。
- 業務模組彼此只透過 `Contract/` 溝通，禁止碰別人的 `Internal/`（由 dependency-cruiser 在 CI 擋）。
- 跨帳本/跨模組的聚合在此層做，不在資料層跨帳本 JOIN。
