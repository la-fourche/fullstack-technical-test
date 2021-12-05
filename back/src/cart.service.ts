import { Injectable } from '@nestjs/common';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  objectID: number,
  name: string,
  price: number
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  create(): Cart {
    const id = this.carts.length;;
    this.carts[id] = { id: String(id), items: []};
    return this.carts[id];
  }

  getCart(id: number): Cart {
    const cart = this.carts[id];
    if (!cart) return this.create();
    return cart;
  }

  putItem(id: number, item: Item): void {
    this.carts[id].items.push(item);
  }

  putItems(id: number, items: Item[]): Cart {
    items.map(item => this.putItem(id, item));
    return this.carts[id];
  }

  deleteItem(id: number, objectID: number): void {
    const index = this.carts[id].items.findIndex(item => { return item.objectID === objectID });
    if (index > -1) this.carts[id].items.splice(index, 1)
  }

  deleteItems(id: number, objectIDs: Array<number>): Cart {
    objectIDs.map(objectID => this.deleteItem(id, objectID));
    return this.carts[id];
  }
}
