import { Product } from '../../products/models/product';

export interface CartItem {
  readonly product: Product;
  readonly size: string;
  readonly quantity: number;
}
