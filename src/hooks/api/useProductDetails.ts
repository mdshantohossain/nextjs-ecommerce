import { API_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["product-details"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/product-details/" + slug);
      return data;
    },
  });
};
