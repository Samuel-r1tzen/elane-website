export type ProductCategory = 
  | 'ALL'
  | 'NEW ARRIVALS'
  | 'ESSENTIALS'
  | 'OUTERWEAR'
  | 'TAILORING'
  | 'KNITWEAR'
  | 'ACCESSORIES';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'ONE SIZE';

export interface Product {
  id: string;
  code: string; // e.g. E01
  name: string;
  price: number; // in ZAR (R)
  category: ProductCategory;
  color: string;
  colorName: string;
  description: string;
  details: {
    material: string;
    fit: string;
    care: string;
    shipping: string;
  };
  sizes: ProductSize[];
  primaryImage: string;
  secondaryImage: string;
  isNewArrival?: boolean;
  isEssential?: boolean;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface LookbookLook {
  id: string;
  number: string; // e.g. "LOOK 01"
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  quote: string;
  featuredProducts: string[]; // product IDs
  notes: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

export type PageView = 
  | 'home'
  | 'shop'
  | 'collection'
  | 'campaign'
  | 'journal'
  | 'about'
  | 'contact';
