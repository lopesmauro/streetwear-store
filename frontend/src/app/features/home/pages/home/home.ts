import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../icon';
import { ProductRepository } from '../../../products/data-access/product.repository';
import { ProductCard } from '../../../products/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [Icon, ProductCard, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly products = inject(ProductRepository);
  protected readonly newsletterSent = signal(false);

  protected subscribe(event: Event): void {
    event.preventDefault();
    this.newsletterSent.set(true);
  }
}
