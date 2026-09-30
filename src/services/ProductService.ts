import axios from "axios";
import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from "../Types/Product";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ProductsResponse>(`${API_URL}?limit=20`);
  console.log(response.data);

  return response.data.products;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await axios.get<ProductsResponse>(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
  );

  return response.data.products;
};

export const fetchCategories = async (): Promise<ProductCategory[]> => {
  const response = await axios.get<ProductCategory[]>(`${API_URL}/categories`);

  return response.data;
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await axios.get<ProductsResponse>(
    `${API_URL}/category/${encodeURIComponent(category)}`,
  );

  return response.data.products;
};
