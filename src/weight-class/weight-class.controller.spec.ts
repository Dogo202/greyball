import { Test, TestingModule } from '@nestjs/testing';
import { WeightClassController } from './weight-class.controller';

describe('WeightClassController', () => {
  let controller: WeightClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightClassController],
    }).compile();

    controller = module.get<WeightClassController>(WeightClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
