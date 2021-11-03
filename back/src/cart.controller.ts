import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cart, CartService } from './cart.service';
import { AddToCartDTO } from './dto/add-to-cart.dto';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  getCart(@Param('id') id: string): Cart {
    return this.cartService.getCart(id);
  }

  @Post('/')
  createCart(): Cart {
    return this.cartService.create();
  }

  @Post('/:id')
  addToCart(@Param('id') id: string, @Body() { items }: AddToCartDTO): Cart {
    return this.cartService.putItems(id, items);
  }
}
