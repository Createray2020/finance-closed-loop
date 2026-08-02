"use client";

import { UserButton } from "@clerk/nextjs";

// 首頁已由 middleware gate（未登入會被導向 /sign-in），故頁首直接顯示。
export default function AppHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        borderBottom: "1px solid #2a323d",
        background: "#0e1116",
        color: "#e8edf3",
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      <span>個人財務閉環系統</span>
      <UserButton />
    </header>
  );
}
