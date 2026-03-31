import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  display: "swap",
});

export default function SolévistaLogo({ dark = false }: { dark?: boolean }) {
  const color = dark ? "#ffffff" : "#111111";

  return (
    <Link
      href="/"
      className="flex-shrink-0 hover:opacity-70 transition-opacity duration-200"
      aria-label="Solévista home"
    >
      <span
        className={playfair.className}
        style={{
          fontSize: "22px",
          fontWeight: 700,
          fontStyle: "italic",
          letterSpacing: "0em",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
          gap: 0,
          color,
        }}
      >
        Snea
        <span
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px #EAB308",
          }}
        >
          Q
        </span>
        r
      </span>
    </Link>
  );
}
