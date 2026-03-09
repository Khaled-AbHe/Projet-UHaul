import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './services/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  exports: [CartsService],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
