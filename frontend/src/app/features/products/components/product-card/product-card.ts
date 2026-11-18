import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../icon';
import { CartService } from '../../../cart/data-access/cart.service';
import { FavoritesService } from '../../../favorites/data-access/favorites.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, Icon, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  protected readonly cart = inject(CartService);
  protected readonly favorites = inject(FavoritesService);
  protected readonly selectedSize = signal('');

  protected toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.product().id);
  }

  protected addToCart(): void {
    this.cart.add(this.product(), this.selectedSize());
  }
}
