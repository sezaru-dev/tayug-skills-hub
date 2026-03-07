import { Category } from "@/app/admin/categories/column";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateCategoryProps = {
  name: string;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, CreateCategoryProps>({
    mutationFn: async ({ name }) => {
      const res = await fetch(`/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to create category");
      }

      return resData; // must return data for onSuccess to work
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}