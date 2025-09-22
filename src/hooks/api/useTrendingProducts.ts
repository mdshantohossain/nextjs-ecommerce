import { API_URL } from "@/config/api";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useTrendingProducts() {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/get-trending-products");
      return data;
    },
  });
}
