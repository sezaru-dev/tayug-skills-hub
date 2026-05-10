import { Search, Bookmark, User } from "lucide-react"

export const iconMap = {
  search: Search,
  bookmark: Bookmark,
  user: User,
} as const

export type IconKey = keyof typeof iconMap

export const data = {
  discover: [
    {
      title: "Browse",
      url: "/dashboard/browse-providers",
      icon: "search",
    },
    {
      title: "Saved",
      url: "/dashboard/saved-providers",
      icon: "bookmark",
    },
  ],
  navProfile: [
    {
      title: "Manage Profile",
      url: "/dashboard/manage-profile",
      icon: "user",
    },
  ],
} as const