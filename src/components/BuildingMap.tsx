import type { FloorData, Locale } from "@/types/floor";

type BuildingMapProps = {
  floors: FloorData[];
  activeFloorId: string | null;
  hoveredFloorId: string | null;
  locale: Locale;
  onActivate: (floorId: string) => void;
  onHover: (floorId: string | null) => void;
};

const floorGeometry = [
  { id: "7f-salt", y: 56, height: 117 },
  { id: "5f-clinic", y: 173, height: 117 },
  { id: "4f-clinic", y: 290, height: 117 },
  { id: "3f-clinic", y: 407, height: 117 },
  { id: "2f-clinic", y: 524, height: 117 },
  { id: "2f-aesthetic", y: 641, height: 117 },
  { id: "1f-reception", y: 758, height: 117 },
  { id: "1f-beauty", y: 875, height: 117 }
];

export function BuildingMap({
  floors,
  activeFloorId,
  hoveredFloorId,
  locale,
  onActivate,
  onHover
}: BuildingMapProps) {
  return (
    <div className="building-card">
      <div className="building-heading">
        <p className="kicker">{locale === "ka" ? "სართულები" : "Floors"}</p>
        <h2>{locale === "ka" ? "აირჩიე სართული" : "Select a floor"}</h2>
      </div>

      <svg
        className="building-svg"
        viewBox="0 0 455 1012"
        role="group"
        aria-label={locale === "ka" ? "Kani Group-ის სართულების რუკა" : "Kani Group floor map"}
      >
        <defs>
          <linearGradient id="glassGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4c1d8" stopOpacity="0.9" />
            <stop offset="48%" stopColor="#7e7bc2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1b245f" stopOpacity="0.9" />
          </linearGradient>
          <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.96 0 0 0 0 0.73 0 0 0 0 0.88 0 0 0 0.8 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {floorGeometry.map((geometry) => (
            <clipPath key={geometry.id} id={`clip-${geometry.id}`}>
              <rect x="0" y={geometry.y} width="445" height={geometry.height} rx="3" />
            </clipPath>
          ))}
        </defs>

        <path className="roof-line" d="M28 56 L72 16 H320 L366 56 Z" />
        <path className="roof-line roof-inner" d="M86 49 L118 28 H276 L312 49 Z" />
        <text className="roof-script" x="178" y="45">
          Salt
        </text>
        <rect className="building-outline" x="14" y="56" width="361" height="936" rx="6" />
        <path className="building-shine" d="M288 68 L374 68 L374 981 L210 981 C260 690 286 340 288 68 Z" />

        {floorGeometry.map((geometry) => {
          const floor = floors.find((item) => item.id === geometry.id);
          if (!floor) return null;

          const isActive = floor.id === activeFloorId;
          const isHovered = floor.id === hoveredFloorId;
          const isFaded = Boolean(activeFloorId && !isActive);
          const isDisabled = floor.id === "7f-salt";
          const x = 14;
          const width = 361;

          return (
            <g
              key={floor.id}
              className={[
                "floor-zone",
                `theme-${floor.theme}`,
                isActive ? "is-active" : "",
                isHovered ? "is-hovered" : "",
                isFaded ? "is-faded" : "",
                isDisabled ? "is-disabled" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              filter={isActive ? "url(#activeGlow)" : undefined}
            >
              <rect
                x={x}
                y={geometry.y}
                width={width}
                height={geometry.height}
                rx="3"
                className="floor-visual"
              />
              {floor.assetRefs.floorStrip ? (
                <image
                  className="floor-strip"
                  href={floor.assetRefs.floorStrip}
                  x={x + 2}
                  y={geometry.y + 2}
                  width={width - 4}
                  height={geometry.height - 4}
                  preserveAspectRatio="none"
                  clipPath={`url(#clip-${floor.id})`}
                  aria-hidden="true"
                />
              ) : null}
              <foreignObject x={x + 10} y={geometry.y + 8} width={width - 20} height={geometry.height - 12}>
                <button
                  className="floor-button"
                  type="button"
                  disabled={isDisabled}
                  aria-pressed={isActive}
                  aria-disabled={isDisabled}
                  aria-label={`${floor.floorLabel} ${floor.navLabel}`}
                  data-testid={`floor-${floor.id}`}
                  onClick={() => {
                    if (!isDisabled) onActivate(floor.id);
                  }}
                  onFocus={() => onHover(isDisabled ? null : floor.id)}
                  onBlur={() => onHover(null)}
                  onMouseEnter={() => onHover(isDisabled ? null : floor.id)}
                  onMouseLeave={() => onHover(null)}
                >
                  <span>{floor.floorLabel}</span>
                  <strong>{floor.navLabel}</strong>
                </button>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
