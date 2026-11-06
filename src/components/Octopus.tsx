/** A tentacle: a thick chocolate outline with the green body drawn on top. */
function Arm({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke="#3B2418" strokeWidth="22" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#8CB33E" strokeWidth="15" strokeLinecap="round" />
    </>
  )
}

const PETALS: [number, number][] = [
  [0, -8],
  [7.6, -2.5],
  [4.7, 6.5],
  [-4.7, 6.5],
  [-7.6, -2.5],
]

/**
 * The site's mascot: a pistachio octopus that waves, writes in a notebook
 * and codes on a laptop. Motion is CSS only (styles.css, "Motion"), and
 * reduced motion leaves it standing still.
 */
export function Octopus() {
  return (
    <svg
      className="octopus"
      role="img"
      aria-label="Bir kolunda not defteri, bir kolunda dizüstü bilgisayar tutan ve el sallayan fıstık yeşili ahtapot"
      viewBox="0 0 240 240"
    >
      <ellipse className="m-shadow" cx="120" cy="230" rx="78" ry="7" fill="#3B2418" />
      <g className="m-float">
        <g className="o-wave">
          <Arm d="M76 122 C50 114 32 94 34 64 C35 50 48 47 51 58" />
          <circle cx="40" cy="86" r="2.6" fill="#E36A93" />
          <circle cx="37" cy="72" r="2.4" fill="#E36A93" />
        </g>

        {/* Notebook, the arm holding it, and the pencil writing in it */}
        <g transform="translate(6 150) rotate(-10)">
          <rect x="0" y="0" width="46" height="56" rx="6" fill="#F7F9EF" stroke="#3B2418" strokeWidth="3.5" />
          <rect x="0" y="0" width="46" height="10" rx="5" fill="#E36A93" stroke="#3B2418" strokeWidth="3.5" />
          <rect x="8" y="18" width="28" height="3.5" rx="1.75" fill="#BCC79C" />
          <rect x="8" y="27" width="22" height="3.5" rx="1.75" fill="#BCC79C" />
          <rect x="8" y="36" width="26" height="3.5" rx="1.75" fill="#BCC79C" />
          <rect x="8" y="45" width="14" height="3.5" rx="1.75" fill="#B03566" />
        </g>
        <Arm d="M84 140 C68 160 52 168 38 166" />
        <g transform="translate(40 196) rotate(-38)">
          <g className="o-scrib">
            <path d="M0 0 L8 -4 L8 4 Z" fill="#3B2418" />
            <rect x="8" y="-4.5" width="30" height="9" rx="2" fill="#E36A93" stroke="#3B2418" strokeWidth="2.5" />
            <rect x="34" y="-4.5" width="6" height="9" rx="2" fill="#F7F9EF" stroke="#3B2418" strokeWidth="2.5" />
          </g>
        </g>
        <Arm d="M102 146 C98 172 86 188 66 190" />

        <g className="o-sway1">
          <Arm d="M116 148 C116 176 108 194 96 200 C88 203 86 193 93 191" />
        </g>
        <g className="o-sway2">
          <Arm d="M134 148 C136 176 146 194 158 199 C166 202 168 192 161 190" />
        </g>

        {/* Laptop and the arm holding it */}
        <rect x="176" y="126" width="60" height="42" rx="6" fill="#3B2418" stroke="#3B2418" strokeWidth="3.5" />
        <rect x="182" y="132" width="48" height="30" rx="3" fill="#4A2F21" />
        <rect className="o-code" x="186" y="136" width="22" height="3.5" rx="1.75" fill="#8CB33E" />
        <rect className="o-code" x="190" y="143" width="30" height="3.5" rx="1.75" fill="#F49AB9" style={{ animationDelay: '-.4s' }} />
        <rect className="o-code" x="190" y="150" width="18" height="3.5" rx="1.75" fill="#8CB33E" style={{ animationDelay: '-.8s' }} />
        <rect className="o-code" x="186" y="157" width="26" height="3.5" rx="1.75" fill="#F7F9EF" style={{ animationDelay: '-1.2s' }} />
        <path d="M168 168 H242 L236 178 H174 Z" fill="#C8D1AE" stroke="#3B2418" strokeWidth="3.5" strokeLinejoin="round" />
        <Arm d="M156 138 C174 156 186 168 200 172" />

        {/* Head */}
        <ellipse cx="120" cy="92" rx="64" ry="60" fill="#8CB33E" stroke="#3B2418" strokeWidth="4" />
        <ellipse cx="92" cy="58" rx="15" ry="8" fill="#FFFFFF" opacity=".35" transform="rotate(-28 92 58)" />
        <circle cx="152" cy="56" r="6" fill="#76A02E" />
        <circle cx="165" cy="72" r="4" fill="#76A02E" />
        <circle cx="141" cy="43" r="3" fill="#76A02E" />

        <g transform="translate(82 42)">
          {PETALS.map(([cx, cy]) => (
            <circle key={`${cx},${cy}`} cx={cx} cy={cy} r="6.5" fill="#E36A93" stroke="#3B2418" strokeWidth="2.5" />
          ))}
          <circle cx="0" cy="0" r="4.5" fill="#F7F9EF" stroke="#3B2418" strokeWidth="2.5" />
        </g>

        <g className="o-blink">
          <ellipse cx="98" cy="92" rx="9" ry="12" fill="#3B2418" />
          <ellipse cx="142" cy="92" rx="9" ry="12" fill="#3B2418" />
          <circle cx="101" cy="87" r="3.4" fill="#FFFFFF" />
          <circle cx="145" cy="87" r="3.4" fill="#FFFFFF" />
          <circle cx="95.5" cy="97" r="1.6" fill="#FFFFFF" />
          <circle cx="139.5" cy="97" r="1.6" fill="#FFFFFF" />
        </g>
        <ellipse cx="80" cy="113" rx="11" ry="6.5" fill="#E36A93" opacity=".85" />
        <ellipse cx="160" cy="113" rx="11" ry="6.5" fill="#E36A93" opacity=".85" />
        <path d="M109 109 Q120 121 131 109" fill="#B03566" stroke="#3B2418" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
