import { computed, inject, Injectable, signal } from '@angular/core';
import { NotificationService } from '../../../core/notifications/notification.service';
import { StorageService } from '../../../core/storage/storage.service';
import { ProductRepository } from '../../products/data-access/product.repository';
import { Product } from '../../products/models/product';
import { CartItem } from '../models/cart-item';

interface StoredCartItem {
  readonly productId: number;
  readonly size: string;
  readonly quantity: number;
}

interface StoredCart {
  readonly version: 1;
  readonly items: readonly StoredCartItem[];
}

const STORAGE_KEY = 'forma:cart:v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storage = inject(StorageService);
  private readonly products = inject(ProductRepository);
  private readonly notifications = inject(NotificationService);
  readonly items = signal<readonly CartItem[]>(this.restore());
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  add(product: Product, size?: string): boolean {
    const selectedSize = product.sizes.length === 1 ? product.sizes[0] : size;
    if (!selectedSize || !product.sizes.includes(selectedSize)) {
      this.notifications.show('Escolha um tamanho para adicionar à sacola.');
      return false;
    }

    this.items.update((items) => {
      const existing = items.find(
        (item) => item.product.id === product.id && item.size === selectedSize,
      );
      return existing
        ? items.map((item) => (item === existing ? { ...item, quantity: item.quantity + 1 } : item))
        : [...items, { product, size: selectedSize, quantity: 1 }];
    });
    this.persist();
    this.notifications.show(`${product.name}: item adicionado à sacola.`);
    return true;
  }

  changeQuantity(productId: number, size: string, delta: number): void {
    this.items.update((items) =>
      items
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
    this.persist();
  }

  private persist(): void {
    this.storage.write<StoredCart>(STORAGE_KEY, {
      version: 1,
      items: this.items().map((item) => ({
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity,
      })),
    });
  }

  private restore(): readonly CartItem[] {
    const stored = this.storage.read<unknown>(STORAGE_KEY, null);
    if (!this.isStoredCart(stored)) return [];
    return stored.items.flatMap((item) => {
      const product = this.products.findById(item.productId);
      return product &&
        product.sizes.includes(item.size) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
        ? [{ product, size: item.size, quantity: item.quantity }]
        : [];
    });
  }

  private isStoredCart(value: unknown): value is StoredCart {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<StoredCart>;
    return (
      candidate.version === 1 &&
      Array.isArray(candidate.items) &&
      candidate.items.every(
        (item) =>
          item !== null &&
          typeof item === 'object' &&
          typeof (item as Partial<StoredCartItem>).productId === 'number' &&
          typeof (item as Partial<StoredCartItem>).size === 'string' &&
          typeof (item as Partial<StoredCartItem>).quantity === 'number',
      )
    );
  }
}
