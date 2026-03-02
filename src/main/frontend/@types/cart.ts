export interface Cart {
  cartId: number;
  items: Item[];
  status: string;
  subtotal: number;
  totalItems: number;
}

export interface Item {
  gameId: number;
  gameName: string;
  lineTotal: number;
  priceAtAdd: number;
  quantity: number;
}
