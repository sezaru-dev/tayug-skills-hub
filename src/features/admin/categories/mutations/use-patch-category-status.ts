import { Category } from "@/app/admin/categories/column";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePatchCategoryStatus() {
  const queryClient = useQueryClient(); 

  return useMutation<Category, Error, string>({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/categories/${id}/status`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json(); // make sure API returns the updated category object
    },
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData<Category[]>(["categories"], (old) =>
        (old ?? []).map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
    },
  });
}
