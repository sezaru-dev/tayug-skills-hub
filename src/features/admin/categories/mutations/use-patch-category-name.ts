import { Category } from "@/app/admin/categories/column";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PatchCategoryPayload = {
  id: string;
  name: string;
};

export function usePatchCategoryName() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, PatchCategoryPayload>({
    mutationFn: async ({ id, name }) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to update category name");
      }

      return resData; // must return updated Category
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