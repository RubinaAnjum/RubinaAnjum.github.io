import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(168,85,247,0.45), transparent 60%), radial-gradient(50% 50% at 0% 30%, rgba(34,211,238,0.35), transparent 60%), radial-gradient(80% 60% at 50% 110%, rgba(236,72,153,0.4), transparent 60%), #05060a",
          color: "#e6e8ef",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, opacity: 0.7 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              background: "linear-gradient(135deg, #22d3ee, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#05060a",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            {profile.initials}
          </div>
          <div>{profile.email}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            {profile.title}
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 600,
              lineHeight: 1.02,
              backgroundImage: "linear-gradient(135deg, #22d3ee, #a855f7 50%, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 30, opacity: 0.75, maxWidth: 900, lineHeight: 1.3 }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 22, opacity: 0.6 }}>
          {profile.roles.slice(0, 3).map((r) => (
            <div
              key={r}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
