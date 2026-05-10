
import { ProfileHeader, UpdateProfileHeaderInput } from "@/features/service-provider.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfileHeader() {
  const queryClient = useQueryClient()

  return useMutation<ProfileHeader, Error, UpdateProfileHeaderInput>({
      mutationFn: async ({ fullname, headline, barangay }) => {
        const res = await fetch(`/api/provider/me/header`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname, headline, barangay }),
        });
  
        const resData = await res.json().catch(() => ({}));
  
        if (!res.ok) {
          throw new Error(resData.error || "Failed to update profile header");
        }
  
        return resData; // must return profile header
      },
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["profile"]
        });
      }
    });
}