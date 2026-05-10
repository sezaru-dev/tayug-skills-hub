import { useMutation } from "@tanstack/react-query";

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  message: string;
};

export function useChangePassword() {
  return useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordInput
  >({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const res = await fetch(`/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to change password");
      }

      return resData;
    },
  });
}