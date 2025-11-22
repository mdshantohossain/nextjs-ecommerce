import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { addWishlistItem, removeWishlistItem } from "@/features/wishlilstSlice";
import { ItemType, ProductType } from "@/types";
import { toast } from "react-toastify";
import { useCreateWishlist } from "./api/useWishlist";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export const useWishlist = () => {
  const wishlists = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistMutaion = useCreateWishlist();

  const isExistsOnWishlist = (product_id: number) => {
    return wishlists.some((item) => item.product_id === product_id);
  };

  const addWishlist = (product: ItemType) => {
    if(!isAuthenticated) {
      return router.push("/login");
    }
    
    if(isExistsOnWishlist(product.product_id)) return; // return if exists

    // add to wishlist
    dispatch(addWishlistItem({
      id: uuidv4(),
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug
    }));

    toast.success("Product added to wishlist");
  };

  const removeWishlist = (id: string) => {
    if(id === 'all') {
    removeWishlistItem(id)
    }

    removeWishlistItem(id)
    toast.success("Product moved from wishlist");
  };

  return { isExistsOnWishlist, addWishlist, removeWishlist };
};
