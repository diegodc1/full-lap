import { Category } from "./category.model";

export interface Season {
  id?: string;
  name: string;
  category: Category;
  year: number;
}

export interface SeasonCreateRequest {
  name: string;
  categoryId: string;
  year: number;
}