import { useMutation } from "@tanstack/react-query";

type ChangeAccountInfoInput = {
  name: string;
  email: string;
};

type ChangeAccountInfoResponse = {
  message: string;
};

export function useChangeAccountInfo() {
  return useMutation<
    ChangeAccountInfoResponse,
    Error,
    ChangeAccountInfoInput
  >({
    mutationFn: async ({ name, email }) => {
      const res = await fetch(`/api/auth/account-info`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to change account info");
      }

      return resData;
    },
  });
}