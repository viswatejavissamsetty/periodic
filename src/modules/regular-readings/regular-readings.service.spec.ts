import { Test, TestingModule } from '@nestjs/testing';
import { RegularReadingsService } from './regular-readings.service';

describe('RegularReadingsService', () => {
  let service: RegularReadingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularReadingsService],
    }).compile();

    service = module.get<RegularReadingsService>(RegularReadingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
