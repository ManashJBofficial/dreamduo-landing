import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 35%, #fff7ed 100%)",
          color: "#1f2937",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          textAlign: "center",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fb7185",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            marginBottom: 16,
          }}
        >
          DreamDuo
        </div>
        <div style={{ lineHeight: 1.1 }}>
          Build Your Dreams Together
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 28,
            fontWeight: 500,
            color: "#475569",
          }}
        >
          Shared goals, savings, and habits for couples.
        </div>
      </div>
    ),
    size
  );
}
