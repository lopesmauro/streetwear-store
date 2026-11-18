import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Icon } from '../../../../icon';
import { CartService } from '../../../cart/data-access/cart.service';
import { FavoritesService } from '../../../favorites/data-access/favorites.service';
import { ProductRepository } from '../../data-access/product.repository';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, Icon, RouterLink],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly products = inject(ProductRepository);
  protected readonly cart = inject(CartService);
  protected readonly favorites = inject(FavoritesService);
  protected readonly selectedSize = signal('');
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  protected readonly product = computed(() =>
    this.products.findBySlug(this.params().get('slug') ?? ''),
  );

  protected addToCart(): void {
    const product = this.product();
    if (product) this.cart.add(product, this.selectedSize());
  }
}
