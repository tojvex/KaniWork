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

const mobileStateReferences: Record<string, string> = {
  "5f-clinic": "/assets/figma/ClinicPhon1.png",
  "4f-clinic": "/assets/figma/ClinicPhone2.png",
  "3f-clinic": "/assets/figma/ClinicPhone3.png",
  "2f-clinic": "/assets/figma/ClinicPhone4.png",
  "2f-aesthetic": "/assets/figma/AesthetiicPhone.png",
  "1f-reception": "/assets/figma/ReceptionPhone.png",
  "1f-beauty": "/assets/figma/BeautyPhone.png"
};

const mobileHomeReference = "/assets/figma/MainPage.png";

const referenceImageSources = Array.from(new Set([
  "/assets/figma/Opeening.png",
  "/assets/figma/MainPage.png",
  ...Object.values(selectedStateReferences),
  mobileHomeReference,
  ...Object.values(mobileStateReferences)
]));

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
const selectedHotspots = [
  { id: "5f-clinic", label: "5F Kani Clinic", top: "16.1%" },
  { id: "4f-clinic", label: "4F Kani Clinic", top: "26.9%" },
  { id: "3f-clinic", label: "3F Kani Clinic", top: "37.8%" },
  { id: "2f-clinic", label: "2F Kani Clinic", top: "48.6%" },
  { id: "2f-aesthetic", label: "2F Kani Aesthetic", top: "59.4%" },
  { id: "1f-reception", label: "1F Reception", top: "70.2%" },
  { id: "1f-beauty", label: "1F Beauty Studio", top: "81.1%" }
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
  const activeMobileReference = activeFloorId ? mobileStateReferences[activeFloorId] : null;
  const visibleReference = activeReference ?? homeReference;
  const visibleMobileReference = activeMobileReference ?? mobileHomeReference;
  const visibleMobileHotspots = activeFloor ? [] : homeHotspots;

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
        <div className="mobile-reference-frame" data-state={activeFloor ? "selected" : "home"} aria-hidden="false">
          <Image
            className="mobile-reference-layer"
            src={visibleMobileReference}
            alt=""
            fill
            sizes="100vw"
            priority
            unoptimized
            aria-hidden="true"
          />
          {!activeFloor ? (
            <div className="mobile-reference-hotspots" aria-label="Floor shortcuts">
              {visibleMobileHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  aria-label={hotspot.label}
                  aria-pressed={activeFloorId === hotspot.id}
                  data-testid={`mobile-hotspot-${hotspot.id}`}
                  style={{ top: hotspot.top }}
                  onClick={() => setActiveFloorId(hotspot.id)}
                />
              ))}
            </div>
          ) : null}
          {activeFloor ? (
            <>
              <div
                className="mobile-reference-links"
                data-link-count={activeFloor.links.length}
                aria-label={`${activeFloor.brandName} mobile links`}
              >
                {activeFloor.links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <a
                      key={`${link.kind}-${link.label}`}
                      href={link.href}
                      aria-label={`${link.label}${link.placeholder ? " placeholder" : ""}`}
                      data-kind={link.kind}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      data-testid={`mobile-link-${link.kind}`}
                    />
                  );
                })}
              </div>
              <button
                className="mobile-close-hotspot"
                type="button"
                aria-label="Close mobile panel"
                data-testid="mobile-close-hotspot"
                onClick={() => setActiveFloorId(null)}
              />
            </>
          ) : null}
        </div>

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
