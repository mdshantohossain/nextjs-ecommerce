import { API_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useTrendingProducts() {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/trending-products");
      return data;
    },
  });
}
