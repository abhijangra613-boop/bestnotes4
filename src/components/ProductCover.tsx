type CoverProps = {
  title: string;
  subtitle?: string;
  accent: [string, string];
  icon: string;
  thumbnail?: string;
  size?: "sm" | "md" | "lg";
  updated?: string;
};

export function ProductCover({
  title,
  subtitle,
  accent,
  icon,
  thumbnail,
  size = "md",
  updated,
}: CoverProps) {
  const height = size === "lg" ? 420 : size === "sm" ? 200 : 260;

  // If thumbnail exists, show it instead of the SVG
  if (thumbnail) {
    return (
      <img
        src={thumbnail}
        alt={title}
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          display: "block",
          borderRadius: 12,
        }}
      />
    );
  }

  const id = `g-${accent[0].replace("#", "")}-${accent[1].replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height, display: "block" }}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent[0]} />
          <stop offset="100%" stopColor={accent[1]} />
        </linearGradient>

        <radialGradient id={`${id}-r`} cx="0.8" cy="0.15" r="0.8">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="520" fill={`url(#${id})`} />
      <rect width="400" height="520" fill={`url(#${id}-r)`} />

      <g opacity="0.12" stroke="white" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" y1={40 + i * 36} x2="400" y2={40 + i * 36} />
        ))}
      </g>

      <text
        x="30"
        y="50"
        fill="rgba(255,255,255,0.85)"
        fontFamily="Poppins"
        fontSize="14"
        fontWeight="700"
        letterSpacing="4"
      >
        BESTNOTES
      </text>

      <g transform="translate(280, 30)">
        <rect
          width="100"
          height="26"
          rx="13"
          fill="rgba(255,255,255,0.2)"
          stroke="rgba(255,255,255,0.4)"
        />
        <text
          x="50"
          y="17"
          fill="white"
          textAnchor="middle"
          fontFamily="Inter"
          fontSize="10"
          fontWeight="600"
        >
          HARYANA · GROUP D
        </text>
      </g>

      <g transform="translate(200,240)">
        <circle
          r="90"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />

        <text
          textAnchor="middle"
          y="20"
          fill="white"
          fontFamily="Poppins"
          fontSize={icon.length > 2 ? 42 : 68}
          fontWeight="800"
        >
          {icon}
        </text>
      </g>

      <text
        x="200"
        y="400"
        textAnchor="middle"
        fill="white"
        fontFamily="Poppins"
        fontSize="26"
        fontWeight="700"
      >
        {title.length > 22 ? title.slice(0, 22) + "…" : title}
      </text>

      {subtitle && (
        <text
          x="200"
          y="428"
          textAnchor="middle"
          fill="rgba(255,255,255,0.85)"
          fontFamily="Inter"
          fontSize="12"
        >
          {subtitle.length > 46 ? subtitle.slice(0, 46) + "…" : subtitle}
        </text>
      )}

      <g transform="translate(30,470)">
        <rect
          width="76"
          height="24"
          rx="4"
          fill="rgba(0,0,0,0.25)"
        />

        <text
          x="38"
          y="16"
          fill="white"
          textAnchor="middle"
          fontFamily="Inter"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
        >
          UPDATED
        </text>
      </g>

      <text
        x="370"
        y="486"
        textAnchor="end"
        fill="rgba(255,255,255,0.9)"
        fontFamily="Poppins"
        fontSize="14"
        fontWeight="600"
      >
        {updated || "2026 EDITION"}
      </text>
    </svg>
  );
}