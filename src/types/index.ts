export type SubCategoryType = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

// auth types
export type RegisterValuesType = {
  name: string;
  email: string;
  password: string;
};

export type LoginValuesType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  email: string;
};

// cart product type
export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};
export type CartType = {
  cartTotal: number;
  items: CartItemType[];
};

export type CategoryType = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile_photo?: string
}

export type ReviewType = {
  id: number;
  user_id: number;
  product_id: number;
  user: UserType;
  rating?: string;
  comment?: string;
  created_at: string;
}

export type OtherImageType = {
  id: string;
  image: string;
}

export type ProductType = {
  id: number;
  category_id: number;
  sub_category_id: number;
  brand_id?: number;
  discount: null | string;
  name: string;
  sku: string;
  quantity: number;
  regular_price: number;
  selling_price: number;
  main_image: string;
  category: CategoryType;
  is_trending?: string;
  slug: string;
  short_description: string;
  long_description: string;
  status: number;
  created_at: string;
  updated_at: string;
  reviews: ReviewType[];
  other_images: OtherImageType[];
  colors: string[];
  sizes: string[];
  features: string[];
  tags: string[];
};
