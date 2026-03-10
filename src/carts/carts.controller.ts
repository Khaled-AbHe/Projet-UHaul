import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CartsService } from './services/cart/carts.service';
import { PaymentService } from './services/payment/payment.service';
import { PaymentType } from './payment.enum';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get('/all')
  findAllCarts() {
    return this.cartsService.findAllCarts();
  }

  @Post('/pay')
  payCartTotal(
    @Query('type') type: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    if (type == 'creditcard')
      return this.cartsService.payForCart(PaymentType.CREDIT_CARD, amount);
    else if (type == 'paypal')
      return this.cartsService.payForCart(PaymentType.PAYPAL, amount);
  }
}
