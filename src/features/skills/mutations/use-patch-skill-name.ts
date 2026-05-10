import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skill } from "../type";

type PatchSkillProps = {
  id: string;
  name: string;
  categoryId: string;
};

export function usePatchSkillName() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, PatchSkillProps>({
    mutationFn: async ({ id, name, categoryId }) => {
      const res = await fetch(`/api/skills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryId }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to update skill name");
      }

      return resData; // must return updated Skill
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"]
      });
    }
  });
}