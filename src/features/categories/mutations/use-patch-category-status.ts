import { Category } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePatchCategoryStatus() {
  const queryClient = useQueryClient(); 

  return useMutation<Category, Error, { id: string; isActive: boolean }>({
    mutationFn: async ({ id, isActive }) => {
      const res = await fetch(`/api/categories/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json(); // make sure API returns the updated category object
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Invalidate the categories list to refetch updated data
    },
  });
}
