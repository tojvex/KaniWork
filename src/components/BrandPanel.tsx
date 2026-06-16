import { ExternalLink, Globe, Instagram, Mail, Phone, X } from "lucide-react";
import Image from "next/image";
import { ActionLinks } from "@/components/ActionLinks";
import type { FloorData, Locale } from "@/types/floor";

type BrandPanelProps = {
  floor: FloorData;
  locale: Locale;
  onClose: () => void;
};

export function BrandPanel({ floor, locale, onClose }: BrandPanelProps) {
  const content = floor.content[locale];
  const isReception = floor.id === "1f-reception";
  const isBeauty = floor.id === "1f-beauty";
  const isFocusedService = ["2f-aesthetic", "2f-clinic", "3f-clinic", "4f-clinic", "5f-clinic"].includes(floor.id);

  if (isReception) {
    const secondaryText = content.services.join(" ");

    return (
      <>
        <article
          className={`brand-panel reception-panel theme-${floor.theme}`}
          data-floor-id={floor.id}
          data-testid="brand-panel"
          aria-live="polite"
        >
          <div className="reception-copy">
            <div className="reception-title-group">
              <h2>
                {floor.brandName}
                <span aria-hidden="true">|</span>
              </h2>
              <p>{content.subtitle}</p>
            </div>

            <div className="reception-outline-block">
              <p>{content.description}</p>
            </div>

            <div className="reception-secondary-block">
              <p>{secondaryText}</p>
              <span aria-hidden="true" />
            </div>
          </div>

          <ActionLinks links={floor.links} />
        </article>
        <button className="close-button reception-close-button" type="button" aria-label="Close panel" onClick={onClose}>
          <X size={15} aria-hidden="true" />
        </button>
      </>
    );
  }

  if (isBeauty) {
    const secondaryText = content.services.join(" ");

    return (
      <>
        <article
          className={`brand-panel beauty-panel theme-${floor.theme}`}
          data-floor-id={floor.id}
          data-testid="brand-panel"
          aria-live="polite"
        >
          <div className="beauty-copy">
            <div className="beauty-title-row">
              <div className="beauty-title-group">
                <h2>{floor.brandName}</h2>
                <p>{content.subtitle}</p>
              </div>
              <Image
                className="beauty-logo-mark"
                src="/assets/figma/BeautyLogoCrop.png"
                alt="Beauty Studio by Kani"
                width={84}
                height={84}
              />
            </div>

            <div className="beauty-outline-block">
              <p>{content.description}</p>
            </div>

            <div className="beauty-secondary-block">
              <p>{secondaryText}</p>
              <span aria-hidden="true" />
            </div>
          </div>

          <ActionLinks links={floor.links} />
        </article>
        <button className="close-button beauty-close-button" type="button" aria-label="Close panel" onClick={onClose}>
          <X size={15} aria-hidden="true" />
        </button>
      </>
    );
  }

  if (isFocusedService) {
    const secondaryText = content.services.join(" ");
    const logoLabel = floor.theme === "clinic" ? "Kani Clinic" : "Kani Aesthetic";

    return (
      <>
        <article
          className={`brand-panel service-focus-panel ${floor.theme}-focus-panel theme-${floor.theme}`}
          data-floor-id={floor.id}
          data-testid="brand-panel"
          aria-live="polite"
        >
          <div className="service-focus-copy">
            <div className="service-focus-title-row">
              <div className="service-focus-title-group">
                <h2>{floor.brandName}</h2>
                <p>{content.subtitle}</p>
              </div>
              <div className="service-logo-mark" aria-label={logoLabel}>
                {logoLabel}
              </div>
            </div>

            <div className="service-outline-block">
              <p>{content.description}</p>
            </div>

            <div className="service-secondary-block">
              <p>{secondaryText}</p>
              <span aria-hidden="true" />
            </div>
          </div>

          <ActionLinks links={floor.links} />
        </article>
        <button className="close-button service-focus-close-button" type="button" aria-label="Close panel" onClick={onClose}>
          <X size={15} aria-hidden="true" />
        </button>
      </>
    );
  }

  return (
    <article
      className={`brand-panel theme-${floor.theme}`}
      data-floor-id={floor.id}
      data-testid="brand-panel"
      aria-live="polite"
    >
      <button className="close-button" type="button" aria-label="Close panel" onClick={onClose}>
        <X size={18} aria-hidden="true" />
      </button>

      <div className="panel-copy panel-copy-primary">
        <p className="kicker">{floor.floorLabel}</p>
        <h2>{floor.brandName}</h2>
        <p className="subtitle">{content.subtitle}</p>
        <p className="description">{content.description}</p>
      </div>

      <section className="services-box" aria-labelledby={`${floor.id}-services`}>
        <h3 id={`${floor.id}-services`}>{content.servicesTitle}</h3>
        <ul>
          {content.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      <ActionLinks links={floor.links} />

      <div className="placeholder-note" role="note">
        <ExternalLink size={15} aria-hidden="true" />
        <span>
          {locale === "ka"
            ? "ბმულები და ვიზუალური მასალები placeholder-ებია."
            : "Links and visual assets are placeholders."}
        </span>
      </div>
    </article>
  );
}

export const actionIconMap = {
  website: Globe,
  instagram: Instagram,
  facebook: ExternalLink,
  tiktok: ExternalLink,
  call: Phone,
  email: Mail,
  booking: ExternalLink
};
