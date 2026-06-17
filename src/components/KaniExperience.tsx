"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BuildingMap } from "@/components/BuildingMap";
import { BrandPanel } from "@/components/BrandPanel";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MobileReferenceFrame } from "@/components/MobileReferenceFrame";
import { floors } from "@/data/floors";
import {
  homeHotspots,
  homeReference,
  mobileHomeReference,
  mobileStateReferences,
  referenceImageSources,
  selectedHotspots,
  selectedStateReferences
} from "@/data/referenceScreens";
import type { Locale } from "@/types/floor";

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
  const activeMobileReference = activeFloorId ? mobileStateReferences[activeFloorId] : null;
  const visibleReference = activeReference ?? homeReference;
  const visibleMobileReference = activeMobileReference ?? mobileHomeReference;

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

  useEffect(() => {
    const preloadLinks = referenceImageSources.map((source) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = source;
      document.head.appendChild(link);
      return link;
    });
    const preloadedImages = referenceImageSources.map((source) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = source;
      return image;
    });

    return () => {
      preloadLinks.forEach((link) => link.remove());
      preloadedImages.length = 0;
    };
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
        {activeFloor ? (
          <button
            className="mobile-selected-backdrop"
            type="button"
            aria-label="Close mobile panel"
            data-testid="mobile-selected-backdrop"
            onClick={() => setActiveFloorId(null)}
          />
        ) : null}

        <MobileReferenceFrame
          activeFloor={activeFloor}
          activeFloorId={activeFloorId}
          imageSource={visibleMobileReference}
          onActivate={setActiveFloorId}
          onClose={() => setActiveFloorId(null)}
        />

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

        {activeFloor ? (
          <div className="selected-reference-hotspots" aria-label="Floor shortcuts">
            {selectedHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                aria-label={hotspot.label}
                aria-pressed={activeFloorId === hotspot.id}
                data-testid={`selected-hotspot-${hotspot.id}`}
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
          <span className="opening-screen-panel opening-screen-panel-top" aria-hidden="true" />
          <span className="opening-screen-panel opening-screen-panel-bottom" aria-hidden="true" />
        </button>
      ) : null}
    </main>
  );
}
