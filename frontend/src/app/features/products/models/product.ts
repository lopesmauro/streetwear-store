export const PRODUCT_CATEGORIES = ['Camisetas', 'Moletons', 'Calças', 'Acessórios'] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductFilter = ProductCategory | 'Todos';

export interface Product {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly description: string;
  readonly price: number;
  readonly image: string;
  readonly colors: readonly string[];
  readonly sizes: readonly string[];
  readonly badge?: string;
  readonly details: string;
  readonly material: string;
}
