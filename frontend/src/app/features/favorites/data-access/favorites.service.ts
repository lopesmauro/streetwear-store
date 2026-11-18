import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../core/storage/storage.service';
import { ProductRepository } from '../../products/data-access/product.repository';

interface StoredFavorites {
  readonly version: 1;
  readonly productIds: readonly number[];
}

const STORAGE_KEY = 'forma:favorites:v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);
  private readonly products = inject(ProductRepository);
  readonly ids = signal<readonly number[]>(this.restore());
  readonly productsList = computed(() =>
    this.products.products.filter((product) => this.ids().includes(product.id)),
  );

  has(productId: number): boolean {
    return this.ids().includes(productId);
  }

  toggle(productId: number): void {
    this.ids.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId],
    );
    this.storage.write<StoredFavorites>(STORAGE_KEY, {
      version: 1,
      productIds: this.ids(),
    });
  }

  private restore(): readonly number[] {
    const stored = this.storage.read<unknown>(STORAGE_KEY, null);
    if (this.isStoredFavorites(stored)) return this.validProductIds(stored.productIds);

    const legacy = this.storage.read<unknown>('forma:favorites', []);
    if (!Array.isArray(legacy)) return [];
    const productIds = this.validProductIds(legacy);
    if (productIds.length) {
      this.storage.write<StoredFavorites>(STORAGE_KEY, { version: 1, productIds });
    }
    return productIds;
  }

  private isStoredFavorites(value: unknown): value is StoredFavorites {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<StoredFavorites>;
    return (
      candidate.version === 1 &&
      Array.isArray(candidate.productIds) &&
      candidate.productIds.every((id) => typeof id === 'number')
    );
  }

  private validProductIds(values: readonly unknown[]): readonly number[] {
    return values.filter(
      (id): id is number =>
        typeof id === 'number' && Number.isInteger(id) && this.products.findById(id) !== undefined,
    );
  }
}
