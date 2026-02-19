import { Test, TestingModule } from '@nestjs/testing';
import { UserControllers } from './users.controller';

describe('UsersController', () => {
  let controller: UserControllers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllers],
    }).compile();

    controller = module.get<UserControllers>(UserControllers);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
