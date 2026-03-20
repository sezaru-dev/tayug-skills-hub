import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skill } from "../type";

type PatchSkillCategoryProps = {
  id: string;
  name: string;
  categoryId: string;
};

export function usePatchSkillCategory() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, PatchSkillCategoryProps>({
    mutationFn: async ({ id, name, categoryId }) => {
      const res = await fetch(`/api/skills/${id}/change-category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryId }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to update skill category");
      }

      return resData; // must return updated Skill
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  });
}