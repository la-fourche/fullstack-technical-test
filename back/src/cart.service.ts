import { Injectable, NotImplementedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  id: string;
  quantity: number;
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  create(): Cart {
    throw new NotImplementedException();
  }

  getCart(id: string): Cart {
    throw new NotImplementedException();
  }

  putItem(id: string, item: Item): Cart {
    throw new NotImplementedException();
  }

  putItems(id: string, items: Item[]): Cart {
    throw new NotImplementedException();
  }
}
