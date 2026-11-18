import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../icon';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { FavoritesService } from '../../data-access/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [Icon, ProductCard, RouterLink],
  templateUrl: './favorites.html',
})
export class Favorites {
  protected readonly favorites = inject(FavoritesService);
}
