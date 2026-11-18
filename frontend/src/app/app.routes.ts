import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { ProductRepository } from './features/products/data-access/product.repository';

const productTitle: ResolveFn<string> = (route) => {
  const product = inject(ProductRepository).findBySlug(route.paramMap.get('slug') ?? '');
  return product ? `${product.name} — forma` : 'Produto não encontrado — forma';
};

export const routes: Routes = [
  {
    path: '',
    title: 'forma — Da rua. Do seu jeito.',
    loadComponent: () =>
      import('./features/home/pages/home/home').then((component) => component.Home),
  },
  {
    path: 'produtos',
    title: 'Produtos — forma',
    loadComponent: () =>
      import('./features/products/pages/product-list/product-list').then(
        (component) => component.ProductList,
      ),
  },
  {
    path: 'produtos/:slug',
    title: productTitle,
    loadComponent: () =>
      import('./features/products/pages/product-detail/product-detail').then(
        (component) => component.ProductDetail,
      ),
  },
  {
    path: 'favoritos',
    title: 'Favoritos — forma',
    loadComponent: () =>
      import('./features/favorites/pages/favorites/favorites').then(
        (component) => component.Favorites,
      ),
  },
  {
    path: '**',
    title: 'Página não encontrada — forma',
    loadComponent: () =>
      import('./features/not-found/pages/not-found/not-found').then(
        (component) => component.NotFound,
      ),
  },
];
