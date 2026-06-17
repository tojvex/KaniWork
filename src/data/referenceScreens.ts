export type ReferenceHotspot = {
  id: string;
  label: string;
  top: string;
};

export const homeReference = "/assets/figma/MainPage.png";
export const mobileHomeReference = "/assets/figma/MainPage.png";

export const selectedStateReferences: Record<string, string> = {
  "5f-clinic": "/assets/figma/Page2.png",
  "4f-clinic": "/assets/figma/Page3.png",
  "3f-clinic": "/assets/figma/Page4.png",
  "2f-clinic": "/assets/figma/Page5.png",
  "2f-aesthetic": "/assets/figma/Page6.png",
  "1f-reception": "/assets/figma/Page7.png",
  "1f-beauty": "/assets/figma/Page8.png"
};

export const mobileStateReferences: Record<string, string> = {
  "7f-salt": "/assets/figma/SaltPhone.png",
  "5f-clinic": "/assets/figma/ClinicPhon1.png",
  "4f-clinic": "/assets/figma/ClinicPhone2.png",
  "3f-clinic": "/assets/figma/ClinicPhone3.png",
  "2f-clinic": "/assets/figma/ClinicPhone4.png",
  "2f-aesthetic": "/assets/figma/AesthetiicPhone.png",
  "1f-reception": "/assets/figma/ReceptionPhone.png",
  "1f-beauty": "/assets/figma/BeautyPhone.png"
};

export const referenceImageSources = Array.from(
  new Set([
    "/assets/figma/Opeening.png",
    homeReference,
    ...Object.values(selectedStateReferences),
    mobileHomeReference,
    ...Object.values(mobileStateReferences)
  ])
);

export const homeHotspots: ReferenceHotspot[] = [
  { id: "5f-clinic", label: "5F Kani Clinic", top: "18.3%" },
  { id: "4f-clinic", label: "4F Kani Clinic", top: "29.1%" },
  { id: "3f-clinic", label: "3F Kani Clinic", top: "39.9%" },
  { id: "2f-clinic", label: "2F Kani Clinic", top: "50.7%" },
  { id: "2f-aesthetic", label: "2F Kani Aesthetic", top: "61.4%" },
  { id: "1f-reception", label: "1F Reception", top: "72.2%" },
  { id: "1f-beauty", label: "1F Beauty Studio", top: "82.9%" }
];

export const mobileHomeHotspots: ReferenceHotspot[] = [
  { id: "7f-salt", label: "7F Salt", top: "7.4%" },
  ...homeHotspots
];

export const selectedHotspots: ReferenceHotspot[] = [
  { id: "5f-clinic", label: "5F Kani Clinic", top: "16.1%" },
  { id: "4f-clinic", label: "4F Kani Clinic", top: "26.9%" },
  { id: "3f-clinic", label: "3F Kani Clinic", top: "37.8%" },
  { id: "2f-clinic", label: "2F Kani Clinic", top: "48.6%" },
  { id: "2f-aesthetic", label: "2F Kani Aesthetic", top: "59.4%" },
  { id: "1f-reception", label: "1F Reception", top: "70.2%" },
  { id: "1f-beauty", label: "1F Beauty Studio", top: "81.1%" }
];
