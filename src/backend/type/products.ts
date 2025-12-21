// Auteur : Thomas et Rayan
// Interface Produit (version française)

export interface ProductFR {
  id: number;
  titleproduit: string;
  description: string;
  prix: number;
  category: string;
  image: string;
}

// interface pour API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
