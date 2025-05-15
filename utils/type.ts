export type ProductType = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: { depth: number; height: number; width: number };
  discountPercentage: number;
  id: number;
  images: string[];
  meta: {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: any[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

export type CategoryType = {
  slug: string;
  name: string;
  url: string;
};

export type Order = 'asc' | 'desc';

export type SortBy = keyof ProductType;

export type AppState = {
  categories: CategoryType[];
  category: string;
  search: string;
  sortBy: SortBy;
  order: Order;
  minPrice: string;
  maxPrice: string;
  cartCount: number;
  modalVisible: boolean;
};
