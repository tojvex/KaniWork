"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BuildingMap } from "@/components/BuildingMap";
import { BrandPanel } from "@/components/BrandPanel";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { floors } from "@/data/floors";
import type { Locale } from "@/types/floor";

const selectedStateReferences: Record<string, string> = {
  "5f-clinic": "/assets/figma/Page2.png",
  "4f-clinic": "/assets/figma/Page3.png",
  "3f-clinic": "/assets/figma/Page4.png",
  "2f-clinic": "/assets/figma/Page5.png",
  "2f-aesthetic": "/assets/figma/Page6.png",
  "1f-reception": "/assets/figma/Page7.png",
  "1f-beauty": "/assets/figma/Page8.png"
};

const homeReference = "/assets/figma/MainPage.png";
const homeHotspots = [
  { id: "5f-clinic", label: "5F Kani Clinic", top: "18.3%" },
  { id: "4f-clinic", label: "4F Kani Clinic", top: "29.1%" },
  { id: "3f-clinic", label: "3F Kani Clinic", top: "39.9%" },
  { id: "2f-clinic", label: "2F Kani Clinic", top: "50.7%" },
  { id: "2f-aesthetic", label: "2F Kani Aesthetic", top: "61.4%" },
  { id: "1f-reception", label: "1F Reception", top: "72.2%" },
  { id: "1f-beauty", label: "1F Beauty Studio", top: "82.9%" }
];

export function KaniExperience() {
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const [hoveredFloorId, setHoveredFloorId] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("ka");
  const [showOpening, setShowOpening] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const activeFloor = useMemo(
    () => floors.find((floor) => floor.id === activeFloorId) ?? null,
    [activeFloorId]
  );
  const activeReference = activeFloorId ? selectedStateReferences[activeFloorId] : null;
  const visibleReference = activeReference ?? homeReference;

  function getTodayKey() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveFloorId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const todayKey = getTodayKey();
      setShowOpening(window.localStorage.getItem("kani-opening-seen-date") !== todayKey);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  function handleOpeningClick() {
    if (isOpening) return;

    window.localStorage.setItem("kani-opening-seen-date", getTodayKey());
    setIsOpening(true);
    window.setTimeout(() => {
      setShowOpening(false);
      setIsOpening(false);
    }, 950);
  }

  return (
    <main
      className="experience-shell"
      data-state={activeFloor ? "selected" : "home"}
      data-active-floor={activeFloor?.id ?? "none"}
      data-reference-state="true"
    >
      <header className="topbar" aria-label="Kani Group controls">
        <h1 className="sr-only">Kani Group interactive building navigation</h1>
        <LocaleSwitcher locale={locale} onChange={setLocale} />
        <div className="figma-logo" aria-label="Kani Group">
          {locale === "ka" ? "კანი ჯგუფი" : "KANI GROUP"}
        </div>
      </header>

      <section className="figma-stage" aria-label="Kani Group building floors">
        <Image
          className="selected-reference-layer"
          src={visibleReference}
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          aria-hidden="true"
        />

        {!activeFloor ? (
          <div className="home-reference-hotspots" aria-label="Floor shortcuts">
            {homeHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                aria-label={hotspot.label}
                data-testid={`home-hotspot-${hotspot.id}`}
                style={{ top: hotspot.top }}
                onClick={() => setActiveFloorId(hotspot.id)}
              />
            ))}
          </div>
        ) : null}

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

      {showOpening ? (
        <button
          className="opening-screen"
          data-state={isOpening ? "opening" : "idle"}
          type="button"
          aria-label="Open Kani Group website"
          onClick={handleOpeningClick}
        >
          <Image
            className="opening-screen-image"
            src="/assets/figma/Opeening.png"
            alt=""
            fill
            sizes="100vw"
            priority
            unoptimized
            aria-hidden="true"
          />
        </button>
      ) : null}
    </main>
  );
}
