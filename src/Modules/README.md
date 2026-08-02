# 業務模組 Bounded Contexts

Expenses / Income / Cashflow / Projects，各自：

- `Contract/` — 🌟 唯一對外公開（介面 + DTO）。別的模組只能 import 這裡。
- `Internal/` — 🔒 外部完全封閉。實作、資料存取住這裡。

## 硬規則（dependency-cruiser 在 CI 擋死）
1. 禁止跨模組 import 別人的 `Internal/`。
2. 模組只能依賴 `@/Shared` 或其他模組的 `Contract/`。
3. `Cashflow` 是純運算引擎、不擁有資料，向 Expenses/Income/Foundation 的 Contract 要。
4. `Projects` 的收款節點＝帶 projectId 的預期收入，透過 `Income` Contract 建立/聚合。
