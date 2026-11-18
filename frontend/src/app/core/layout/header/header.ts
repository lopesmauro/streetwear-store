import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../../icon';
import { CartService } from '../../../features/cart/data-access/cart.service';
import { FavoritesService } from '../../../features/favorites/data-access/favorites.service';
import { PRODUCT_CATEGORIES } from '../../../features/products/models/product';

@Component({
  selector: 'app-header',
  imports: [Icon, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);
  protected readonly favorites = inject(FavoritesService);
  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly menuOpen = signal(false);
  protected readonly searchOpen = signal(false);
  readonly openCart = output<void>();

  protected search(event: Event, value: string): void {
    event.preventDefault();
    this.searchOpen.set(false);
    this.router.navigate(['/produtos'], { queryParams: { busca: value.trim() || null } });
  }
}
