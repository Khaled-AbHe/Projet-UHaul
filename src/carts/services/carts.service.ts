import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async findAllCarts() {
    return await this.repo.find();
  }
}
