import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCT_CATEGORIES } from '../../../features/products/models/product';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly categories = PRODUCT_CATEGORIES;
  readonly openHelp = output<void>();
}
