import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProviderSkillsInput = {
  skills: string[]
}

type ContextType = {
  previousSkills?: ProviderSkillsType[]
}

type ProviderSkillsType = {
  id: string
  userId: string
  skillId: string
}

export function useUpdateUserSkills() {
  const queryClient = useQueryClient()

  return useMutation<ProviderSkillsType[], Error, ProviderSkillsInput, ContextType>({
    mutationFn: async ({ skills }) => {
      const res = await fetch(`/api/provider/me/skills`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      })

      const resData = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(resData.error || "Failed to update provider skills")
      }

      return resData
    },

    // 1. OPTIMISTIC UPDATE
    onMutate: async ({ skills }) => {
      await queryClient.cancelQueries({ queryKey: ["user-skills"] })

      const previousSkills = queryClient.getQueryData<ProviderSkillsType[]>([
        "user-skills",
      ])

      // optimistic state: rebuild from incoming skill IDs
      const optimisticSkills: ProviderSkillsType[] = skills.map((skillId) => ({
        id: `temp-${skillId}`,
        userId: "optimistic",
        skillId,
      }))

      queryClient.setQueryData(
        ["user-skills"],
        optimisticSkills
      )

      return { previousSkills }
    },

    // 2. ROLLBACK ON ERROR
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["user-skills"],
        context?.previousSkills
      )
    },

    // 3. SYNC WITH SERVER
    onSuccess: (serverData) => {
      queryClient.setQueryData(
        ["user-skills"],
        serverData
      )
    },

    // 4. FINAL SAFETY REFRESH
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-skills"] })
    },
  })
}