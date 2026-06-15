export type Locale = "ka" | "en";

export type FloorLinkKind =
  | "website"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "call"
  | "email"
  | "booking";

export type FloorLink = {
  kind: FloorLinkKind;
  label: string;
  href: string;
  placeholder?: boolean;
};

export type LocalizedContent = {
  subtitle: string;
  description: string;
  servicesTitle: string;
  services: string[];
};

export type FloorData = {
  id: string;
  floorLabel: string;
  navLabel: string;
  brandName: string;
  theme: "beauty" | "reception" | "aesthetic" | "clinic" | "salt";
  content: Record<Locale, LocalizedContent>;
  links: FloorLink[];
  assetRefs: {
    logo?: string;
    hero?: string;
    floorStrip?: string;
    placeholderMark: string;
  };
};
