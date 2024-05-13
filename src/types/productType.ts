export type NewProductRequestBody = {
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export type UpdateProductRequestBody = {
  title?: string;
  description?: string;
  price?: number;
  rating?: number;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
  brand?: string;
};

export type BaseQueryType = {
  title?: {
    $regex: string;
    $options: string;
  };
  category?: string;
  price?: {
    $lte: number;
  };
  brand?: string;
};

export type InvalidateCache{
  products?: boolean;
  order?: boolean;
  admin?: boolean;
}