import { useAppSelector } from "@/features/hooks";

export default function useCartItemExists(id: string | number) {
  const { items } = useAppSelector((state) => state.cart);

  return items.some((item) => item.id === id);
}
