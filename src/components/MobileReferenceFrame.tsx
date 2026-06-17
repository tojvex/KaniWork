"use client";

import { mobileHomeHotspots } from "@/data/referenceScreens";
import type { FloorData } from "@/types/floor";

type MobileReferenceFrameProps = {
  activeFloor: FloorData | null;
  activeFloorId: string | null;
  imageSource: string;
  onActivate: (floorId: string) => void;
  onClose: () => void;
};

export function MobileReferenceFrame({
  activeFloor,
  activeFloorId,
  imageSource,
  onActivate,
  onClose
}: MobileReferenceFrameProps) {
  return (
    <div
      className="mobile-reference-frame"
      data-state={activeFloor ? "selected" : "home"}
      aria-hidden="false"
      onClick={activeFloor ? onClose : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="mobile-reference-layer"
        src={imageSource}
        alt=""
        aria-hidden="true"
      />

      {!activeFloor ? (
        <div className="mobile-reference-hotspots" aria-label="Floor shortcuts">
          {mobileHomeHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              aria-label={hotspot.label}
              aria-pressed={activeFloorId === hotspot.id}
              data-testid={`mobile-hotspot-${hotspot.id}`}
              style={{ top: hotspot.top }}
              onClick={() => onActivate(hotspot.id)}
            />
          ))}
        </div>
      ) : null}

      {activeFloor ? (
        <>
          <div
            className="mobile-card-guard"
            aria-hidden="true"
            data-testid="mobile-card-guard"
            onClick={(event) => event.stopPropagation()}
          />
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
                  onClick={(event) => event.stopPropagation()}
                />
              );
            })}
          </div>
          <button
            className="mobile-close-hotspot"
            type="button"
            aria-label="Close mobile panel"
            data-testid="mobile-close-hotspot"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          />
        </>
      ) : null}
    </div>
  );
}
