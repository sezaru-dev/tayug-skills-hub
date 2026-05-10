import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Skill } from '../type';

type CreateSkillProps = {
  name: string;
  categoryId: string;
};

const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, CreateSkillProps>({
    mutationFn: async ({ name, categoryId }: CreateSkillProps) => {
      const res = await fetch(`/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryId }),
      });
      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to create skill");
      }

      return resData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
        exact: false
      });
    }
  });

};

export default useCreateSkill