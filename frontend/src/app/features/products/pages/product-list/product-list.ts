import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from '../../../../icon';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductRepository } from '../../data-access/product.repository';
import { PRODUCT_CATEGORIES, ProductFilter } from '../../models/product';

@Component({
  selector: 'app-product-list',
  imports: [Icon, ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly products = inject(ProductRepository);
  protected readonly categories: readonly ProductFilter[] = ['Todos', ...PRODUCT_CATEGORIES];
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  protected readonly category = computed<ProductFilter>(() => {
    const value = this.params().get('categoria');
    return value && PRODUCT_CATEGORIES.some((category) => category === value)
      ? (value as ProductFilter)
      : 'Todos';
  });
  protected readonly query = computed(() => this.params().get('busca') ?? '');
  protected readonly visibleProducts = computed(() => {
    const normalize = (value: string) =>
      value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    const query = normalize(this.query().trim());
    return this.products.products.filter(
      (product) =>
        (this.category() === 'Todos' || product.category === this.category()) &&
        normalize(`${product.name} ${product.description} ${product.category}`).includes(query),
    );
  });

  protected selectCategory(category: ProductFilter): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoria: category === 'Todos' ? null : category },
      queryParamsHandling: 'merge',
    });
  }

  protected search(value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { busca: value.trim() || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
