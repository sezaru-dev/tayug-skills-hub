
import { ProfileType } from "@/features/service-provider.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateContact() {
  const queryClient = useQueryClient()

  return useMutation<Pick<ProfileType, "phoneNumber">, Error, Pick<ProfileType, "phoneNumber">>({
      mutationFn: async ({ phoneNumber }) => {
        const res = await fetch(`/api/provider/me/contact`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        });
  
        const resData = await res.json().catch(() => ({}));
  
        if (!res.ok) {
          throw new Error(resData.error || "Failed to update phone number");
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