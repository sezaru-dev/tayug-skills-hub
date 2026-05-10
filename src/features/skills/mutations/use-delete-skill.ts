import { Skill } from "../type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteSkillProps = {
  id: string;
  confirmText: string;
};

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, DeleteSkillProps>({
    mutationFn: async ({ id, confirmText }) => {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmText }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to delete skill");
      }

      return resData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    }
  });
}