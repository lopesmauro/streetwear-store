import { Injectable } from '@angular/core';
import { Product } from '../models/product';

const PRODUCTS: readonly Product[] = [
  {
    id: 1,
    slug: 'moletom-oversized-forest',
    name: 'Moletom oversized Forest',
    category: 'Moletons',
    description: 'Unissex · Algodão encorpado · Verde lavado',
    price: 329.9,
    image: 'images/hoodie.webp',
    colors: ['#2c7036'],
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'DROP 01',
    details:
      'Shape oversized com ombros deslocados, bolso canguru e acabamento lavado. Uma camada de presença para acompanhar a cidade em qualquer ritmo.',
    material: '100% algodão · Gramatura pesada · Modelagem unissex',
  },
  {
    id: 2,
    slug: 'camiseta-boxy-01',
    name: 'Camiseta Boxy 01',
    category: 'Camisetas',
    description: 'Unissex · Corte amplo · Off-white',
    price: 149.9,
    image: 'images/tee.webp',
    colors: ['#f5f3ec'],
    sizes: ['P', 'M', 'G', 'GG'],
    details:
      'Camiseta de corte boxy, gola estruturada e comprimento equilibrado. Feita para funcionar sozinha ou como base de sobreposições.',
    material: '100% algodão · Malha encorpada · Modelagem unissex',
  },
  {
    id: 3,
    slug: 'calca-cargo-district',
    name: 'Calça Cargo District',
    category: 'Calças',
    description: 'Unissex · Wide leg · Preto lavado',
    price: 289.9,
    image: 'images/cargo.webp',
    colors: ['#302f2d'],
    sizes: ['36', '38', '40', '42', '44', '46'],
    badge: 'RELAXED FIT',
    details:
      'Calça cargo de pernas amplas, bolsos utilitários e cintura ajustável. Construída para movimento sem perder a estrutura.',
    material: 'Sarja de algodão · Acabamento lavado · Modelagem ampla',
  },
  {
    id: 4,
    slug: 'bone-six-panel',
    name: 'Boné Six Panel',
    category: 'Acessórios',
    description: 'Ajustável · Sarja lavada · Verde escuro',
    price: 119.9,
    image: 'images/cap.webp',
    colors: ['#304c3c'],
    sizes: ['Único'],
    details:
      'Boné clássico de seis painéis com aba curva e regulagem traseira. O acabamento lavado dá identidade única a cada peça.',
    material: 'Sarja de algodão · Fecho ajustável · Tamanho único',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  readonly products = PRODUCTS;

  findById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  findBySlug(slug: string): Product | undefined {
    return this.products.find((product) => product.slug === slug);
  }
}
