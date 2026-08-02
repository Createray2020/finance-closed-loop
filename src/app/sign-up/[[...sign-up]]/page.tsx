import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", padding: 24, background: "#0e1116" }}>
      <SignUp />
    </div>
  );
}
