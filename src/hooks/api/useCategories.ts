import { API_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/get-all-categories");
      return data;
    },
  });
};
