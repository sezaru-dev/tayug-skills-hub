import { Star, ShieldCheck, Sparkles, Search, MessageCircle, Handshake, ChartBar } from "lucide-react";

// Steps for client journey
export const clientSteps = [
  {
    id: 1,
    title: "Browse & Search Providers",
    description:
      "Explore skilled professionals in Tayug and nearby areas using categories and filters.",
  },
  {
    id: 2,
    title: "View Provider Profiles",
    description:
      "Check provider bio, skills, sample works, and contact info to find the best match.",
  },
  {
    id: 3,
    title: "Save Favorites",
    description:
      "Bookmark providers you like for easy access later.",
  },
  {
    id: 4,
    title: "Contact Providers",
    description:
      "Reach out through email, Messenger, or phone to discuss your requirements.",
  },
  {
    id: 5,
    title: "Manage Your Account",
    description:
      "Update your personal info, change password, or delete your account if needed.",
  },
];

// Steps for service provider journey
export const freelancerSteps = [
  {
    id: 1,
    title: "Apply as a Service Provider",
    description:
      "Submit your profile details for admin review and approval.",
  },
  {
    id: 2,
    title: "Complete Your Profile",
    description:
      "Once approved, add your bio, skills, pricing, contact info, and upload sample works.",
  },
  {
    id: 3,
    title: "Get Discovered by Clients",
    description:
      "Your profile is visible to clients who can save and contact you.",
  },
  {
    id: 4,
    title: "Track Performance",
    description:
      "View basic analytics like profile views and contact clicks to improve your profile.",
  },
  {
    id: 5,
    title: "Manage Account Settings",
    description:
      "Update email, password, deactivate account, and maintain profile visibility.",
  },
];


// Features
export const features = [
  {
    title: "Local Talent First",
    desc: "We highlight skilled professionals within Tayug, making it easier to find trusted experts nearby.",
    icon: Star,
    textColor: "text-orange-600",     
    bgColor: "bg-orange-100",  
  },
  {
    title: "Verified Service Providers",
    desc: "Every provider undergoes admin approval to ensure quality and reliability.",
    icon: ShieldCheck,
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Simple & Transparent",
    desc: "Clients can browse and bookmark providers, while providers manage their profiles and analytics easily.",
    icon: Sparkles,
    textColor: "text-gray-800",
    bgColor: "bg-gray-100",
  },
  {
    title: "Skill-Based Search",
    desc: "Quickly filter providers based on skills, categories, and location.",
    icon: Search,
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Basic Analytics",
    desc: "Service providers can see profile views and contact clicks to track interest.",
    icon: ChartBar,
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Community-Driven",
    desc: "A platform built to uplift local professionals and help clients support homegrown talent.",
    icon: Handshake,
    textColor: "text-indigo-800",
    bgColor: "bg-indigo-100",
  },
];
