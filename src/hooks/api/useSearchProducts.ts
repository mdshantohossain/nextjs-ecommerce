import { API_URL } from "@/config/api";
import { ProductType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchProducts = ({ query, enabled }: { query: string | null, enabled: boolean }) => {
  return useQuery<ProductType[], Error>({
    queryKey: ["search-products", query],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/search-products?query=${query}`);
      return data.data;
    },
    enabled: enabled
  });
};
