import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Cart, CartService } from './cart.service';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { RemoveFromCartDTO } from "./dto/remove-from-cart-dto";

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  getCart(@Param('id') id: string): Cart {
    return this.cartService.getCart(parseInt(id));
  }

  @Post('/')
  createCart(): Cart {
    return this.cartService.create();
  }

  @Post('/:id')
  addToCart(@Param('id') id: string, @Body() { items }: AddToCartDTO): Cart {
    return this.cartService.putItems(parseInt(id), items);
  }

  @Patch('/:id')
  removeFromCart(@Param('id') id: string, @Body() { objectIDs }: RemoveFromCartDTO): Cart {
    return this.cartService.deleteItems(parseInt(id), objectIDs);
  }
}
