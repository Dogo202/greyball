import { Test, TestingModule } from '@nestjs/testing';
import { WeightClassService } from './weight-class.service';

describe('WeightClassService', () => {
  let service: WeightClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightClassService],
    }).compile();

    service = module.get<WeightClassService>(WeightClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
