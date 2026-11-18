import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../icon';
import { CartService } from '../../../features/cart/data-access/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, Icon, RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
  protected readonly cart = inject(CartService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }
}
