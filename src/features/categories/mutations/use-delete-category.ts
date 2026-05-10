import { Category } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteCategoryProps = {
  id: string;
  confirmText: string;
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, DeleteCategoryProps>({
    mutationFn: async ({ id, confirmText }) => {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmText }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to delete category");
      }

      return resData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}