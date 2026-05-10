import { ProfileType } from "@/features/provider/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateProfileAbout() {
  const queryClient = useQueryClient()

  return useMutation<Pick<ProfileType, "about">, Error, Pick<ProfileType, "about">>({
      mutationFn: async ({ about }) => {
        const res = await fetch(`/api/provider/me/about`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ about }),
        });
  
        const resData = await res.json().catch(() => ({}));
  
        if (!res.ok) {
          throw new Error(resData.error || "Failed to update profile");
        }
  
        return resData; // must return profile about
      },
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["profile"]
        });
      }
    });
}