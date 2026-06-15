"use client";

import { useEffect, useMemo, useState } from "react";
import { BuildingMap } from "@/components/BuildingMap";
import { BrandPanel } from "@/components/BrandPanel";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { floors } from "@/data/floors";
import type { Locale } from "@/types/floor";

export function KaniExperience() {
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const [hoveredFloorId, setHoveredFloorId] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("ka");

  const activeFloor = useMemo(
    () => floors.find((floor) => floor.id === activeFloorId) ?? null,
    [activeFloorId]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveFloorId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className="experience-shell"
      data-state={activeFloor ? "selected" : "home"}
      data-active-floor={activeFloor?.id ?? "none"}
    >
      <header className="topbar" aria-label="Kani Group controls">
        <h1 className="sr-only">Kani Group interactive building navigation</h1>
        <LocaleSwitcher locale={locale} onChange={setLocale} />
        <div className="figma-logo" aria-label="Kani Group">
          {locale === "ka" ? "კანი ჯგუფი" : "KANI GROUP"}
        </div>
      </header>

      <section className="figma-stage" aria-label="Kani Group building floors">
        <div className="stage-line stage-line-top" aria-hidden="true" />
        <div className="stage-line stage-line-main" aria-hidden="true" />
        <div className="stage-line stage-line-bottom" aria-hidden="true" />

        <BuildingMap
          floors={floors}
          activeFloorId={activeFloorId}
          hoveredFloorId={hoveredFloorId}
          locale={locale}
          onActivate={setActiveFloorId}
          onHover={setHoveredFloorId}
        />

        <div className="panel-stage" data-has-active={activeFloor ? "true" : "false"}>
          {activeFloor ? (
            <BrandPanel floor={activeFloor} locale={locale} onClose={() => setActiveFloorId(null)} />
          ) : (
            <div className="default-panel" aria-live="polite">
              <p className="kicker">Landing state</p>
              <h2>{locale === "ka" ? "Kani Group შენობა" : "Kani Group Building"}</h2>
              <p>
                {locale === "ka"
                  ? "აირჩიე სართული, რომ გაიხსნას შესაბამისი ბრენდის ფანჯარა."
                  : "Choose a floor to open the matching brand panel."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
