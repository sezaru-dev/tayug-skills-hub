import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skill } from "../type";

type PatchSkillStatusProps = {
  id: string;
  isActive: boolean;
};

export function usePatchSkillStatus() {
  const queryClient = useQueryClient(); 

  return useMutation<Skill, Error, PatchSkillStatusProps>({
    mutationFn: async ({ id, isActive }) => {
      const res = await fetch(`/api/skills/${id}/change-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json(); // make sure API returns the updated category object
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"]
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
    }
  });
}
