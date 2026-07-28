export const APP_NAME = "NCAA";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Search", to: "/search" },
  { label: "Eligibility", to: "/eligibility" },
  { label: "Dashboard", to: "/dashboard", protected: true },
];

export const DEMO_SCHEMES = [
  {
    id: "citizen-id",
    title: "Citizen Identity Support Scheme",
    category: "Identity",
    summary:
      "Helps residents with document verification, identity cards, and profile updates.",
    eligibility: "Open to verified citizens and long-term residents.",
    benefits: ["Identity assistance", "Document tracking", "Profile support"],
    region: "National",
  },
  {
    id: "education-first",
    title: "Education First Assistance",
    category: "Education",
    summary:
      "Scholarship and fee support for eligible learners pursuing higher education.",
    eligibility:
      "Students in approved institutions with household income limits.",
    benefits: ["Scholarships", "Fee waivers", "Mentorship"],
    region: "State + National",
  },
  {
    id: "health-access",
    title: "Health Access Coverage",
    category: "Health",
    summary:
      "Covers essential medical support for low-income households and senior citizens.",
    eligibility: "Income-qualified families, seniors, and vulnerable groups.",
    benefits: ["Coverage plans", "Hospital assistance", "Preventive care"],
    region: "National",
  },
  {
    id: "women-safety",
    title: "Women Safety Support",
    category: "Safety",
    summary:
      "Provides emergency help, counseling access, and protective resources.",
    eligibility:
      "Women and family support applicants needing urgent assistance.",
    benefits: ["24/7 support", "Counseling", "Emergency routing"],
    region: "National",
  },
  {
    id: "rural-boost",
    title: "Rural Growth Boost",
    category: "Development",
    summary:
      "Supports agriculture, small business growth, and rural livelihood projects.",
    eligibility: "Rural residents, farmers, and local entrepreneurs.",
    benefits: ["Business support", "Training", "Seed funding"],
    region: "State",
  },
  {
    id: "senior-care",
    title: "Senior Care Guarantee",
    category: "Welfare",
    summary:
      "A benefits package for senior citizens covering transport and daily support.",
    eligibility: "Residents above the eligible senior age threshold.",
    benefits: ["Transport support", "Pension guidance", "Daily care"],
    region: "National",
  },
];

export const USER_STORAGE_KEY = "ncaa-auth";
export const SAVED_SCHEMES_STORAGE_KEY = "ncaa-saved-schemes";
