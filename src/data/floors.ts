import type { FloorData } from "@/types/floor";

const placeholderLinks = {
  website: "#website-placeholder",
  instagram: "#instagram-placeholder",
  facebook: "#facebook-placeholder",
  tiktok: "#tiktok-placeholder",
  call: "tel:+995000000000",
  email: "mailto:info@example.com",
  booking: "#booking-placeholder"
};

export const floors: FloorData[] = [
  {
    id: "1f-beauty",
    floorLabel: "1F",
    navLabel: "Beauty Studio",
    brandName: "BEAUTY STUDIO",
    theme: "beauty",
    content: {
      ka: {
        subtitle: "მოემზადე განსაკუთრებული დღისთვის",
        description:
          "Beauty Studio by Kani - თავის მოვლის სხვადასხვა პროცედურებს გთავაზობს.",
        servicesTitle: "სერვისები",
        services: [
          "აქ შენს ახალ მხარეს, სტილის აღმოჩენას, პროფესიონალთა გუნდით",
          "კი იდეალური დღის შექმნაში დაგეხმარებიან - იქნება ეს თმის ვარცხნილობა, მაკიაჟი, თუ მანიკური."
        ]
      },
      en: {
        subtitle: "Get ready for your special day",
        description:
          "Placeholder English copy for Beauty Studio by Kani. Final wording will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["Haircut / Coloring", "Nail Care", "Makeup"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group8.png", placeholderMark: "BS" }
  },
  {
    id: "1f-reception",
    floorLabel: "1F",
    navLabel: "Reception",
    brandName: "RECEPTION",
    theme: "reception",
    content: {
      ka: {
        subtitle: "გაიგე ყველაფერი კანის შესახებ",
        description:
          "მრავალპროფილური სამედიცინო ცენტრის პირველი სართულია სივრცე, სადაც შეგიძლია მიიღო საჭირო ინფორმაცია, დაგეგმო ვიზიტი და მარტივად იპოვო შენთვის სასურველი მიმართულება.",
        servicesTitle: "ინფორმაცია",
        services: [
          "პროფესიონალ პერსონალთან ერთად, ადვილად და კომფორტულად შეძლებ მიიღო,",
          "დაგეგმო და შეარჩიო შენთვის სასურველი მომსახურება."
        ]
      },
      en: {
        subtitle: "Plan a visit",
        description:
          "Placeholder English copy for the reception floor. Final visitor information will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["Book an Appointment", "Information Desk", "Pharmacy"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group7.png", placeholderMark: "R" }
  },
  {
    id: "2f-clinic",
    floorLabel: "2F",
    navLabel: "Kani Clinic",
    brandName: "KANI CLINIC",
    theme: "clinic",
    content: {
      ka: {
        subtitle: "თანამედროვე ტექნოლოგიების გამოცდილება",
        description:
          "კლინიკის დამატებითი სივრცე განკუთვნილია დიაგნოსტიკისა და თანამედროვე ტექნოლოგიური სერვისებისთვის.",
        servicesTitle: "სერვისები",
        services: ["FotoFinder BodyStudio კონსულტაცია", "დიაგნოსტიკა", "კონსულტაცია"]
      },
      en: {
        subtitle: "Experience modern technology",
        description:
          "Placeholder English copy for the additional Kani Clinic floor. Final wording will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["FotoFinder BodyStudio Consultation", "Diagnostics", "Consultation"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "tiktok", label: "TikTok", href: placeholderLinks.tiktok, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group5.png", placeholderMark: "KC" }
  },
  {
    id: "2f-aesthetic",
    floorLabel: "2F",
    navLabel: "Kani Aesthetic",
    brandName: "KANI AESTHETIC",
    theme: "aesthetic",
    content: {
      ka: {
        subtitle: "იყავი ისეთი, როგორიც გსურს",
        description:
          "Kani Aesthetic აერთიანებს თანამედროვე ესთეტიკურ პროცედურებს, აღდგენასა და კანის მოვლის მიმართულებებს.",
        servicesTitle: "სერვისები",
        services: ["სახის პროცედურები", "თანამედროვე აპარატურა", "ლაზერული ეპილაცია"]
      },
      en: {
        subtitle: "Be the way you want to be",
        description:
          "Placeholder English copy for Kani Aesthetic. Final treatment descriptions will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["Facial Treatments", "Modern Equipment", "Laser Hair Removal"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "tiktok", label: "TikTok", href: placeholderLinks.tiktok, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group6.png", placeholderMark: "KA" }
  },
  {
    id: "3f-clinic",
    floorLabel: "3F",
    navLabel: "Kani Clinic",
    brandName: "KANI CLINIC",
    theme: "clinic",
    content: {
      ka: {
        subtitle: "კანის ჯანმრთელობაზე ზრუნვა",
        description:
          "კლინიკა კანის სერვისები მოიცავს დერმატოლოგიას, პოდოლოგიას, ტრიქოლოგიას და კანის ჯანმრთელობასთან დაკავშირებულ მიმართულებებს.",
        servicesTitle: "სერვისები",
        services: ["დერმატოლოგია", "პოდოლოგია", "ტრიქოლოგია"]
      },
      en: {
        subtitle: "Care for everything skin-related",
        description:
          "Placeholder English copy for the clinic dermatology floor. Final service copy will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["Dermatology", "Podology", "Trichology"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "tiktok", label: "TikTok", href: placeholderLinks.tiktok, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group4.png", placeholderMark: "KC" }
  },
  {
    id: "4f-clinic",
    floorLabel: "4F",
    navLabel: "Kani Clinic",
    brandName: "KANI CLINIC",
    theme: "clinic",
    content: {
      ka: {
        subtitle: "გადაამოწმე ყველაფერი შენი ჯანმრთელობის შესახებ",
        description:
          "აქ დაგხვდება ლაბორატორიაც, სადაც პროფესიონალთა გუნდი პასუხების სიზუსტეს უმოკლეს დროში უზრუნველყოფს. კლინიკა კანის სერვისები კარდიოლოგის, გინეკოლოგის, ენდოკრინოლოგის, ანდროლოგისა და სხვა მომსახურებასაც მოიცავს.",
        servicesTitle: "სერვისები",
        services: ["კარდიოლოგია", "გინეკოლოგია", "ენდოკრინოლოგია და სხვა"]
      },
      en: {
        subtitle: "Check everything about your health",
        description:
          "Placeholder English copy based on the visible Figma text for the clinic health services floor. Final translation should be reviewed.",
        servicesTitle: "Services",
        services: ["Cardiology", "Gynecology", "Endocrinology and Others"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "tiktok", label: "TikTok", href: placeholderLinks.tiktok, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group3.png", placeholderMark: "KC" }
  },
  {
    id: "5f-clinic",
    floorLabel: "5F",
    navLabel: "Kani Clinic",
    brandName: "KANI CLINIC",
    theme: "clinic",
    content: {
      ka: {
        subtitle: "თანამედროვე ტექნოლოგიების გამოცდილება",
        description:
          "კლინიკის მეხუთე სართული განკუთვნილია დიაგნოსტიკისა და თანამედროვე ტექნოლოგიური სერვისებისთვის.",
        servicesTitle: "სერვისები",
        services: ["FotoFinder BodyStudio", "კონსულტაცია", "დიაგნოსტიკა"]
      },
      en: {
        subtitle: "Experience modern technology",
        description:
          "Placeholder English copy for the diagnostics and technology floor. Final wording will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["FotoFinder BodyStudio", "Consultation", "Diagnostics"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "tiktok", label: "TikTok", href: placeholderLinks.tiktok, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group2.png", placeholderMark: "KC" }
  },
  {
    id: "7f-salt",
    floorLabel: "7F",
    navLabel: "Salt",
    brandName: "SALT",
    theme: "salt",
    content: {
      ka: {
        subtitle: "დაგეგმე შენი ღონისძიება",
        description:
          "Salt არის rooftop რესტორანი და ღონისძიებების სივრცე, რომელიც აერთიანებს სადილს, ბარსა და პირად შეკვეთებს.",
        servicesTitle: "სერვისები",
        services: ["სადილი", "კოქტეილისა და ღვინის ბარი", "ჯგუფური ჯავშნები"]
      },
      en: {
        subtitle: "Plan your event",
        description:
          "Placeholder English copy for Salt rooftop restaurant and event destination. Final wording will be replaced after content approval.",
        servicesTitle: "Services",
        services: ["Casual Dining", "Cocktail and Wine Bar", "Private Group Reservations"]
      }
    },
    links: [
      { kind: "call", label: "Call", href: placeholderLinks.call, placeholder: true },
      { kind: "email", label: "Email", href: placeholderLinks.email, placeholder: true },
      { kind: "website", label: "Website", href: placeholderLinks.website, placeholder: true },
      { kind: "instagram", label: "Instagram", href: placeholderLinks.instagram, placeholder: true },
      { kind: "facebook", label: "Facebook", href: placeholderLinks.facebook, placeholder: true },
      { kind: "booking", label: "Booking", href: placeholderLinks.booking, placeholder: true }
    ],
    assetRefs: { floorStrip: "/assets/figma/Group1.jpg", placeholderMark: "S" }
  }
];
