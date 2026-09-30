import { getRank } from './data.js';

// Park-ranger avatar drawn in SVG. Gear gets fancier as ranks climb.
export function RangerAvatar({ rankId, size = 80, animated = false }) {
  const p = getRank(rankId).palette;
  const glow = p.badge;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" role="img" aria-label="Ranger avatar"
      style={{ filter: animated ? `drop-shadow(0 0 10px ${glow}99)` : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))', overflow: 'visible' }}>
      {/* boots + pants */}
      <rect x="34" y="100" width="13" height="22" fill="#5C4A2E" />
      <rect x="53" y="100" width="13" height="22" fill="#5C4A2E" />
      <rect x="31" y="118" width="17" height="8" rx="2" fill="#2B2116" />
      <rect x="52" y="118" width="17" height="8" rx="2" fill="#2B2116" />
      {/* arms */}
      <path d="M 27 58 L 18 84 L 25 88 L 33 66 Z" fill={p.shirt} stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
      <path d="M 73 58 L 82 84 L 75 88 L 67 66 Z" fill={p.shirt} stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx="21" cy="88" r="4" fill="#D9A77C" />
      <circle cx="79" cy="88" r="4" fill="#D9A77C" />
      {/* shirt */}
      <path d="M 30 54 Q 50 48 70 54 L 72 102 L 28 102 Z" fill={p.shirt} stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="50" y1="58" x2="50" y2="100" stroke="#000" strokeOpacity="0.2" strokeWidth="1" />
      {/* pockets */}
      <rect x="35" y="64" width="10" height="9" rx="1" fill="#000" opacity="0.12" />
      <rect x="55" y="64" width="10" height="9" rx="1" fill="#000" opacity="0.12" />
      {/* belt */}
      <rect x="28" y="94" width="44" height="6" fill="#3B2E1C" />
      <rect x="46" y="93" width="8" height="8" rx="1" fill={p.badge} />
      {/* neckerchief */}
      <path d="M 40 52 L 60 52 L 50 66 Z" fill={p.scarf} stroke="#000" strokeOpacity="0.3" strokeWidth="0.6" />
      {/* badge */}
      <polygon points="40,63 41.8,67 46,67.4 42.8,70 43.8,74 40,71.8 36.2,74 37.2,70 34,67.4 38.2,67" fill={p.badge} stroke="#000" strokeOpacity="0.35" strokeWidth="0.5" />
      {/* gear */}
      {p.gear === 'binoculars' && (
        <g>
          <path d="M 42 54 Q 50 80 58 54" fill="none" stroke="#2B2116" strokeWidth="1.2" />
          <rect x="49" y="74" width="7" height="10" rx="2" fill="#2B2116" />
          <rect x="57" y="74" width="7" height="10" rx="2" fill="#2B2116" />
          <circle cx="52.5" cy="84" r="2" fill="#4FD1C5" opacity="0.8" />
          <circle cx="60.5" cy="84" r="2" fill="#4FD1C5" opacity="0.8" />
        </g>
      )}
      {(p.gear === 'radio' || p.gear === 'eagle') && (
        <g>
          <rect x="62" y="84" width="7" height="12" rx="1.5" fill="#222" />
          <line x1="67" y1="84" x2="67" y2="76" stroke="#222" strokeWidth="1.5" />
          <circle cx="65.5" cy="88" r="1.2" fill="#7BD389" />
        </g>
      )}
      {/* head */}
      <rect x="45" y="44" width="10" height="8" fill="#C79268" />
      <ellipse cx="50" cy="36" rx="13" ry="14" fill="#D9A77C" />
      <circle cx="45" cy="36" r="1.6" fill="#2B2116" />
      <circle cx="55" cy="36" r="1.6" fill="#2B2116" />
      <path d="M 45 42 Q 50 46 55 42" fill="none" stroke="#2B2116" strokeWidth="1.3" strokeLinecap="round" />
      {/* campaign hat */}
      <ellipse cx="50" cy="26" rx="27" ry="5.5" fill={p.hat} stroke="#000" strokeOpacity="0.4" strokeWidth="0.8" />
      <path d="M 37 26 L 40 12 Q 45 8 50 12 Q 55 8 60 12 L 63 26 Z" fill={p.hat} stroke="#000" strokeOpacity="0.4" strokeWidth="0.8" />
      <rect x="37.5" y="21" width="25" height="4" fill={p.band} />
      {/* eagle companion */}
      {p.gear === 'eagle' && (
        <text x="86" y="56" fontSize="20" textAnchor="middle" style={{ filter: `drop-shadow(0 0 4px ${glow})` }}>🦅</text>
      )}
    </svg>
  );
}
