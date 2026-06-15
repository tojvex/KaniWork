import { actionIconMap } from "@/components/BrandPanel";
import type { FloorLink } from "@/types/floor";

type ActionLinksProps = {
  links: FloorLink[];
};

export function ActionLinks({ links }: ActionLinksProps) {
  return (
    <div className="action-links" aria-label="Brand links">
      {links.map((link) => {
        const Icon = actionIconMap[link.kind];
        const isExternal = link.href.startsWith("http");

        return (
          <a
            key={`${link.kind}-${link.label}`}
            className="action-link"
            href={link.href}
            aria-label={`${link.label}${link.placeholder ? " placeholder" : ""}`}
            data-kind={link.kind}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            data-placeholder={link.placeholder ? "true" : "false"}
          >
            <Icon size={17} aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
