import { StockItemGame } from "@/@types/stock";

export interface Cart {
  cartId: number;
  items: Item[];
  status: string;
  subtotal: number;
  totalItems: number;
}

export interface Item {
  gameDetails: StockItemGame;
  gameId: number;
  lineTotal: number;
  priceAtAdd: number;
  quantity: number;
}
