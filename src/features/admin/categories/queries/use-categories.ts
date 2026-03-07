import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,      // data is fresh for 5 minutes
    refetchOnWindowFocus: true,    // revalidate when user returns to the tab
    refetchOnReconnect: true,      // revalidate if network reconnects
    refetchInterval: false,        // no automatic polling
  });
}
