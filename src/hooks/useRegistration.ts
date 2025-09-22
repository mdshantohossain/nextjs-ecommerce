import { API_URL } from "@/config/api";
import { useMutation } from "@tanstack/react-query";

export const useRegistrationMutation = () => {
  return useMutation({
    mutationKey: ["registration"],
    mutationFn: async (value) => {
      const response = await fetch(API_URL + "/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    },
  });
};
