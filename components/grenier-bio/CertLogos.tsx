/**
 * Logos certifications inline SVG.
 * Recréations fidèles des logos officiels (couleurs, proportions, hiérarchie typo).
 *
 * Pourquoi inline et non les fichiers Wikipedia ?
 * Wikipedia bloque le hotlinking direct des SVG depuis Node/curl (404 server-side).
 * Les composants SVG inline garantissent un rendu propre, sans dépendance réseau.
 */

type Props = { className?: string };

/**
 * Agriculture Biologique (France) — logo officiel.
 * Carré vert avec "AB" central blanc bold, "AGRICULTURE BIOLOGIQUE" en bas,
 * 12 étoiles européennes dorées en haut.
 */
export function LogoAB({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Agriculture Biologique"
    >
      {/* Background green square (couleur officielle AB) */}
      <rect
        x="4"
        y="4"
        width="192"
        height="192"
        rx="10"
        fill="#5BA130"
      />

      {/* Top crown of 12 stars (référence Europe) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = -Math.PI / 2 - (i - 5.5) * (Math.PI / 14);
        const cx = 100 + Math.cos(angle) * 78;
        const cy = 100 + Math.sin(angle) * 78;
        return <Star key={i} cx={cx} cy={cy} r={5.5} color="#FFD400" />;
      })}

      {/* "AB" letters — large bold white */}
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="86"
        fontWeight="900"
        fill="#FFFFFF"
        letterSpacing="-2"
      >
        AB
      </text>

      {/* Bottom text "AGRICULTURE BIOLOGIQUE" */}
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="1.2"
      >
        AGRICULTURE
      </text>
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="1.2"
      >
        BIOLOGIQUE
      </text>
    </svg>
  );
}

/**
 * Eurofeuille UE — logo bio européen.
 * Rectangle vert avec 12 étoiles blanches formant la silhouette d'une feuille,
 * tige courbée en bas.
 */
export function LogoEUOrganic({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Logo bio européen Eurofeuille"
    >
      {/* Background green (couleur officielle Eurofeuille) */}
      <rect width="200" height="200" fill="#71B144" />

      {/* The 12 stars forming a leaf shape, leaning slightly to the right */}
      {[
        // Leaf outline — tip at top right, base at bottom left
        { cx: 70, cy: 50 },   // tip area top-left of leaf
        { cx: 90, cy: 38 },   // top
        { cx: 115, cy: 35 },  // top-right tip
        { cx: 138, cy: 45 },  // upper-right
        { cx: 155, cy: 65 },  // right side
        { cx: 162, cy: 90 },  // mid-right
        { cx: 158, cy: 115 }, // bottom-right
        { cx: 145, cy: 138 }, // lower-right
        { cx: 122, cy: 150 }, // bottom-mid
        { cx: 95, cy: 148 },  // bottom-left
        { cx: 73, cy: 130 },  // left
        { cx: 62, cy: 102 },  // mid-left (closes the loop)
      ].map((p, i) => (
        <Star key={i} cx={p.cx} cy={p.cy} r={9} color="#FFFFFF" />
      ))}

      {/* Stem — gentle curve from bottom of leaf going down-right */}
      <path
        d="M 122 150 Q 142 165, 168 175"
        stroke="#FFFFFF"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Star({
  cx,
  cy,
  r,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
}) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI * i) / 5 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.4;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  return <polygon points={points} fill={color} />;
}
