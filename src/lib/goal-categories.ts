import { Dumbbell, Gem, House, Plane, Rocket, Utensils, type LucideIcon } from "lucide-react";

interface DreamImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface DreamCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  headline: string;
  description: string;
  image: DreamImage;
}

export const dreamCategories: readonly DreamCategory[] = [
  {
    id: "restaurant",
    label: "Try a restaurant",
    icon: Utensils,
    accent: "#b45309",
    headline: "Make that restaurant date happen.",
    description: "Create a shared dream, add the details and steps, and mark it complete when you finally go.",
    image: {
      src: "/app-screens/food-checklist.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo Food to Try shared checklist with the next cooking task and progress",
      caption: "Example food checklist in DreamDuo",
    },
  },
  {
    id: "trip",
    label: "Plan a trip",
    icon: Plane,
    accent: "#0369a1",
    headline: "Make that trip happen.",
    description: "Turn the places you've talked about visiting into a shared plan you can work through together.",
    image: {
      src: "/app-screens/trip-onboarding-plan.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo Japan trip preview showing shared steps for dates, flights, budget, and stays",
      caption: "Example trip plan in DreamDuo",
    },
  },
  {
    id: "home",
    label: "Save for a home",
    icon: House,
    accent: "#047857",
    headline: "Build toward your future home.",
    description: "Turn a big shared goal into smaller milestones and see how far you've come.",
    image: {
      src: "/app-screens/dreams-overview.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo Dreams overview showing a shared Dream Home goal alongside a trip",
      caption: "Dream Home in the Dreams overview",
    },
  },
  {
    id: "fitness",
    label: "Get fit together",
    icon: Dumbbell,
    accent: "#c2410c",
    headline: "Work toward a healthier routine together.",
    description: "Set a shared goal, plan the activities, and encourage each other as you progress.",
    image: {
      src: "/app-screens/dreams-overview.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo Dreams overview showing a featured goal template and progress on shared goals",
      caption: "Goal templates and progress in the Dreams overview",
    },
  },
  {
    id: "wedding",
    label: "Plan a wedding",
    icon: Gem,
    accent: "#be185d",
    headline: "Plan the day you're dreaming of.",
    description: "Keep your wedding plans, decisions, and milestones together as the day gets closer.",
    image: {
      src: "/app-screens/wedding-checklist.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo wedding checklist with tasks for the photographer, outfits, and guest list",
      caption: "Example wedding checklist in DreamDuo",
    },
  },
  {
    id: "business",
    label: "Build a business",
    icon: Rocket,
    accent: "#7c3aed",
    headline: "Build something of your own together.",
    description: "Turn your idea into a shared goal and keep the next steps moving forward.",
    image: {
      src: "/app-screens/shared-project.webp",
      width: 640,
      height: 1321,
      alt: "DreamDuo Build Together project checklist showing a roadmap and task progress",
      caption: "Example shared project in DreamDuo",
    },
  },
];
