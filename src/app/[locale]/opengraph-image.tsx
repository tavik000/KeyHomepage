import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Key — Gameplay Programmer specializing in Unreal Engine 5 and C++";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/og-fonts");
const artPath = join(process.cwd(), "src/assets/og/hyke-og-art.jpg");

export default async function Image() {
  const [zenOldMincho700, inter400, inter600, plexMono500] = await Promise.all([
    readFileSync(join(fontDir, "ZenOldMincho-700.woff")),
    readFileSync(join(fontDir, "Inter-400.woff")),
    readFileSync(join(fontDir, "Inter-600.woff")),
    readFileSync(join(fontDir, "IBMPlexMono-500.woff"))
  ]);
  const artBase64 = readFileSync(artPath).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0b0d"
        }}
      >
        <div
          style={{
            width: 660,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px"
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Zen Old Mincho",
              fontSize: 132,
              fontWeight: 700,
              color: "#eaeae6",
              lineHeight: 1
            }}
          >
            Key
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 38,
              color: "#eaeae6"
            }}
          >
            Gameplay Programmer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontFamily: "IBM Plex Mono",
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: 1.5,
              color: "#e0705f"
            }}
          >
            Unreal Engine 5 • C++
          </div>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 3,
              background: "#ce4a3b",
              marginTop: 32,
              marginBottom: 32
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: 22,
              color: "#9a9aa0"
            }}
          >
            5+ Years Professional Experience
          </div>
        </div>

        <div
          style={{
            width: 540,
            height: "100%",
            display: "flex",
            position: "relative"
          }}
        >
          <img
            src={`data:image/jpeg;base64,${artBase64}`}
            width={540}
            height={630}
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              background:
                "linear-gradient(to right, #0b0b0d 0%, rgba(11,11,13,0) 22%)"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              background:
                "linear-gradient(to top, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0) 30%)"
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zen Old Mincho", data: zenOldMincho700, weight: 700, style: "normal" },
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: plexMono500, weight: 500, style: "normal" }
      ]
    }
  );
}
